import Link from 'next/link';

import { cn } from '@/libs/utils';

type Props = {
  className?: string;
  status?: string;
  title?: string;
  description?: string;
  link?: string;
  [props: string]: any;
};
export default function NotFoundPage({
  className,
  status = '404',
  title = 'Not Found',
  description = 'Could not find requested resource',
  link = '/dashboard',
  ...props
}: Props) {
  return (
    <div className={cn('flex h-[500px] items-center justify-center', className)} {...props}>
      <div className='text-center'>
        <h2 className='mb-4 text-5xl font-semibold'>{status}</h2>
        <p className='text-lg font-medium'>{title}</p>
        <p className='mb-4 text-base'>{description}</p>
        <Link
          href={link}
          className='rounded bg-sky-600 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-sky-500'
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
