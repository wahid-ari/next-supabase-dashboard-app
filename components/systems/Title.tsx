import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={twMerge('text-2xl font-semibold tracking-wide text-neutral-800 dark:text-neutral-100', className)}>
      {children}
    </h1>
  );
}
