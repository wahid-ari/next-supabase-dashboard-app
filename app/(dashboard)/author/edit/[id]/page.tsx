import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// import { redirect } from 'next/navigation';
// import { getServerSession } from 'next-auth';

import { siteConfig } from '@/config/site';

// import { authOptions } from '@/libs/auth';

import Title from '@/components/systems/Title';

import EditAuthorPage from './edit-author-page';

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author?id=${id}`, { cache: 'no-store' });
  if (res.status == 404) {
    notFound();
  }
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch author data');
  }
  return res.json();
}

export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const data = await getData(params.id);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `Edit ${data.name}`,
    description: `Edit ${data.name}`,
    alternates: {
      canonical: `${siteConfig.url}/author/edit/${params.id}`,
    },
    openGraph: {
      title: `${data.name}`,
      description: `Edit ${data.name}`,
      url: `${siteConfig.url}/author/edit/${params.id}`,
      images: [`${siteConfig.url}/api/og?title=Edit ${data.name}`, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name}`,
      description: `Edit ${data.name}`,
      images: [`${siteConfig.url}/api/og?title=Edit ${data.name} `, ...previousImages],
    },
  };
}

export default async function Page({ params }) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect('/login');
  // }
  const data = await getData(params.id);

  return (
    <>
      <Title>Edit {data?.name}</Title>
      <EditAuthorPage data={data} />
    </>
  );
}
