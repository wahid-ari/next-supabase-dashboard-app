import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRightIcon, ImageIcon } from 'lucide-react';

import { siteConfig } from '@/config/site';

import Heading from '@/components/systems/Heading';
import ShowMore from '@/components/systems/ShowMore';
import Title from '@/components/systems/Title';

async function getData(id: string) {
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

export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const data = await getData(params.id);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${data.title}`,
    description: `Detail ${data.title}`,
    alternates: {
      canonical: `${siteConfig.url}/book/detail/${params.id}`,
    },
    openGraph: {
      title: `${data.title}`,
      description: `Detail ${data.title}`,
      url: `${siteConfig.url}/book/detail/${params.id}`,
      images: [`${siteConfig.url}/api/og?title=${data.title}`, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title}`,
      description: `Detail ${data.title}`,
      images: [`${siteConfig.url}/api/og?title=${data.title} `, ...previousImages],
    },
  };
}

export default async function Page({ params }) {
  const data = await getData(params.id);

  return (
    <>
      <Title className='mb-6'>{data?.title}</Title>

      <div className='gap-6 sm:flex'>
        {data?.image ? (
          <div className='top-16 mx-auto w-3/5 self-start overflow-hidden sm:sticky sm:mx-0 sm:w-1/4 lg:w-1/5'>
            <Image
              alt={data?.title}
              src={data?.image}
              width={250}
              height={250}
              className={`mx-auto w-52 rounded`}
              unoptimized
            />
          </div>
        ) : (
          <div className='mx-auto w-3/5 overflow-hidden sm:mx-0 sm:w-1/4 lg:w-1/5'>
            <div className='flex h-64 w-full items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
              <ImageIcon className='h-16 w-16 text-neutral-500' />
            </div>
          </div>
        )}
        <div className='mt-6 w-full sm:mt-0 sm:w-3/4'>
          <div>
            <table className='text-[15px]'>
              <tbody>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>ISBN</td>
                  <td className='pb-2'>{data?.isbn ? data.isbn : '-'}</td>
                </tr>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>Language</td>
                  <td className='pb-2'>{data?.language ? data.language : '-'}</td>
                </tr>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>Pages</td>
                  <td className='pb-2'>{data?.pages ? data.pages : '-'}</td>
                </tr>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>Published</td>
                  <td className='pb-2'>{data?.published ? data.published : '-'}</td>
                </tr>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>Genre</td>
                  <td className='pb-2'>
                    <p className='font-medium text-neutral-700 dark:text-neutral-200'>
                      {data?.genre_array.map((item: any, index: number) => {
                        return (
                          <>
                            <Link
                              key={index + 1}
                              href={`/genre/${item.id}`}
                              className='rounded text-[15px] font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                            >
                              {item.name}
                            </Link>
                            {index < data.genre_array.length - 1 ? ', ' : ''}
                          </>
                        );
                      })}
                      {data.genre_array?.length < 1 && '-'}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>Goodreads</td>
                  <td className='pb-2'>
                    {data?.link ? (
                      <a
                        href={data?.link}
                        className='flex w-16 items-center rounded text-[15px] font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Open
                        <ArrowUpRightIcon className='ml-1 h-4 w-4' />
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>{data?.description}</p>

            <hr className='my-8 h-px border-0 bg-neutral-300 dark:bg-neutral-700' />
            <Heading h2>About the author</Heading>
            <div className='flex items-center gap-3'>
              {data?.book_authors?.image ? (
                <Link
                  href={`/author/detail/${data?.book_authors?.id}`}
                  className='rounded text-base font-medium text-neutral-900 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-100'
                >
                  <Image
                    alt={data?.book_authors?.name}
                    src={data?.book_authors?.image}
                    width={50}
                    height={50}
                    className='h-20 w-20 rounded-full object-cover brightness-90 transition-all duration-300 hover:brightness-100'
                    unoptimized
                  />
                </Link>
              ) : (
                <div className='flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800'>
                  <ImageIcon className='h-8 w-8 text-neutral-500' />
                </div>
              )}
              <div>
                <Link
                  href={`/author/detail/${data?.book_authors?.id}`}
                  className='rounded text-base font-medium text-neutral-900 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-100 dark:hover:text-sky-500'
                >
                  {data?.book_authors?.name}
                </Link>
                {data?.book_authors?.web ? (
                  <a
                    href={data?.book_authors?.web}
                    className='mt-1 flex w-16 items-center rounded text-[15px] font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Web
                    <ArrowUpRightIcon className='ml-1 h-4 w-4' />
                  </a>
                ) : null}
              </div>
            </div>
            {data?.book_authors?.bio ? (
              <ShowMore count={400} className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>
                {data?.book_authors?.bio}
              </ShowMore>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
