import type { Metadata } from 'next';

import Layout from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: 'Design',
  description: 'Design Page',
};

export default function Design() {
  return <Layout>Design</Layout>;
}
