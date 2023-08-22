import type { Metadata } from 'next';

import Layout from '@/components/layout/Layout';
import Title from '@/components/systems/Title';

import LogPage from './log-page';

export const metadata: Metadata = {
  title: 'Logs - NextJS',
  description: 'Logs Activity Page',
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/log`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const wait = (ms: number) => new Promise((_) => setTimeout(_, ms));

export default async function Page() {
  const data = await getData();
  // await wait(1000);

  return (
    <Layout>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Logs</Title>
      </div>

      <LogPage data={data} />
    </Layout>
  );
}
