'use client';

import { useTheme } from 'next-themes';

export default function SettingPage() {
  const { theme, setTheme } = useTheme();

  const handleDarkMode = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else setTheme('light');
  };

  return (
    <div
      role='button'
      title='Change Theme'
      onClick={handleDarkMode}
      className='relative h-6 w-11 cursor-pointer rounded-full bg-neutral-300 transition-all dark:bg-sky-500 shadow-md'
    >
      <div className='absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all dark:left-6'></div>
    </div>
  );
}
