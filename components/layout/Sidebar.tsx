'use client';

import { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// import Badge from '@/components/systems/Badge';
// import Modal from '@/components/systems/Modal';
import {
  ArchiveBoxArrowDownIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  // ArrowRightIcon,
  BookmarkSquareIcon,
  BookOpenIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  SquaresPlusIcon,
  SwatchIcon,
  TableCellsIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
// import nookies from 'nookies';
import { twMerge } from 'tailwind-merge';

import { GlobalContext } from '@/context/GlobalContext';
import NavAccordion from '@/components/layout/NavAccordion';
// import { useMounted } from '@/hooks/useMounted';

import NavLink from '@/components/layout/NavLink';
import ThemeChanger from '@/components/layout/ThemeChanger';

export default function Sidebar({ className, ...props }: { className?: string; [props: string]: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const { showNav, setShowNav } = useContext(GlobalContext);
  // const admin = nookies.get(null, 'type');
  // const mounted = useMounted();

  const hideMenu = () => {
    setShowNav(false);
  };

  useEffect(() => {
    setShowNav(false);
  }, [pathname, setShowNav]);

  // https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open
  useEffect(() => {
    if (showNav) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [showNav]);

  async function handleLogout() {
    setOpenModal(false);
    hideMenu();
    router.push('/logout');
  }

  return (
    <>
      <aside
        {...props}
        className={twMerge(
          'z-50 flex h-screen max-h-screen w-screen flex-col flex-nowrap border-r bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:w-60',
          showNav ? 'fixed lg:relative' : 'top-0 hidden lg:sticky lg:flex',
          className,
        )}
      >
        <div className='flex items-center justify-between gap-2 px-5'>
          <button
            className='rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500 lg:hidden'
            onClick={hideMenu}
            id='closemenu'
            aria-label='Close Menu'
          >
            <XMarkIcon className='h-5 w-5 text-gray-500 transition-all hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200' />
          </button>
          <p className='py-2.5 text-left text-base font-semibold tracking-wide text-neutral-800 dark:text-neutral-100'>
            MyBook
          </p>
          <div className='cursor-pointer pt-1'>
            <ThemeChanger />
          </div>
        </div>

        <div
          className={twMerge(
            'flex flex-col flex-nowrap gap-1 overflow-auto border-t px-4 pt-4 dark:border-neutral-800 sm:flex-grow',
            'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800',
          )}
        >
          <NavLink isHome href='/dashboard' icon={<BookmarkSquareIcon className='h-5 w-5' />}>
            Dashboard
          </NavLink>

          <NavLink href='/search' icon={<MagnifyingGlassIcon className='h-5 w-5' />} className='mt-1'>
            Search
          </NavLink>

          <NavLink href='/author' icon={<UserGroupIcon className='h-5 w-5' />} className='mt-1'>
            Author
          </NavLink>

          <NavLink href='/book' icon={<BookOpenIcon className='h-5 w-5' />} className='mt-1'>
            Book
          </NavLink>

          <NavLink href='/genre' icon={<SwatchIcon className='h-5 w-5' />} className='mt-1'>
            Genre
          </NavLink>

          <NavAccordion
            title='Activity'
            routeName='activity'
            className='mt-1'
            icon={<ClipboardIcon className='h-5 w-5' />}
          >
            <NavLink href='/activity' icon={<DocumentTextIcon className='h-5 w-5' />}>
              Log
            </NavLink>

            <NavLink href='/activity/session' icon={<TableCellsIcon className='h-5 w-5' />} className='mt-1.5'>
              Session
            </NavLink>
          </NavAccordion>

          <NavAccordion title='Design' routeName='design' icon={<Squares2X2Icon className='h-5 w-5' />}>
            <NavLink href='/design' icon={<SquaresPlusIcon className='h-5 w-5' />}>
              Component
            </NavLink>
            <NavLink
              href='/design/layout'
              className='relative mt-1.5'
              icon={<ArchiveBoxArrowDownIcon className='h-5 w-5' />}
            >
              Layout
              <span className='absolute left-24 top-2.5 flex h-5 w-5 animate-bounce items-center justify-center'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
                <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
              </span>
            </NavLink>
            <NavLink href='/design/ui' icon={<SquaresPlusIcon className='h-5 w-5' />} className='mt-1.5'>
              UI
              {/* <Badge>New</Badge> */}
            </NavLink>
            <NavLink href='/design/form' icon={<SquaresPlusIcon className='h-5 w-5' />} className='mt-1.5'>
              Form
              {/* <Badge>New</Badge> */}
            </NavLink>
            <NavLink href='/design/example' icon={<SquaresPlusIcon className='h-5 w-5' />} className='mt-1.5'>
              Example
              {/* <Badge>New</Badge> */}
            </NavLink>
          </NavAccordion>

          <NavLink href='/settings' icon={<Cog6ToothIcon className='h-5 w-5' />} className='mt-1'>
            Settings
          </NavLink>

          <NavLink.external
            href='https://my-book-docs.vercel.app'
            icon={<ArrowRightIcon className='h-4 w-4' />}
            className='mt-1'
          >
            Docs
          </NavLink.external>
        </div>

        <hr className='mt-2 dark:border-neutral-800' />

        <div className='px-4 py-2'>
          {/* FIX this  */}
          {/* {mounted ? (
            admin.name ? ( */}
          <button
            data-testid='button-logout'
            onClick={() => setOpenModal(true)}
            className={twMerge(
              'flex w-full items-center justify-start gap-2 px-3 py-2 text-sm font-semibold transition-all',
              'rounded text-red-600 hover:bg-red-100 dark:hover:bg-neutral-800',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
            )}
          >
            <ArrowLeftOnRectangleIcon className='h-5 w-5' />
            Logout
          </button>
          {/* ) : (
              <NavLink.login href='/login' icon={<ArrowRightOnRectangleIcon className='h-5 w-5' />} className='mt-1'>
                Login
              </NavLink.login>
            )
          ) : null} */}
        </div>
      </aside>
      {/* <Modal
        title='Logout'
        open={openModal}
        showIcon
        isDanger
        onClose={() => setOpenModal(false)}
        onConfirm={handleLogout}
        confirmText='Logout'
        confirmTestId='confirm-logout'
      >
        Are you sure want to logout?
      </Modal> */}
    </>
  );
}
