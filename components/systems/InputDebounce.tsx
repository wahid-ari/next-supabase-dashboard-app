'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: any) => void;
  type?: string;
  className?: string;
  wrapperClassName?: string;
  debounce?: number;
  [props: string]: any;
};

export default function InputDebounce({
  name,
  label,
  placeholder,
  value: initialValue,
  defaultValue,
  onChange,
  type,
  className,
  wrapperClassName,
  debounce = 300,
  ...props
}: Props) {
  const [value, setValue] = useState(initialValue || defaultValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      <label className='block text-sm text-neutral-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => setValue(e.target.value)}
        className={twMerge(
          'mt-2 w-full rounded-md border border-neutral-300 px-4 py-[0.6rem] text-sm font-medium outline-none transition-all',
          'bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100',
          'focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-neutral-700 dark:focus:border-sky-500 dark:focus:ring-sky-500',
          'disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      />
    </div>
  );
}
