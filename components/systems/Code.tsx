'use client';

import { useEffect, useState } from 'react';
import { ClipboardCopyIcon, ClipboardPasteIcon } from 'lucide-react';
import Prism from 'prismjs';

import { cn } from '@/libs/utils';
import { useMounted } from '@/hooks/use-mounted';

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
      console.error(err);
    }
  }

  if (!mounted) return null;

  return (
    <>
      <p className='text-sm font-semibold dark:text-white'>Example {name}:</p>
      <div {...props} className={cn('Code relative rounded-md text-sm', className)}>
        <button
          title='Copy Code'
          onClick={copyText}
          className={cn(
            'absolute right-0 m-3 mt-4 rounded-md border border-neutral-700 px-1 py-1 transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-neutral-800 dark:hover:bg-neutral-700',
          )}
        >
          {copy ? (
            <div className='flex items-center'>
              <ClipboardPasteIcon className='h-5 w-5 text-neutral-400 transition-all' />
              <span className='pl-1 text-xs text-neutral-400'>Copied !</span>
            </div>
          ) : (
            <ClipboardCopyIcon className='h-5 w-5 text-neutral-400 transition-all hover:text-neutral-200' />
          )}
        </button>
        <pre
          className={cn(
            'line-numbers scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-neutral-800 dark:scrollbar-thumb-neutral-800',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
          )}
        >
          <code className={`language-${lang}`}>{code}</code>
        </pre>
      </div>
    </>
  );
}
