import { cn } from '@/libs/utils';

type Props = {
  className?: string;
  status?: string;
  title?: string;
  message?: string;
  link?: string;
  reset: () => void;
  [props: string]: any;
};
export default function ErrorPage({
  className,
  status = '500',
  title = 'Server Error',
  message = 'Internal Server Error',
  reset,
  ...props
}: Props) {
  return (
    <div className={cn('flex h-[500px] items-center justify-center', className)} {...props}>
      <div className='text-center'>
        <h2 className='mb-4 text-5xl font-semibold'>{status}</h2>
        <p className='text-lg font-medium'>{title}</p>
        <p className='mb-4 text-base'>Message : {message}</p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className='rounded bg-sky-600 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-sky-500'
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
