import type { Metadata } from 'next';
import Link from 'next/link';

// Try to call notFound() function when rendering page in all page to activate this not found page
// or give a wrong url address
export const metadata: Metadata = {
  title: 'Not Found',
  description: 'Error not found',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function NotFound() {
  return (
    <>
      <div className='h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-5xl font-semibold mb-4'>404</h2>
          <p className='text-base'>Not Found</p>
          <p className='text-base mb-4'>Could not find requested resource</p>
          <Link href='/' className='text-white bg-sky-600 transition-all hover:bg-sky-500 rounded px-2 py-1 text-sm'>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
