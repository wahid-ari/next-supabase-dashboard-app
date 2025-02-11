import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/config/site';

import Title from '@/components/systems/Title';

import DetailGenrePage from './detail-genre-page';

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre?id=${id}`);
  if (res.status == 404) {
    notFound();
  }
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch genre data');
  }
  return res.json();
}

export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const data = await getData(params.id);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${data.name}`,
    description: `Discover ${data.name} Books`,
    alternates: {
      canonical: `${siteConfig.url}/genre/${params.id}`,
    },
    openGraph: {
      title: `${data.name}`,
      description: `Discover ${data.name} Books`,
      url: `${siteConfig.url}/genre/${params.id}`,
      images: [`${siteConfig.url}/api/og?title=${data.name} Books `, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name}`,
      description: `Discover ${data.name} Books`,
      images: [`${siteConfig.url}/api/og?title=${data.name} Books `, ...previousImages],
    },
  };
}

export default async function Page({ params }) {
  const data = await getData(params.id);

  return (
    <>
      <Title>{data?.name} Books</Title>
      <DetailGenrePage data={data} />
    </>
  );
}
