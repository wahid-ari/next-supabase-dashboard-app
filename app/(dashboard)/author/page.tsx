import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { siteConfig } from '@/config/site';
import { authOptions } from '@/libs/auth';

import Title from '@/components/systems/Title';

export const metadata: Metadata = {
  title: 'Author',
  description: 'Author Page',
  alternates: {
    canonical: `${siteConfig.url}/author`,
  },
  openGraph: {
    title: 'Author',
    description: 'Author Page',
    url: `${siteConfig.url}/author`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Author`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Author',
    description: 'Author Page',
    images: [`${siteConfig.url}/api/og?title=Author`],
  },
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <Title>Author</Title>
    </>
  );
}
