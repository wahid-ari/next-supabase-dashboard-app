import type { Metadata } from 'next';

import SessionPage from './session-page';

export const metadata: Metadata = {
  title: 'Session - NextJS',
  description: 'Session Activity Page',
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// const wait = (ms: number) => new Promise((_) => setTimeout(_, ms));

export default async function Page() {
  const data = await getData();
  // simulate wait and show laoding ui before showing page
  // await wait(5000);

  return (
    <>
      <SessionPage data={data} />
    </>
  );
}
