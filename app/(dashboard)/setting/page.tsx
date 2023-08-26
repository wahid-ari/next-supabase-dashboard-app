import type { Metadata } from 'next';

import Text from '@/components/systems/Text';
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
      <Text className='mb-2'>Dark Mode</Text>
      <SettingPage />
    </>
  );
}
