import type { Metadata } from 'next';

import GenrePage from './genre-page';

export const metadata: Metadata = {
  title: 'Genre',
  description: 'Genre Page',
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch genre data');
  }
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <GenrePage data={data} />;
}
