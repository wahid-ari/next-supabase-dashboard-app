import type { Metadata } from 'next';

import FrontLayout from '@/components/front/FrontLayout';

export const metadata: Metadata = {
  title: 'Home - Next.js App Router',
  description: 'Home Page',
};

export default function Page() {
  return <FrontLayout>{''}</FrontLayout>;
}
