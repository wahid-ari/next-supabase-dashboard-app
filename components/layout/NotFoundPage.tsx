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
    <div className={cn('h-[500px] flex items-center justify-center', className)} {...props}>
      <div className='text-center'>
        <h2 className='text-5xl font-semibold mb-4'>{status}</h2>
        <p className='text-lg font-medium'>{title}</p>
        <p className='text-base mb-4'>{description}</p>
        <Link
          href={link}
          className='text-white bg-sky-600 transition-all hover:bg-sky-500 rounded px-3 py-1.5 font-medium text-sm'
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
