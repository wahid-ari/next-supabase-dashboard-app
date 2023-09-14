import { twMerge } from 'tailwind-merge';

import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <Title>Create Author</Title>
      <div className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
        <div>
          {[...Array(4).keys()].map((e, i) => (
            <div
              key={i}
              className={twMerge(
                'mb-4 relative isolate overflow-hidden rounded bg-neutral-200/60 p-2',
                'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
                'before:bg-gradient-to-r before:from-transparent before:via-white/60',
                'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
              )}
            >
              <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          ))}
        </div>
        <div>
          <div
            className={twMerge(
              'mb-4 relative isolate overflow-hidden rounded bg-neutral-200/60 p-2',
              'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
              'before:bg-gradient-to-r before:from-transparent before:via-white/60',
              'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
            )}
          >
            <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </div>
          <div
            className={twMerge(
              'mb-4 relative isolate overflow-hidden rounded bg-neutral-200/60 p-2',
              'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
              'before:bg-gradient-to-r before:from-transparent before:via-white/60',
              'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
            )}
          >
            <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </div>
          <div
            className={twMerge(
              'mb-4 relative isolate overflow-hidden rounded bg-neutral-200/60 p-2',
              'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
              'before:bg-gradient-to-r before:from-transparent before:via-white/60',
              'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
            )}
          >
            <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </div>
        </div>
      </div>
    </>
  );
}
