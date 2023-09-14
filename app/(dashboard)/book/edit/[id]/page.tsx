import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// import { redirect } from 'next/navigation';
// import { getServerSession } from 'next-auth';

import { siteConfig } from '@/config/site';

// import { authOptions } from '@/libs/auth';

import Title from '@/components/systems/Title';

import EditBookPage from './edit-book-page';

async function getDataBook(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book?id=${id}`, { cache: 'no-store' });
  if (res.status == 404) {
    notFound();
  }
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch book data');
  }
  return res.json();
}

async function getDataAuthor() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch author data');
  }
  return res.json();
}

async function getDataGenre() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch genre data');
  }
  return res.json();
}

export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const data = await getDataBook(params.id);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `Edit ${data.title}`,
    description: `Edit ${data.title}`,
    alternates: {
      canonical: `${siteConfig.url}/book/edit/${params.id}`,
    },
    openGraph: {
      title: `${data.title}`,
      description: `Edit ${data.title}`,
      url: `${siteConfig.url}/book/edit/${params.id}`,
      images: [`${siteConfig.url}/api/og?title=Edit ${data.title}`, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title}`,
      description: `Edit ${data.title}`,
      images: [`${siteConfig.url}/api/og?title=Edit ${data.title} `, ...previousImages],
    },
  };
}

export default async function Page({ params }) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect('/login');
  // }
  const book = await getDataBook(params.id);
  const author = await getDataAuthor();
  const genre = await getDataGenre();

  return (
    <>
      <Title>Edit {book?.title}</Title>
      <EditBookPage id={params.id} book={book} author={author} genre={genre} />
    </>
  );
}
