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
      <div className='gap-6 sm:flex'>
        <div className='mx-auto w-3/5 sm:mx-0 sm:w-1/4 lg:w-1/5'>
          <Shimmer>
            <div className='h-64 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
        </div>
        <div className='mt-6 w-full sm:mt-0 sm:w-3/4 '>
          <Shimmer>
            <div className='h-4 mb-2 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 mb-2 w-40 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 mb-5 w-52 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-44 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
          <Shimmer className='mt-6'>
            <div className='h-24 w-14 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div>
              <div className='h-4 mb-2 w-52 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        </div>
      </div>
    </>
  );
}
