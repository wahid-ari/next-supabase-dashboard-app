import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

// import { notFound } from 'next/navigation';

import SessionPage from './session-page';

export const metadata: Metadata = {
  title: 'Session',
  description: 'Session Page',
  alternates: {
    canonical: `${siteConfig.url}/activity/session`,
  },
  openGraph: {
    title: 'Session',
    description: 'Session Page',
    url: `${siteConfig.url}/activity/session`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Session`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Session',
    description: 'Session Page',
    images: [`${siteConfig.url}/api/og?title=Session`],
  },
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch session data');
  }
  return res.json();
}

// const wait = (ms: number) => new Promise((_) => setTimeout(_, ms));

export default async function Page() {
  const data = await getData();
  // simulate wait and show laoding ui before showing page
  // await wait(5000);
  // This will activate the closest `not-found.tsx` ui
  // if (!data) {
  //   notFound();
  // }

  return (
    <>
      <SessionPage data={data} />
    </>
  );
}
