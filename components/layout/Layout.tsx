import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import Breadcrumb from '@/components/layout/Breadcrumb';
import Menu from '@/components/layout/Menu';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

type Props = {
  children: ReactNode;
  demo?: boolean;
};

export default function Layout({ children, demo, ...props }: Props) {
  return (
    <div
      {...props}
      className='min-h-screen w-full bg-white text-sm dark:bg-neutral-900 lg:grid'
      style={{ gridTemplateColumns: 'auto 1fr' }}
    >
      <Sidebar className={`${demo ? '!z-0' : ''}`} />

      <main className='relative'>
        <Navbar className={`${demo ? '!z-0' : ''}`} />

        {/* Show on Mobile */}
        <div
          className={twMerge(
            'flex items-center justify-between gap-x-4 border-b px-4 py-3 lg:hidden',
            'overflow-x-auto bg-white/95 dark:border-neutral-800 dark:bg-neutral-900/90',
            'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800',
          )}
        >
          <Breadcrumb />
        </div>

        {/* Show on Desktop */}
        <div
          className={twMerge(
            'hidden items-center justify-between gap-x-4 border-b px-4 py-3 dark:border-neutral-800 lg:flex',
            'sticky top-0 z-40 bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30',
            demo && '!z-0',
          )}
        >
          <Breadcrumb />

          <Menu />
        </div>

        <div className='px-5 pt-4 pb-5'>{children}</div>
      </main>
    </div>
  );
}
