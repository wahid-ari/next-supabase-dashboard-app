'use client';

import { useState } from 'react';
import ReactSelect from 'react-select';

import Label from '@/components/systems/Label';

export default function DemoReactSelect() {
  const reactSelectData = [
    {
      value: 1,
      label: 'Romance',
    },
    {
      value: 2,
      label: 'Comedy',
    },
    {
      value: 3,
      label: 'History',
    },
  ];
  const [reactSelect, setReactSelect] = useState();

  return (
    <>
      <Label htmlFor='reactselect' className='mb-2'>
        Category
      </Label>
      <ReactSelect
        id='reactselect'
        instanceId='reactselect'
        aria-label='React Select'
        // @ts-ignore
        options={reactSelectData}
        isMulti
        noOptionsMessage={() => 'Not Found'}
        value={reactSelect}
        // @ts-ignore
        onChange={setReactSelect}
        placeholder='Search or Select'
        name='reactselect'
        classNames={{
          option: (option) => (option.isSelected ? '!border-red-600' : '!border-grey-300'),
        }}
        classNamePrefix='react-select'
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: `#0ea5e9`,
            primary25: `#0ea5e9`,
            primary50: `#0ea5e9`,
            neutral40: `#EF4444`,
          },
        })}
      />
    </>
  );
}
