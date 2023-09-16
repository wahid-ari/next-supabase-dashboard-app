import Shimmer from '@/components/ui/Shimmer';

import Title from '@/components/systems/Title';

export default async function Loading() {
  return (
    <>
      <Title>Edit Author</Title>
      <div className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
        <div>
          {[...Array(4).keys()].map((e, i) => (
            <Shimmer key={i} className='mb-4 p-2'>
              <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
          ))}
        </div>
        <div>
          <Shimmer className='mb-4 p-2'>
            <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
          <Shimmer className='mb-4 p-2'>
            <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
          <Shimmer className='mb-4 p-2'>
            <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
        </div>
      </div>
    </>
  );
}
