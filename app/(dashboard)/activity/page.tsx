import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

// import { notFound } from 'next/navigation';

import Title from '@/components/systems/Title';

import LogPage from './log-page';

export const metadata: Metadata = {
  title: 'Logs',
  description: 'Logs Page',
  alternates: {
    canonical: `${siteConfig.url}/activity`,
  },
  openGraph: {
    title: 'Logs',
    description: 'Logs Page',
    url: `${siteConfig.url}/activity`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Logs`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logs',
    description: 'Logs Page',
    images: [`${siteConfig.url}/api/og?title=Logs`],
  },
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/log`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch log data');
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
  // notFound();
  // }

  return (
    <>
      <Title>Logs</Title>

      <LogPage data={data} />
    </>
  );
}
