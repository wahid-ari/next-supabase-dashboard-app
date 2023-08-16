import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Label({ children, className, ...props }: Props) {
  return (
    <label {...props} className={twMerge('block text-gray-800 dark:text-neutral-300', className)}>
      {children}
    </label>
  );
}
