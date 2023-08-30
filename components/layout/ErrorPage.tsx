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
    <div className={cn('h-[500px] flex items-center justify-center', className)} {...props}>
      <div className='text-center'>
        <h2 className='text-5xl font-semibold mb-4'>{status}</h2>
        <p className='text-lg font-medium'>{title}</p>
        <p className='text-base mb-4'>Message : {message}</p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className='text-white bg-sky-600 transition-all hover:bg-sky-500 rounded px-2 py-1 text-sm'
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}
