import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@components/Layout';
import { createComponentLogger } from '@logging/logger';

export default function Home() {
  const { t } = useTranslation('common');
  const logger = createComponentLogger('HomePage', 'render');

  logger.info('Home page rendered');

  return (
    <Layout translationNs={['common', 'home']}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">
          {t('welcome')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('description')}
        </p>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'home'])),
    },
  };
};
