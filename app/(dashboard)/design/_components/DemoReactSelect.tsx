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
        placeholder='Search or Select'
        name='reactselect'
        classNamePrefix='react-select'
        noOptionsMessage={() => 'Not Found'}
        value={reactSelect}
        // @ts-ignore
        options={reactSelectData}
        // @ts-ignore
        onChange={setReactSelect}
        isMulti
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
