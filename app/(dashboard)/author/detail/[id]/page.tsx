import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRightIcon, ImageIcon } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { cn } from '@/libs/utils';

import Heading from '@/components/systems/Heading';
import Title from '@/components/systems/Title';

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
    title: `${data.name}`,
    description: `Detail ${data.name}`,
    alternates: {
      canonical: `${siteConfig.url}/author/detail/${params.id}`,
    },
    openGraph: {
      title: `${data.name}`,
      description: `Detail ${data.name}`,
      url: `${siteConfig.url}/author/detail/${params.id}`,
      images: [`${siteConfig.url}/api/og?title=${data.name}`, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name}`,
      description: `Detail ${data.name}`,
      images: [`${siteConfig.url}/api/og?title=${data.name} `, ...previousImages],
    },
  };
}

export default async function Page({ params }) {
  const data = await getData(params.id);

  return (
    <>
      <Title>{data?.name}</Title>

      <div className='gap-6 sm:flex'>
        {data?.image ? (
          <div className='mx-auto w-3/5 overflow-hidden sm:mx-0 sm:w-1/4 lg:w-1/5'>
            <Image
              alt={data?.name}
              src={data?.image}
              width={250}
              height={250}
              className='mx-auto w-52 rounded'
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
                  <td className='flex pb-2 pr-4 font-semibold'>Born</td>
                  <td className='w-full pb-2'>{data?.born ? data.born : '-'}</td>
                </tr>
                <tr>
                  <td className='flex pb-2 pr-4 font-semibold'>Website</td>
                  <td className='w-10 pb-2'>
                    {data?.web ? (
                      <a
                        href={data?.web}
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
            <p className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>{data?.bio}</p>
          </div>

          {data?.books?.length > 0 ? (
            <div className='mt-5'>
              <Heading>{data?.name} Books</Heading>
              {data?.books.map((item: any) => {
                return (
                  <Link
                    key={item.id}
                    href={`/book/detail/${item.id}`}
                    className='group mb-5 flex gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                  >
                    {item.image_small ? (
                      <Image
                        alt={item.title}
                        src={item.image_small?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
                        width={50}
                        height={70}
                        className='w-14 rounded object-cover brightness-90 group-hover:brightness-100'
                        unoptimized
                      />
                    ) : (
                      <div className='flex h-[72px] w-12 items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
                        <ImageIcon className='h-8 w-8 text-neutral-500' />
                      </div>
                    )}
                    <div>
                      <p className='text-[15px] font-medium text-neutral-700 transition-all duration-200 group-hover:text-sky-500 dark:text-neutral-100 '>
                        {item.title}
                      </p>
                      <p className='text-sm text-neutral-600 dark:text-neutral-200'>
                        {item.published ? item.published.split('-')[0] : '-'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}

          {data?.quotes?.length > 0 ? (
            <div className='mt-6'>
              <Heading>{data?.name} Quotes</Heading>
              {data?.quotes.map((item: any, index: number) => {
                return (
                  <div
                    key={item.id}
                    className={cn('mb-4 pb-4', index < data?.quotes.length - 1 && 'border-b dark:border-b-neutral-800')}
                  >
                    <p className='text-[15px] font-medium text-neutral-900 dark:text-neutral-100'>
                      &#8220;{item.quote}&#8221;
                    </p>
                    <p className='mt-1 text-sm italic text-neutral-700 dark:text-neutral-300'>- {data?.name}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
