import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import Title from '@/components/systems/Title';

import AddPage from './add-page';

export const metadata: Metadata = {
  title: 'Add Author',
  description: 'Add Author Page',
  alternates: {
    canonical: `${siteConfig.url}/author`,
  },
  openGraph: {
    title: 'Add Author',
    description: 'Add Author Page',
    url: `${siteConfig.url}/author`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Add Author`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add Author',
    description: 'Add Author Page',
    images: [`${siteConfig.url}/api/og?title=Add Author`],
  },
};

export default async function Page() {
  return (
    <>
      <Title className='mb-6'>Create Author</Title>

      <AddPage />
    </>
  );
}
