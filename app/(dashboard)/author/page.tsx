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

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch author data');
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <AuthorPage data={data} />;
}
