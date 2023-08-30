'use client';

// Error components must be Client Components
// Try to make error when fetching data in page to activate this error
// import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);

  return (
    <div className='h-[500px] flex items-center justify-center'>
      <div className='text-center'>
        <h2 className='text-5xl font-semibold mb-4'>500</h2>
        <p className='text-lg font-medium'>Server Error</p>
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
  );
}
