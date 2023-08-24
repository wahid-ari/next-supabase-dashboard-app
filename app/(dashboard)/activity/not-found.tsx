import Link from 'next/link';

import Title from '@/components/systems/Title';

// Try to call notFound() function when rendering page in activuty page to activate this not found page
export default function NotFound() {
  return (
    <>
      <Title className='mb-4'>Logs</Title>
      <div className='h-[400px] flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-5xl font-semibold mb-4'>404</h2>
          <p className='text-base'>Not Found Activity Page</p>
          <p className='text-base mb-4'>Could not find requested resource</p>
          <Link
            href='/activity'
            className='text-white bg-sky-600 transition-all hover:bg-sky-500 rounded px-2 py-1 text-sm'
          >
            TRY AGAIN
          </Link>
        </div>
      </div>
    </>
  );
}
