import Shimmer from '@/components/systems/Shimmer';
import Text from '@/components/systems/Text';
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

      <div className='mt-5 rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
          <Text.medium>Total Book by Genre (Recharts)</Text.medium>
        </div>
        <div className='py-3 w-80 m-auto'>
          <Shimmer className='w-64 h-64 m-auto rounded-full'>
            <div className='h-full w-full rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
          <div className='mt-3 w-64 mx-auto flex flex-wrap justify-center gap-y-2 gap-x-4 mb-3'>
            <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-4 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </div>
        </div>
      </div>

      <div className='mt-5 rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
          <Text.medium>Total Book by Author (Recharts)</Text.medium>
        </div>
        <div className='m-auto p-3'>
          <Shimmer className='rounded-xl px-8'>
            <div className='flex flex-row items-end gap-2 sm:gap-4 md:gap-8 lg:gap-10'>
              <div className='h-32 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-16 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-32 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-16 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>
        </div>
      </div>
    </>
  );
}
