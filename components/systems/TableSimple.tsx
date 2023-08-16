import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  head?: ReactNode;
  bordered?: boolean;
  caption?: string;
};

export default function TableSimple({
  children,
  className,
  wrapperClassName,
  head,
  bordered,
  caption,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        'w-full rounded',
        bordered ? 'border-t dark:border-t-neutral-800' : 'border dark:border-neutral-800',
        wrapperClassName,
      )}
    >
      <div className='overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700'>
        <table
          {...props}
          className={twMerge('w-full whitespace-nowrap text-neutral-800 dark:text-neutral-300', className)}
        >
          {caption && <caption className='my-3 caption-bottom text-[13px] dark:text-neutral-300'>{caption}</caption>}
          <thead>
            <tr className='border-b bg-gray-50 text-sm font-medium dark:border-neutral-800 dark:bg-[#202020]'>
              {head}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

type TrProps = {
  children: ReactNode;
  className?: string;
};

TableSimple.tr = ({ children, className, ...props }: TrProps) => {
  return (
    <tr
      {...props}
      className={twMerge(
        'border-b bg-white text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
        className,
      )}
    >
      {children}
    </tr>
  );
};

type TdProps = {
  children: ReactNode;
  className?: string;
  shrink?: boolean;
  bordered?: boolean;
};

TableSimple.td = ({ children, className, shrink, bordered, ...props }: TdProps) => {
  return (
    <td
      {...props}
      className={twMerge('p-3', shrink && 'w-1', bordered && 'border-x dark:border-x-neutral-800', className)}
    >
      {children}
    </td>
  );
};
