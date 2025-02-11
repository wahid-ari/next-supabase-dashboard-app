import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import GenrePage from './genre-page';

export const metadata: Metadata = {
  title: 'Genre',
  description: 'Genre Page',
  alternates: {
    canonical: `${siteConfig.url}/genre`,
  },
  openGraph: {
    title: 'Genre',
    description: 'Genre Page',
    url: `${siteConfig.url}/genre`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Genre`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genre',
    description: 'Genre Page',
    images: [`${siteConfig.url}/api/og?title=Genre`],
  },
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch genre data');
  }
  return res.json();
}

// This page secured through the middleware in root folder
export default async function Page() {
  const data = await getData();
  return <GenrePage data={data} />;
}
