'use client';

import { useState } from 'react';

import SelectBox from '@/components/systems/SelectBox';

export default function DemoSelectbox() {
  const searchBoxData = [
    {
      id: 1,
      name: 'Option 1',
    },
    {
      id: 2,
      name: 'Option 2',
    },
    {
      id: 3,
      name: 'Option 3',
    },
  ];
  const [selectBox, setSelectBox] = useState();
  function handleSelectBoxChange(e) {
    setSelectBox(e);
  }

  return (
    <SelectBox
      data-testid='selectbox'
      label='Select Box'
      placeholder='Select Box'
      value={selectBox}
      onChange={handleSelectBoxChange}
      options={searchBoxData}
    />
  );
}
