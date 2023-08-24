import Title from '@/components/systems/Title';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse - NextJS',
  description: 'Browse Page',
};

export default function Page() {
  return <Title className='mb-4'>Browse</Title>;
}
