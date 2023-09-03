import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import Title from '@/components/systems/Title';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard Page',
  alternates: {
    canonical: `${siteConfig.url}/dashboard`,
  },
  openGraph: {
    title: 'Dashboard',
    description: 'Dashboard Page',
    url: `${siteConfig.url}/dashboard`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Dashboard`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard',
    description: 'Dashboard Page',
    images: [`${siteConfig.url}/api/og?title=Dashboard`],
  },
};

export default function Page() {
  return (
    <>
      <Title>Dashboard</Title>
    </>
  );
}
