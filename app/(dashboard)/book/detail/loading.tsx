import { twMerge } from 'tailwind-merge';

import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <Title>Book</Title>
      <div className='gap-6 sm:flex'>
        <div className='mx-auto w-3/5 sm:mx-0 sm:w-1/4 lg:w-1/5'>
          <div
            className={twMerge(
              ' relative isolate space-y-3 overflow-hidden rounded bg-neutral-200/60 p-4',
              'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
              'before:bg-gradient-to-r before:from-transparent before:via-white/60',
              'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
            )}
          >
            <div className='h-64 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </div>
        </div>
        <div className='mt-6 w-full sm:mt-0 sm:w-3/4 '>
          <div
            className={twMerge(
              'relative isolate overflow-hidden rounded bg-neutral-200/60 p-4',
              'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
              'before:bg-gradient-to-r before:from-transparent before:via-white/60',
              'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
            )}
          >
            <div className='h-4 mb-2 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 mb-2 w-40 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 mb-2 w-52 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 mb-2 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 mb-2 w-40 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 mb-5 w-52 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-44 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </div>
          <div
            className={twMerge(
              'mt-6 relative isolate flex items-center gap-3 overflow-hidden rounded bg-neutral-200/60 p-4',
              'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
              'before:bg-gradient-to-r before:from-transparent before:via-white/60',
              'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
            )}
          >
            <div className='w-16 h-16 rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div>
              <div className='h-4 mb-2 w-52 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
