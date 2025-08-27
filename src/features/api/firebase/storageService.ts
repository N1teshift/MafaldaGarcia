import admin from 'firebase-admin';
import { getFirebaseConfig, validateFirebaseConfig } from './config';

/**
 * Firebase Storage service for handling images
 */
export class FirebaseStorageService {
  private storage: admin.storage.Storage;
  private bucket: any;

  constructor() {
    const config = getFirebaseConfig();
    const errors = validateFirebaseConfig(config);
    
    if (errors.length > 0) {
      throw new Error(`Firebase configuration errors: ${errors.join(', ')}`);
    }

    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(config.serviceAccountKey)),
        storageBucket: config.storageBucket,
      });
    }

    this.storage = admin.storage();
    this.bucket = this.storage.bucket(config.storageBucket!);
  }

  /**
   * Get a signed URL for an image in Firebase Storage
   */
  async getImageUrl(imagePath: string): Promise<string> {
    try {
      const file = this.bucket.file(imagePath);
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
      return url;
    } catch (error) {
      console.error(`Error getting signed URL for ${imagePath}:`, error);
      throw new Error(`Failed to get image URL for ${imagePath}`);
    }
  }

  /**
   * Get multiple image URLs
   */
  async getImageUrls(imagePaths: string[]): Promise<Record<string, string>> {
    const urls: Record<string, string> = {};
    
    await Promise.all(
      imagePaths.map(async (path) => {
        try {
          urls[path] = await this.getImageUrl(path);
        } catch (error) {
          console.error(`Error getting URL for ${path}:`, error);
          urls[path] = ''; // Fallback to empty string
        }
      })
    );

    return urls;
  }

  /**
   * List all images in a directory
   */
  async listImages(directory: string): Promise<string[]> {
    try {
      const [files] = await this.bucket.getFiles({
        prefix: directory,
        delimiter: '/',
      });

      return files
        .map((file: any) => file.name)
        .filter((name: string) => name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.webp'));
    } catch (error) {
      console.error(`Error listing images in ${directory}:`, error);
      return [];
    }
  }

  /**
   * Upload an image to Firebase Storage
   */
  async uploadImage(filePath: string, destination: string): Promise<string> {
    try {
      await this.bucket.upload(filePath, {
        destination,
        metadata: {
          cacheControl: 'public, max-age=31536000', // 1 year cache
        },
      });

      return await this.getImageUrl(destination);
    } catch (error) {
      console.error(`Error uploading image ${filePath}:`, error);
      throw new Error(`Failed to upload image ${filePath}`);
    }
  }
}

/**
 * Create a new Firebase Storage service instance
 */
export function createFirebaseStorageService(): FirebaseStorageService {
  return new FirebaseStorageService();
}
