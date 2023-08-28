'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  title?: string;
  routeName: string;
  className?: string;
  icon?: ReactNode;
};

export default function NavAccordion({ children, title, routeName, className, icon, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [cek, setCek] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes(routeName)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setCek(true);
  }, [pathname, routeName]);

  return cek ? (
    <>
      <Disclosure defaultOpen={isOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              {...props}
              className={twMerge(
                'flex w-full items-center justify-start gap-2 rounded py-2 pl-[11px] pr-2 text-gray-700 outline-none transition-all',
                'hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                'dark:text-neutral-300 dark:hover:text-sky-500',
                'hover:bg-gray-100 dark:hover:bg-neutral-800',
                className,
              )}
            >
              <div className='flex-grow text-left text-sm flex items-center gap-2'>
                {icon}
                <span>{title}</span>
              </div>
              <ChevronRightIcon
                className={`h-5 w-5 text-gray-500 transition-all duration-300 dark:text-neutral-400 ${
                  open ? 'rotate-90 transform transition-transform' : 'transition-transform'
                }`}
              />
            </Disclosure.Button>
            <Transition
              enter='transition-max-height ease-in-out duration-500 overflow-hidden'
              enterFrom='max-h-0'
              enterTo='max-h-screen'
              leave='transition-max-height ease-in-out duration-100 overflow-hidden'
              leaveFrom='max-h-screen'
              leaveTo='max-h-0'
            >
              <Disclosure.Panel className='relative overflow-hidden py-0.5 px-2 transition-all'>
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <hr className='ml-3 dark:border-neutral-800' />
    </>
  ) : null;
}
