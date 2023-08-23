'use client';

// Error components must be Client Components
// Try to make error when fetching data in session page to activate this error
import Layout from '@/components/layout/Layout';
import Title from '@/components/systems/Title';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Layout>
      <Title className='mb-4'>Logs</Title>
      <div className='h-[400px] flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-base'>Error Session Page</p>
          <p className='text-base mb-4'>Message : {error.message}</p>
          <button
            onClick={() => reset()}
            className='text-white bg-sky-600 transition-all hover:bg-sky-500 rounded px-2 py-1 text-sm'
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    </Layout>
  );
}
