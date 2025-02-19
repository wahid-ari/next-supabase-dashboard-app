import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/config/site';

import EditPage from './edit-page';

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author?id=${id}`);
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
  return (
    <>
      <EditPage id={params.id} />
    </>
  );
}
