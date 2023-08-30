import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';

import SettingPage from './setting-page';

export const metadata: Metadata = {
  title: 'Setting',
  description: 'Setting Page',
  alternates: {
    canonical: `${siteConfig.url}/setting`,
  },
  openGraph: {
    title: 'Setting',
    description: 'Setting Page',
    url: `${siteConfig.url}/setting`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Setting`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Setting',
    description: 'Setting Page',
    images: [`${siteConfig.url}/api/og?title=Setting`],
  },
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
