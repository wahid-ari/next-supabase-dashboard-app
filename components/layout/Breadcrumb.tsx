'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ChevronRightIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function Breadcrumb({ ...props }) {
  const pathname = usePathname();
  const params = useParams();
  const path = pathname
    .split('/')
    .slice(1)
    .filter((r) => {
      if (r.includes('_id') || r === '[id]') {
        return false;
      }
      return true;
    });

  // dont show breadcrumb item in detail page
  // FIX this, hide detail page that use [id] from breadcrumb
  // from "Home>Genre>27"
  // to "Home>Genre>Detail"
  let paths = params.id ? [...path.slice(0, -1), 'detail'] : path;
  // if (params.id) {
  //   paths = path.slice(0, -1);
  // } else paths = path;
  // console.log(paths)

  // const paths = router.asPath
  //   .split("/")
  //   .slice(1)
  //   .filter((r) => {
  //     if (r.includes("_id") || r === "[id]") {
  //       return false;
  //     }
  //     return true;
  //   });

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav className='flex w-full text-sm' aria-label='Breadcrumb'>
      <ul {...props} className='inline-flex flex-nowrap items-center space-x-1 whitespace-nowrap md:space-x-1'>
        <li className='-ml-0.5 inline-flex items-center'>
          <ChevronRightIcon className='mr-1 h-[18px] w-5 text-gray-400' />
          <Link
            href='/'
            passHref
            className={twMerge(
              'inline-flex items-center rounded text-gray-700 transition-all hover:text-gray-900',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              'dark:text-neutral-300 dark:hover:text-neutral-100',
            )}
          >
            Home
          </Link>
        </li>
        {paths[0] !== '' &&
          paths.map((path, index) => {
            if (index === paths.length - 1) {
              return (
                <li aria-current='page' key={index} className='flex items-center'>
                  <ChevronRightIcon className='h-[18px] w-5 text-gray-500 dark:text-neutral-400' />
                  <span className='ml-1 mr-4 font-medium text-sky-600 dark:text-sky-500'>
                    {capitalizeFirstLetter(path)}
                  </span>
                </li>
              );
            }
            return (
              <li key={index}>
                <div className='flex items-center'>
                  <ChevronRightIcon className='h-[18px] w-5 text-gray-400' />
                  <Link
                    href={(index !== 0 ? '/' : '') + paths.slice(0, index).join('/') + '/' + path}
                    className={twMerge(
                      'ml-1 rounded text-gray-600 transition-all hover:text-gray-800',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                      'dark:text-neutral-300 dark:hover:text-neutral-200',
                    )}
                  >
                    {capitalizeFirstLetter(path)}
                  </Link>
                </div>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
