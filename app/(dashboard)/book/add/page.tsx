import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import Title from '@/components/systems/Title';

import AddBookPage from './add-book-page';

export const metadata: Metadata = {
  title: 'Add Book',
  description: 'Add Book Page',
  alternates: {
    canonical: `${siteConfig.url}/book`,
  },
  openGraph: {
    title: 'Add Book',
    description: 'Add Book Page',
    url: `${siteConfig.url}/book`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Add Book`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Book',
    description: 'Add Book Page',
    images: [`${siteConfig.url}/api/og?title=Add Book`],
  },
};

async function getDataAuthor() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch author data');
  }
  return res.json();
}

async function getDataGenre() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch genre data');
  }
  return res.json();
}

export default async function Page() {
  const author = await getDataAuthor();
  const genre = await getDataGenre();

  return (
    <>
      <Title>Create Book</Title>

      <AddBookPage authors={author} genres={genre} />
    </>
  );
}
