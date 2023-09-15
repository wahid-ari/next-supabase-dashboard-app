import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { siteConfig } from '@/config/site';
import { authOptions } from '@/libs/auth';

import BookPage from './book-page';

export const metadata: Metadata = {
  title: 'Book',
  description: 'Book Page',
  alternates: {
    canonical: `${siteConfig.url}/book`,
  },
  openGraph: {
    title: 'Book',
    description: 'Book Page',
    url: `${siteConfig.url}/book`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Book`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book',
    description: 'Book Page',
    images: [`${siteConfig.url}/api/og?title=Book`],
  },
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch book data');
  }
  return res.json();
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  const data = await getData();

  return <BookPage data={data} />;
}
