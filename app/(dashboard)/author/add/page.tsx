import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { siteConfig } from '@/config/site';
import { authOptions } from '@/libs/auth';

import Title from '@/components/systems/Title';

import AddAuthorPage from './add-author-page';

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
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <Title>Create Author</Title>

      <AddAuthorPage />
    </>
  );
}
