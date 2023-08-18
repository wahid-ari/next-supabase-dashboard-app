'use client';

import { useState } from 'react';

import SearchBox from '@/components/systems/SearchBox';

export default function DemoSearchbox() {
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
  const [selectedSearchBox, setSelectedSearchBox] = useState();
  const [querySearchBox, setQuerySearchBox] = useState('');
  const filteredSearchBox =
    querySearchBox === ''
      ? searchBoxData
      : searchBoxData.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(querySearchBox.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <SearchBox
      data-testid='searchbox'
      label='Search Box'
      value={selectedSearchBox}
      placeholder='Search or Select'
      onChange={setSelectedSearchBox}
      onChangeQuery={(e) => setQuerySearchBox(e.target.value)}
      afterLeave={() => setQuerySearchBox('')}
      filtered={filteredSearchBox}
      query={querySearchBox}
    />
  );
}
