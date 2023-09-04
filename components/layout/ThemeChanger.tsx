import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/libs/utils';
import { useMounted } from '@/hooks/useMounted';

export default function ThemeChanger({ border, ...props }: { border?: boolean; [props: string]: any }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <button
      {...props}
      onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
      aria-label='Change Theme'
      className={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all duration-200',
        border && 'border p-0.5 rounded-md dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800',
      )}
    >
      {theme == 'dark' ? (
        <SunIcon className='h-[19px] w-[19px] text-neutral-300 transition-all hover:text-neutral-100' />
      ) : (
        <MoonIcon className='h-5 w-5 text-gray-500 transition-all hover:text-gray-700' />
      )}
    </button>
  );
}
