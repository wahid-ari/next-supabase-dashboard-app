import type { Metadata } from 'next';

import Title from '@/components/systems/Title';

import SettingPage from './setting-page';

export const metadata: Metadata = {
  title: 'Setting',
  description: 'Setting Design Page',
};

export default function Page() {
  return (
    <>
      <Title>Setting</Title>

      <SettingPage />
    </>
  );
}
