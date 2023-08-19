import type { Metadata } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

import SettingPage from './setting-page';

export const metadata: Metadata = {
  title: 'Settings - NextJS',
  description: 'Settings Design Page',
};

export default function Setting() {
  return (
    <Layout>
      <Title>Setting</Title>

      <SettingPage />
    </Layout>
  );
}
