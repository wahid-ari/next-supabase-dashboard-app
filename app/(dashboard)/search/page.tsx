import type { Metadata } from 'next';

import Title from '@/components/systems/Title';

import SearchPage from './search-page';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search Design Page',
};

export default function Page() {
  return (
    <>
      <Title>Search</Title>

      <SearchPage />
    </>
  );
}
