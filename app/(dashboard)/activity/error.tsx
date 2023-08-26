'use client';

// Error components must be Client Components
// Try to make error when fetching data in activuty page to activate this error
// import { useEffect } from 'react';
import Title from '@/components/systems/Title';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);

  return (
    <>
      <Title>Logs</Title>
      <div className='h-[400px] flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-base'>Error Activity Page</p>
          <p className='text-base mb-4'>Message : {error.message}</p>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className='text-white bg-sky-600 transition-all hover:bg-sky-500 rounded px-2 py-1 text-sm'
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    </>
  );
}
