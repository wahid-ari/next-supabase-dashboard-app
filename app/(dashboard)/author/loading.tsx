import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';

import Shimmer from '@/components/ui/Shimmer';

import Title from '@/components/systems/Title';

export default async function Loading() {
  // FIX Loading page still showed when try to access this page before login
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <Title>Author</Title>
      <Shimmer className='mt-2 mb-4 space-y-3'>
        <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      </Shimmer>
      <Shimmer className='space-y-5'>
        <div className='h-8 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        <div className='space-y-3'>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        </div>
      </Shimmer>
    </>
  );
}
