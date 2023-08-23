import { twMerge } from 'tailwind-merge';

import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <Title className='mb-4'>Sessions</Title>
      <div
        className={twMerge(
          'mt-2 mb-4 relative isolate space-y-3 overflow-hidden rounded bg-neutral-200/60 p-4',
          'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
          'before:bg-gradient-to-r before:from-transparent before:via-white/60',
          'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
        )}
      >
        <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      </div>
      <div
        className={twMerge(
          'relative isolate space-y-5 overflow-hidden rounded bg-neutral-200/60 p-4',
          'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
          'before:bg-gradient-to-r before:from-transparent before:via-white/60',
          'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
        )}
      >
        <div className='h-8 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        <div className='space-y-3'>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          <div className='h-5 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        </div>
      </div>
    </>
  );
}
