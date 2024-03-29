'use client';

import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

export default function DemoDropdownMenu() {
  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <Menu.Button
            className={cn(
              'flex items-center rounded font-medium text-neutral-600 transition-all hover:text-neutral-900',
              'dark:text-neutral-300 dark:hover:text-neutral-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            Menu
            <ChevronDownIcon
              className={cn('ml-1 h-5 w-4 transition-all duration-200', open ? 'rotate-180' : 'rotate-0')}
              aria-hidden='true'
            />
          </Menu.Button>
          <Transition
            enter='transition ease-in-out duration-300'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in-out duration-100'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='mt-2 w-32 origin-top-right rounded-md border bg-white shadow-md focus:outline-none dark:border-neutral-800 dark:bg-neutral-900'>
              <div className='space-y-1 px-2 py-2'>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href='/setting'
                      className={cn(
                        'flex w-full rounded px-2 py-1.5 text-sm',
                        active
                          ? 'bg-neutral-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                          : 'text-neutral-700 dark:text-neutral-300',
                      )}
                    >
                      Setting
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href='/design/ui'
                      className={cn(
                        'flex w-full rounded px-2 py-1.5 text-sm',
                        active
                          ? 'bg-neutral-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                          : 'text-neutral-700 dark:text-neutral-300',
                      )}
                    >
                      UI
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={cn(
                        'flex w-full rounded px-2 py-1.5 text-sm',
                        active
                          ? 'bg-neutral-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                          : 'text-neutral-700 dark:text-neutral-300',
                      )}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
