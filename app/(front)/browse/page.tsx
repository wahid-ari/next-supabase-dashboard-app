import type { Metadata } from 'next';

import Title from '@/components/systems/Title';

export const metadata: Metadata = {
  title: 'Browse',
  description: 'Browse Page',
};

export default function Page() {
  return <Title className='mb-4'>Browse</Title>;
}
