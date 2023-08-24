import type { Metadata } from 'next';

// import { notFound } from 'next/navigation';

import Title from '@/components/systems/Title';

import LogPage from './log-page';

export const metadata: Metadata = {
  title: 'Logs',
  description: 'Logs Activity Page',
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/log`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch data');
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
      <Title className='mb-4'>Logs</Title>

      <LogPage data={data} />
    </>
  );
}
