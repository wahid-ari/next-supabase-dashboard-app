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
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <h2 className='mb-4 text-5xl font-semibold'>404</h2>
        <p className='text-xl font-medium'>Not Found</p>
        <p className='mb-4 text-base'>Could not find requested resource</p>
        <Link href='/' className='rounded bg-sky-600 px-2 py-1 text-sm text-white transition-all hover:bg-sky-500'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
