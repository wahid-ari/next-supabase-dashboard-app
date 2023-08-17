'use client';

import { useEffect, useState } from 'react';
import { ClipboardCopyIcon, ClipboardPasteIcon } from 'lucide-react';
import Prism from 'prismjs';
import { twMerge } from 'tailwind-merge';

import { useMounted } from '@/hooks/useMounted';

type Props = {
  className?: string;
  name?: string;
  code: string;
  lang?: string;
  [props: string]: any;
};

export default function Code({ className, name = 'Code', code, lang = 'javascript', ...props }: Props) {
  const mounted = useMounted();
  useEffect(() => {
    Prism.highlightAll();
  }, [mounted]);

  const [copy, setCopy] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(code);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  if (!mounted) return null;

  return (
    <>
      <p className='text-sm font-semibold dark:text-white'>Example {name}:</p>
      <div {...props} className={twMerge('Code relative rounded-md text-sm', className)}>
        <button
          title='Copy Code'
          onClick={copyText}
          className='absolute right-0 m-3 mt-4 rounded-md border border-neutral-700 px-1 py-1 transition-all dark:bg-neutral-800 dark:hover:bg-neutral-700'
        >
          {copy ? (
            <div className='flex items-center'>
              <ClipboardPasteIcon className='h-5 w-5 transition-all dark:text-gray-400 dark:hover:text-gray-300' />
              <span className='pl-1 text-xs text-neutral-600 dark:text-gray-300'>Copied !</span>
            </div>
          ) : (
            <ClipboardCopyIcon className='h-5 w-5 text-neutral-500 transition-all hover:text-neutral-600 dark:text-gray-400 dark:hover:text-gray-300' />
          )}
        </button>
        <pre className='line-numbers scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-700 dark:scrollbar-thumb-neutral-700'>
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      </div>
    </>
  );
}
