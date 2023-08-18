import type { Metadata } from 'next';

import FrontLayout from '@/components/front/FrontLayout';

export const metadata: Metadata = {
  title: 'Home - NextJS',
  description: 'Home Page',
};

export default function Home() {
  return <FrontLayout>{''}</FrontLayout>;
}
