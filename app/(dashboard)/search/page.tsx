import { Suspense } from 'react';
import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import Title from '@/components/systems/Title';

import SearchPage from './search-page';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search Page',
  alternates: {
    canonical: `${siteConfig.url}/search`,
  },
  openGraph: {
    title: 'Search',
    description: 'Search Page',
    url: `${siteConfig.url}/search`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Search`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search',
    description: 'Search Page',
    images: [`${siteConfig.url}/api/og?title=Search`],
  },
};

export default function Page() {
  return (
    <>
      <Title>Search</Title>

      {/* TODO Docs https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      {/* https://github.com/vercel/next.js/discussions/61654 */}
      <Suspense>
        <SearchPage />
      </Suspense>
    </>
  );
}
