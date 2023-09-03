import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import Title from '@/components/systems/Title';

export const metadata: Metadata = {
  title: 'Book',
  description: 'Book Page',
  alternates: {
    canonical: `${siteConfig.url}/book`,
  },
  openGraph: {
    title: 'Book',
    description: 'Book Page',
    url: `${siteConfig.url}/book`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Book`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book',
    description: 'Book Page',
    images: [`${siteConfig.url}/api/og?title=Book`],
  },
};

export default function Page() {
  return (
    <>
      <Title>Book</Title>
    </>
  );
}
