import Shimmer from '@/components/ui/Shimmer';

import Title from '@/components/systems/Title';

export default function Loading() {
  return (
    <>
      <Title>Dashboard</Title>

      <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {[...Array(3).keys()].map((e, i) => (
          <Shimmer key={i}>
            <div className='space-y-3'>
              <div className='h-7 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        ))}
      </div>

      <Shimmer className='my-5'>
        <div className='h-96 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
      </Shimmer>
    </>
  );
}
