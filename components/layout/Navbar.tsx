'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
// import nookies from 'nookies';
// import { useSession } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';

import { GlobalContext } from '@/context/GlobalContext';
import { useMounted } from '@/hooks/useMounted';
import Menu from '@/components/layout/Menu';
import ThemeChanger from '@/components/layout/ThemeChanger';

export default function Navbar({ className, ...props }: { className?: string }) {
  const { setShowNav } = useContext(GlobalContext);
  // const admin = nookies.get(null, 'name');
  // const { data: session }: { data: any; status: any } = useSession();
  // const mounted = useMounted();

  return (
    <nav
      {...props}
      className={twMerge(
        'sticky top-0 z-40 h-11 dark:text-neutral-50 lg:hidden',
        'flex w-full items-center justify-between gap-4 border-b p-3 px-5 dark:border-neutral-800',
        'bg-white/50 dark:bg-neutral-900/30',
        'backdrop-blur-md backdrop-filter',
        className,
      )}
    >
      <div className='flex gap-x-3'>
        <button
          className='-ml-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          id='menu'
          aria-label='Menu'
        >
          <MenuIcon
            className='h-5 w-5 text-gray-500 transition-all hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            onClick={() => setShowNav(true)}
          />
        </button>
        <Link
          href='/'
          className={twMerge(
            'rounded text-center text-base font-semibold tracking-wide text-neutral-800 no-underline',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-100 lg:text-2xl',
          )}
        >
          MyBook
        </Link>
      </div>

      <div className='flex items-center gap-3'>
        <div className='cursor-pointer pt-1'>
          <ThemeChanger />
        </div>

        {/* {mounted && session?.name ? <Menu className='lg:hidden' /> : null} */}
      </div>
    </nav>
  );
}
