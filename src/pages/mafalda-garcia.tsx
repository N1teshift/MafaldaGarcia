import fs from 'fs';
import path from 'path';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@components/Layout';

type MafaldaPageProps = {
  images: string[]; // public-relative paths e.g. "/maf_failai/abc.jpg"
  title: string;
  sections: Array<{ heading?: string; paragraphs: string[]; backgroundColor?: string }>;
};

function ensureDirectoryExists(directoryPath: string) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function copyDirectoryRecursiveSync(sourceDir: string, targetDir: string) {
  ensureDirectoryExists(targetDir);
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(sourceDir, entry.name);
    const destPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectoryRecursiveSync(srcPath, destPath);
    } else if (entry.isFile()) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

export const getStaticProps: GetStaticProps<MafaldaPageProps> = async () => {
  const projectRoot = process.cwd();
  const sourceDir = path.join(projectRoot, 'maf_failai');
  const publicDir = path.join(projectRoot, 'public');
  const targetDir = path.join(publicDir, 'maf_failai');
  const htmlPath = path.join(projectRoot, 'maf.html');

  const copiedImagePublicPaths: string[] = [];
  const sourceFilenamesSet = new Set<string>();

  if (fs.existsSync(sourceDir)) {
    ensureDirectoryExists(publicDir);
    ensureDirectoryExists(targetDir);

    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
    // If Canva export contains nested images directory for fonts, copy it
    const imagesDir = entries.find(e => e.isDirectory() && e.name === 'images');
    if (imagesDir) {
      try {
        copyDirectoryRecursiveSync(path.join(sourceDir, 'images'), path.join(targetDir, 'images'));
      } catch {}
    }
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const lower = entry.name.toLowerCase();
      const isImage = (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp'));
      const isStaticAsset = (lower.endsWith('.css') || lower.endsWith('.js'));
      if (!isImage && !isStaticAsset) {
        continue;
      }
      if (isImage) sourceFilenamesSet.add(entry.name);
      const srcPath = path.join(sourceDir, entry.name);
      const destPath = path.join(targetDir, entry.name);
      try {
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(srcPath, destPath);
        }
        if (isImage) copiedImagePublicPaths.push(`/maf_failai/${entry.name}`);
      } catch (err) {
        // Skip files that cannot be copied; continue
      }
    }
  }

  // Parse maf.html for title and basic text content + image order

  // Parse maf.html for title and basic text content
  let title = 'Mafalda Garcia';
  const sections: Array<{ heading?: string; paragraphs: string[]; backgroundColor?: string }> = [];
  const orderedFromHtml: string[] = [];
  if (fs.existsSync(htmlPath)) {
    try {
      const raw = fs.readFileSync(htmlPath, 'utf8');
      const titleMatch = raw.match(/<title[^>]*>([^<]*)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].trim();
      }
      // Extract image order as they appear in HTML
      const imgRegex = /src=["'](?:\.?\/?)(maf_failai\/([^"'>]+?\.(?:jpg|jpeg|png|webp)))["']/gi;
      let im: RegExpExecArray | null;
      while ((im = imgRegex.exec(raw)) !== null) {
        const filename = im[2];
        if (filename && sourceFilenamesSet.has(filename) && !orderedFromHtml.includes(`/maf_failai/${filename}`)) {
          orderedFromHtml.push(`/maf_failai/${filename}`);
        }
      }
      // Extract blocks with visible text; Canva exports use many <p> spans
      const sectionRegex = /<section[\s\S]*?<\/section>/gi;
      const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/i;
      const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/i;
      const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
      const stripTags = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const foundSections = raw.match(sectionRegex) || [];
      for (const sec of foundSections) {
        const headingMatch = h1Regex.exec(sec) || h2Regex.exec(sec);
        const heading = headingMatch ? stripTags(headingMatch[1]) : undefined;
        // Extract background-color inline style if present on the section
        let backgroundColor: string | undefined;
        const styleMatch = sec.match(/<section[^>]*style\s*=\s*"([^"]*)"/i);
        if (styleMatch && styleMatch[1]) {
          const styleContent = styleMatch[1];
          const bgMatch = styleContent.match(/background-color\s*:\s*([^;]+);?/i);
          if (bgMatch && bgMatch[1]) backgroundColor = bgMatch[1].trim();
        }
        const paragraphs: string[] = [];
        let m: RegExpExecArray | null;
        while ((m = pRegex.exec(sec)) !== null) {
          const text = stripTags(m[1]);
          if (text) paragraphs.push(text);
        }
        if (heading || paragraphs.length) {
          const base = { paragraphs } as { heading?: string; paragraphs: string[]; backgroundColor?: string };
          if (heading) base.heading = heading;
          if (backgroundColor) base.backgroundColor = backgroundColor;
          sections.push(base);
        }
      }
      // Fallback: if no sections found, grab generic paragraphs
      if (sections.length === 0) {
        const paragraphs: string[] = [];
        let m: RegExpExecArray | null;
        while ((m = pRegex.exec(raw)) !== null) {
          const text = stripTags(m[1]);
          if (text) paragraphs.push(text);
        }
        if (paragraphs.length) sections.push({ paragraphs });
      }
    } catch {}
  }

  // Build final image list: first those ordered in HTML, then remaining copied ones deterministic
  const remaining = copiedImagePublicPaths.filter(p => !orderedFromHtml.includes(p)).sort((a, b) => a.localeCompare(b));
  const finalImages = orderedFromHtml.concat(remaining);

  // Sanitize sections to avoid undefined props in Next.js serialization
  const sanitizedSections = sections.map(sec => {
    const out: { heading?: string; paragraphs: string[]; backgroundColor?: string } = { paragraphs: sec.paragraphs };
    if (sec.heading) out.heading = sec.heading;
    if (sec.backgroundColor) out.backgroundColor = sec.backgroundColor;
    return out;
  });

  // Also copy maf.html to public for an optional pixel-accurate reference view
  try {
    if (fs.existsSync(htmlPath)) {
      const publicHtmlPath = path.join(publicDir, 'maf.html');
      if (!fs.existsSync(publicHtmlPath)) {
        fs.copyFileSync(htmlPath, publicHtmlPath);
      }
    }
  } catch {}

  return {
    props: {
      images: finalImages,
      title,
      sections: sanitizedSections,
    },
  };
};

