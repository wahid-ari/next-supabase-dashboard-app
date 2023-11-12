'use client';

import { useState } from 'react';

import SelectBox from '@/components/systems/SelectBox';

export default function DemoSelectbox() {
  const selectBoxData = [
    {
      id: 1,
      name: 'Select 1',
    },
    {
      id: 2,
      name: 'Select 2',
    },
    {
      id: 3,
      name: 'Select 3',
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
      options={selectBoxData}
    />
  );
}
