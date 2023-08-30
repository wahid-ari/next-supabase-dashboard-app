import type { Metadata } from 'next';
import Link from 'next/link';

// Try to call notFound() function when rendering page in activuty page to activate this not found page
export const metadata: Metadata = {
  title: 'Not Found',
  description: 'Error not found',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function NotFound() {
  return (
    <div className='h-[500px] flex items-center justify-center'>
      <div className='text-center'>
        <h2 className='text-5xl font-semibold mb-4'>404</h2>
        <p className='text-lg font-medium'>Not Found Session Page</p>
        <p className='text-base mb-4'>Could not find requested resource</p>
        <Link
          href='/activity/session'
          className='text-white bg-sky-600 transition-all hover:bg-sky-500 rounded px-2 py-1 text-sm'
        >
          TRY AGAIN
        </Link>
      </div>
    </div>
  );
}
