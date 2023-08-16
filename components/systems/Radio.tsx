import { twMerge } from 'tailwind-merge';

type Props = {
  id?: string;
  label?: string;
  className?: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  defaultChecked?: boolean;
};

export default function Radio({
  id,
  label,
  className,
  name,
  value,
  onChange,
  checked,
  defaultChecked,
  ...props
}: Props) {
  return (
    <div className='group mb-3 flex items-center'>
      <input
        {...props}
        id={value}
        type='radio'
        value={value}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        className={twMerge(
          'h-4 w-4 border-neutral-300 focus:ring-2 focus:ring-sky-500 group-hover:cursor-pointer',
          'text-sky-500 dark:bg-neutral-900 dark:text-sky-500 dark:checked:bg-sky-500',
          'dark:border-neutral-700 dark:ring-offset-neutral-900 dark:focus:ring-sky-500',
          className,
        )}
      />
      <label htmlFor={value} className='ml-2 text-sm text-neutral-800 group-hover:cursor-pointer dark:text-neutral-300'>
        {label}
      </label>
    </div>
  );
}

type DisabledProps = {
  label?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
};

Radio.disabled = ({ label, className, name, defaultChecked, ...props }: DisabledProps) => {
  return (
    <div className='group mb-3 flex items-center'>
      <input
        {...props}
        disabled
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        type='radio'
        className={twMerge(
          defaultChecked ? 'dark:bg-sky-500' : 'dark:bg-transparent',
          'h-4 w-4 border-neutral-300 text-sky-500 group-hover:cursor-not-allowed dark:border-neutral-700',
          className,
        )}
      />
      <label
        htmlFor={name}
        className='ml-2 text-sm text-neutral-800 group-hover:cursor-not-allowed dark:text-neutral-300'
      >
        {label}
      </label>
    </div>
  );
};