export default function MafaldaGarciaPage({ images, title, sections }: MafaldaPageProps) {
  const hasImages = images && images.length > 0;
  const hero = hasImages ? images[0] : undefined;

  return (
    <Layout translationNs={["common"]}>
      <Head>
        <title>{title || 'Mafalda Garcia - Performance Artist'}</title>
        <meta name="description" content="Mafalda Garcia - Performance Artist exploring artivism, rituals & well-being through interdisciplinary dialogue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --primary-black: #0a0a0a;
          --soft-white: #fefefe;
          --warm-gray: #8e8e78;
          --accent-gold: #d4af37;
          --deep-purple: #2d1b69;
          --soft-beige: #f7f5f0;
          --text-dark: #1a1a1a;
          --text-medium: #4a4a4a;
        }

        html {
          scroll-behavior: smooth;
        }

        .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-gold) 0%, var(--warm-gray) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .bg-artistic-dark {
          background: linear-gradient(135deg, var(--primary-black) 0%, var(--deep-purple) 100%);
        }

        .bg-artistic-light {
          background: linear-gradient(45deg, var(--soft-beige) 0%, var(--soft-white) 100%);
        }

        .text-artistic-gold {
          color: var(--accent-gold);
        }

        .text-warm-gray {
          color: var(--warm-gray);
        }

        .border-artistic-gold {
          border-color: var(--accent-gold);
        }

        .artistic-quote::before,
        .artistic-quote::after {
          content: '"';
          font-size: 4rem;
          color: var(--accent-gold);
          position: absolute;
          font-family: 'Playfair Display', serif;
        }

        .artistic-quote::before {
          top: -20px;
          left: -40px;
        }

        .artistic-quote::after {
          bottom: -40px;
          right: -40px;
        }

        @media (max-width: 768px) {
          .artistic-quote::before,
          .artistic-quote::after {
            display: none;
          }
        }
      `}</style>

      <main className="min-h-screen w-full bg-white text-black font-inter">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="font-playfair text-2xl text-white">
                Mafalda Garcia
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#canvas" className="text-white hover:text-artistic-gold transition-colors duration-300">Canvas</a>
                <a href="#exploration" className="text-white hover:text-artistic-gold transition-colors duration-300">Exploration</a>
                <a href="#performances" className="text-white hover:text-artistic-gold transition-colors duration-300">Performances</a>
                <a href="#works" className="text-white hover:text-artistic-gold transition-colors duration-300">Works</a>
                <a href="#publications" className="text-white hover:text-artistic-gold transition-colors duration-300">Publications</a>
                <a href="#visual-journey" className="text-white hover:text-artistic-gold transition-colors duration-300">Visual Journey</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 bg-artistic-dark"></div>
          <div className="relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
              {/* Content Side */}
              <div className="flex flex-col justify-center px-8 lg:px-16 py-20 text-white">
                <h1 className="font-playfair text-6xl lg:text-8xl font-light leading-none mb-6">
                  Mafalda<br />
                  <span className="gradient-text">Garcia</span>
                </h1>
                <p className="text-xl lg:text-2xl text-warm-gray uppercase tracking-widest mb-8 font-light">
                  Performance Artist
                </p>
                <div className="space-y-6 text-lg lg:text-xl leading-relaxed max-w-lg">
                  <p className="text-gray-300">
                    I began to explore performance art as a safe space to express my feelings & ideas about post-postmodern life. For a long time I kept everything inside, until I discovered this powerful way of communicating; without words, using only my body as a tool for interdisciplinary dialogue, not as an escape from reality, but as a profound way of expressing what is going on inside and outside of me.
                  </p>
                  <p className="text-gray-300">
                    It allows me to connect with others in deep silence, to shout without using my voice, and to immerse myself in a laboratory where I can discover my own questions and invite others to find theirs.
                  </p>
                </div>
                <a 
                  href="#canvas" 
                  className="inline-block mt-12 px-8 py-4 border-2 border-artistic-gold text-artistic-gold hover:bg-artistic-gold hover:text-black transition-all duration-300 uppercase tracking-wider font-medium"
                >
                  Explore My Work
                </a>
              </div>
              
              {/* Image Side */}
              <div className="relative overflow-hidden">
                {hero ? (
                  <>
                    <Image 
                      src={hero} 
                      alt="Mafalda Garcia" 
                      fill 
                      priority 
                      className="object-cover filter contrast-110 brightness-90" 
                    />
                    <div className="absolute bottom-6 left-6 text-white/70 text-sm">
                      Photo by Ricardo Graça
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <span className="text-gray-500">Artist Portrait</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Body, My Canvas. Our Voice */}
        <section id="canvas" className="py-20 lg:py-32 bg-artistic-light">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="fade-in">
                <h2 className="font-playfair text-5xl lg:text-6xl mb-8 text-gray-900">
                  body, my canvas. our voice
                </h2>
                <div className="w-16 h-1 bg-artistic-gold mb-8"></div>
                <h3 className="text-2xl lg:text-3xl mb-6 text-warm-gray font-medium">
                  artivism, rituals and well being
                </h3>
                <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                  <p>
                    All my artworks reflect a journey of reflection, live-action and the result is to create an open space of integration. <strong className="text-gray-900">Silence is my language, movement my punctuation, and the scene our mundane landscape.</strong>
                  </p>
                  <p>
                    Rituals have a transformative power, allowing me to create human-body installations and manifestos on important topics in the contemporary scene.
                  </p>
                  <p className="text-xl font-medium text-gray-900">
                    Well-being is at the core of my art, guiding me as I seek the path to the change I wish to see in the world.
                  </p>
                </div>
              </div>
              
              <div className="fade-in">
                {hasImages && images[1] && (
                  <div className="relative overflow-hidden rounded-lg hover-lift">
                    <div className="aspect-[4/5]">
                      <Image 
                        src={images[1]} 
                        alt="Body as Canvas" 
                        fill 
                        className="object-cover filter grayscale-[20%]" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Exploration Through Performance */}
        <section id="exploration" className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
              Exploration Through Performance
            </h2>
            <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed text-gray-700">
              <p>
                I began to explore performance art as a safe space to express my feelings & ideas about post-postmodern life. For a long time I kept everything inside, until I discovered this powerful way of communicating; without words, using only my body as a tool for interdisciplinary dialogue, not as an escape from reality, but as a profound way of expressing what is going on inside and outside of me.
              </p>
              <p>
                It allows me to connect with others in deep silence, to shout without using my voice, and to immerse myself in a laboratory where I can discover my own questions and invite others to find theirs.
              </p>
              <p>
                My journey in performance art has been shaped by continuous exploration of the body as a medium for expression, communication, and transformation. Through various training programs, workshops, and collaborations, I have developed a unique approach that combines physical theater, contemporary dance, and conceptual art.
              </p>
              <p>
                My education and training have focused on understanding the body as a political and social instrument, exploring how movement and stillness can convey complex narratives about identity, belonging, and human connection in our contemporary world.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Artistic Performances and Collaborations */}
        <section id="performances" className="py-20 lg:py-32 bg-artistic-light">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
              Artistic Performances and Collaborations
            </h2>
            <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed text-gray-700">
              <p>
                Throughout my career, I have had the privilege of collaborating with diverse artists, institutions, and communities across different countries and cultural contexts. These collaborations have enriched my practice and expanded my understanding of performance as a universal language.
              </p>
              <p>
                My work has been presented at international festivals, galleries, and unconventional spaces, including street theater festivals, contemporary art venues, and community centers. Each performance is a unique encounter between the artist, the space, and the audience.
              </p>
              <p>
                Notable collaborations include partnerships with Sofia Lacerda (multidisciplinary artist and finalist of the Prémio Sonae Media Arte 2022), Rui Alemão (sound artist), and various collectives focused on feminist art and social engagement.
              </p>
              <p>
                My performances have been featured at events such as the XXII INTERNATIONAL STREET THEATRE FESTIVAL "ŠERMUKŠNIS" in Klaipeda, Lithuania, and various contemporary art exhibitions showcasing women artists and experimental performance practices.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Major Works and Contributions */}
        <section id="works" className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
              Major Works and Contributions
            </h2>
            
            <div className="space-y-24">
              {/* Work 1: Connecting Souls */}
              <div className="fade-in flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-6">
                  <h3 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
                    Connecting Souls
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <p>
                      Designed with 1000 handwritten questions, this interactive installation offered visitors in a unique experience. Participants could choose from four different ways to engage: making a question, exchanging questions with others, reading and taking someone else's question or leaving the space, introspective in nature, included multiple-choice, open-ended and visual answers.
                    </p>
                    <p>
                      The purpose was to bring people together, to get to know each other, to question, to reflect, and to engage with the essence of our existence.
                    </p>
                    <p className="text-sm text-warm-gray italic mt-4">
                      Social experiment that encouraged connection and meaningful dialogue.
                    </p>
                  </div>
                </div>
                {hasImages && images[1] && (
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-lg hover-lift">
                      <div className="aspect-[4/3]">
                        <Image 
                          src={images[1]} 
                          alt="Connecting Souls Performance" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Work 2: Yūs Esate */}
              <div className="fade-in flex flex-col lg:flex-row-reverse gap-16 items-center">
                <div className="flex-1 space-y-6">
                  <h3 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
                    Yūs Esate
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <p>
                      Premiered at XXII INTERNATIONAL STREET THEATRE FESTIVAL "ŠERMUKŠNIS" during a creative workshop. It is a performance about the Amazon women warriors who escaped from captivity and attempting to conquer the Klaipeda region.
                    </p>
                    <p>
                      The creative team of the show has reimagined the concepts of "intrusion, conquer" - "not through the power of weapons, but through the power of songs."
                    </p>
                    <p className="text-sm text-warm-gray italic mt-4">
                      <strong>Prop/set/performer:</strong> Mafalda Garcia, Liepa Šaltė, Irma Jurgelevičiūtė, Ūla Šilagalienė, Paula Sūnelaitė
                    </p>
                    <p className="text-sm text-warm-gray italic">
                      Cast: Julia Dutkevič, Gabrielė Jurkevičiūtė, Deivydė Rutkauskaitė, Liepa Šaltė, Danielė Vaičiulytė, Irina Tabak.
                    </p>
                  </div>
                </div>
                {hasImages && images[2] && (
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-lg hover-lift">
                      <div className="aspect-[4/3]">
                        <Image 
                          src={images[2]} 
                          alt="Yūs Esate Performance" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Work 3: Lines of Separation */}
              <div className="fade-in flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-6">
                  <h3 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
                    Lines of Separation
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <p>
                      This work invites the viewer/participant to reflect on the invisible lines that separate us from ourselves and from others. Sometimes these lines exist even when it's not up to us.
                    </p>
                    <p className="italic">
                      "Today we live in times of denunciation of our neighbours, of hatred, resentment and cowardice."
                    </p>
                    <p className="italic">
                      "What power do we have to make choices if we are stuck on sides that aren't ours?"
                    </p>
                    <p>
                      An exploration of the boundaries that exist between the performance space and the audience.
                    </p>
                  </div>
                </div>
                {hasImages && images[3] && (
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-lg hover-lift">
                      <div className="aspect-[4/3]">
                        <Image 
                          src={images[3]} 
                          alt="Lines of Separation Performance" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Work 4: Collaborative Work */}
              <div className="fade-in flex flex-col lg:flex-row-reverse gap-16 items-center">
                <div className="flex-1 space-y-6">
                  <h3 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
                    Collaborative Movement
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <p>
                      In collaboration with Sofia Lacerda (multidisciplinary artist and finalist of the Prémio Sonae Media Arte 2022), we accepted the challenge and created an immersive work of art. For one hour, two movements became one, seeking the common center from our individual expressions.
                    </p>
                    <p>
                      Rui Alemão created a powerful soundscape and edited the final video artwork.
                    </p>
                    <p className="text-sm text-warm-gray italic mt-4">
                      <strong>Credits:</strong> Mafalda Silvgar and VUD Collective
                    </p>
                  </div>
                </div>
                {hasImages && images[4] && (
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-lg hover-lift">
                      <div className="aspect-[4/3]">
                        <Image 
                          src={images[4]} 
                          alt="Collaborative Performance" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Work 5: Feminist Art Piece */}
              <div className="fade-in flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-6">
                  <h3 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
                    Borderline Manifesto
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <p>
                      A feminist art piece presented as both a performative manifesto and a social experiment, this work emerged from research around the female body. The performance was part of the Borderline, showcasing women artists.
                    </p>
                    <p>
                      This work aimed to create not only a space for artistic collaboration but also an open platform where the public could actively participate. It invited reflection on how dialogue and collective expression can be an alternative form of care and an important part of existence.
                    </p>
                    <p className="text-sm text-warm-gray italic mt-4">
                      <strong>Performer:</strong> Mafalda Silvgar<br />
                      <strong>Sound:</strong> Rui Alemão<br />
                      <strong>Video:</strong> Marisa Cantos
                    </p>
                  </div>
                </div>
                {hasImages && images[5] && (
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-lg hover-lift">
                      <div className="aspect-[4/3]">
                        <Image 
                          src={images[5]} 
                          alt="Borderline Manifesto Performance" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Work 6: Freedom Manifesto */}
              <div className="fade-in flex flex-col lg:flex-row-reverse gap-16 items-center">
                <div className="flex-1 space-y-6">
                  <h3 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
                    Freedom Manifesto
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <p>
                      A manifesto about freedom in the 21st century. In a liquid and ambiguous society, where the concept of belonging and citizenship globally challenges our understanding of identity.
                    </p>
                    <p>
                      In this manifesto, using non-verbal language, we take the spectator-actor into a habitat of synaesthesia and action. This performative manifesto consists of a sensory installation that explores what it means to be free in our contemporary world.
                    </p>
                    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                      <p className="text-lg italic text-gray-800 mb-4">
                        "Free to movement, what do we have in our hands?"
                      </p>
                      <p className="text-base italic text-gray-600">
                        'In a world full of thirst, we are left with the stones in the path'
                      </p>
                    </div>
                  </div>
                </div>
                {hasImages && images[6] && (
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-lg hover-lift">
                      <div className="aspect-[4/3]">
                        <Image 
                          src={images[6]} 
                          alt="Freedom Manifesto Performance" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Text sections from parsed content as fallback */}
            {sections && sections.length > 0 && (
              <div className="mt-24 space-y-16">
                {sections.map((sec, i) => (
                  <div key={i} className="fade-in max-w-4xl mx-auto">
                    {sec.heading && (
                      <h3 className="font-playfair text-2xl lg:text-3xl text-gray-900 mb-4">
                        {sec.heading}
                      </h3>
                    )}
                    {sec.paragraphs && sec.paragraphs.length > 0 && (
                      <div className="space-y-3 text-base leading-relaxed text-gray-700">
                        {sec.paragraphs.map((p, idx) => (
                          <p key={idx} className={p.includes('Prop/set/performer:') || p.includes('Credits:') || p.includes('Performer:') ? 'text-sm text-warm-gray italic mt-4' : ''}>
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 6: Publications */}
        <section id="publications" className="py-20 lg:py-32 bg-artistic-light">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
              Publications
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Publication 1 */}
              <div className="fade-in">
                <div className="relative overflow-hidden rounded-lg hover-lift mb-6">
                  <div className="aspect-[4/3]">
                    {hasImages && images[7] ? (
                      <Image 
                        src={images[7]} 
                        alt="Publication 1" 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Publication Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="font-playfair text-2xl lg:text-3xl mb-4 text-gray-900">
                  Performance Art and Social Engagement
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  A comprehensive exploration of how performance art can serve as a tool for social change and community engagement, examining the intersection of art, activism, and well-being in contemporary society.
                </p>
              </div>

              {/* Publication 2 */}
              <div className="fade-in">
                <div className="relative overflow-hidden rounded-lg hover-lift mb-6">
                  <div className="aspect-[4/3]">
                    {hasImages && images[8] ? (
                      <Image 
                        src={images[8]} 
                        alt="Publication 2" 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Publication Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="font-playfair text-2xl lg:text-3xl mb-4 text-gray-900">
                  The Body as Political Instrument
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  An analysis of how the human body functions as a medium for political expression and social commentary in contemporary performance art, with focus on feminist perspectives and collective action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Visual Journey: Fragments of Creation */}
        <section id="visual-journey" className="py-20 lg:py-32 bg-artistic-dark text-white">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20">
              Visual Journey: Fragments of Creation
            </h2>
            
            {/* Quote from MG */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <blockquote className="artistic-quote relative text-2xl lg:text-3xl leading-relaxed italic font-light">
                "In the space between movement and stillness, between sound and silence, we find the essence of what it means to be human. Each performance is a fragment of creation, a moment of truth captured in the ephemeral dance of existence."
              </blockquote>
              <p className="text-lg text-warm-gray mt-6">— Mafalda Garcia</p>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hasImages && images.slice(9, 15).map((src, idx) => (
                <div key={src} className="fade-in hover-lift">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
                    <div className="aspect-[4/5]">
                      <Image 
                        src={src} 
                        alt={`Visual Journey ${idx + 1}`} 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: Contact Me */}
        <section id="contact" className="py-20 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="font-playfair text-5xl lg:text-6xl mb-8 text-gray-900">
              CONTACT ME
            </h2>
            <p className="text-xl mb-12 text-gray-700 leading-relaxed">
              For collaborations, exhibitions, or to learn more about my work,<br />
              I'd love to hear from you.
            </p>
            <div className="flex justify-center space-x-8">
              <a href="mailto:mafalda@example.com" className="text-gray-900 hover:text-artistic-gold transition-colors duration-300 text-lg font-medium">
                Email
              </a>
              <a href="#" className="text-gray-900 hover:text-artistic-gold transition-colors duration-300 text-lg font-medium">
                Instagram
              </a>
              <a href="#" className="text-gray-900 hover:text-artistic-gold transition-colors duration-300 text-lg font-medium">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Add JavaScript for scroll animations */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Smooth navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              });
            });

            // Fade in animation on scroll
            const observerOptions = {
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => {
              observer.observe(el);
            });
          `,
        }}
      />
    </Layout>
  );
}


