import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import AuthorPage from './author-page';

export const metadata: Metadata = {
  title: 'Author',
  description: 'Author Page',
  alternates: {
    canonical: `${siteConfig.url}/author`,
  },
  openGraph: {
    title: 'Author',
    description: 'Author Page',
    url: `${siteConfig.url}/author`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Author`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Author',
    description: 'Author Page',
    images: [`${siteConfig.url}/api/og?title=Author`],
  },
};

export default async function Page() {
  return <AuthorPage />;
}
