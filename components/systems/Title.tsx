import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

export default function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={cn('mb-4 text-2xl font-semibold tracking-wide text-neutral-800 dark:text-neutral-100', className)}>
      {children}
    </h1>
  );
}
