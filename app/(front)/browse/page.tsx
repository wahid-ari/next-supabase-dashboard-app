import { Suspense } from 'react';
import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import Title from '@/components/systems/Title';

import BrowsePage from './browse-page';

export const metadata: Metadata = {
  title: 'Browse',
  description: 'Browse Page',
  alternates: {
    canonical: `${siteConfig.url}/browse`,
  },
  openGraph: {
    title: 'Browse',
    description: 'Browse Page',
    url: `${siteConfig.url}/browse`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Browse`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse',
    description: 'Browse Page',
    images: [`${siteConfig.url}/api/og?title=Browse`],
  },
};

export default function Page() {
  return (
    <>
      <Title>Browse</Title>

      {/* TODO Docs https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      {/* https://github.com/vercel/next.js/discussions/61654 */}
      <Suspense>
        <BrowsePage />
      </Suspense>
    </>
  );
}
