import React from 'react';
import Head from 'next/head';
import { getStaticPropsWithTranslations } from '../features/i18n/getStaticProps';
import Layout from '../features/shared/components/Layout';
import { MafaldaGarciaPage } from '../features/mafalda-garcia/MafaldaGarciaPage';

const pageNamespaces = ["common"];
export const getStaticProps = getStaticPropsWithTranslations(pageNamespaces);

export default function HomePage() {
  const title = 'Mafalda Garcia';

  return (
    <Layout namespaces={pageNamespaces}>
      <Head>
        <title>{title || 'Mafalda Garcia - Performance Artist'}</title>
        <meta name="description" content="Mafalda Garcia - Performance Artist exploring artivism, rituals & well-being through interdisciplinary dialogue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <MafaldaGarciaPage title={title} />
    </Layout>
  );
}
