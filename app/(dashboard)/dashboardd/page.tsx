import type { Metadata } from 'next';
import { BookIcon, LayoutListIcon, UsersIcon } from 'lucide-react';

import { siteConfig } from '@/config/site';

import Card from '@/components/dashboard/Card';
import Title from '@/components/systems/Title';

import DashboardPage from './dashboard-page';

export const metadata: Metadata = {
  title: 'Dashboardd',
  description: 'Dashboardd Page',
  alternates: {
    canonical: `${siteConfig.url}/dashboardd`,
  },
  openGraph: {
    title: 'Dashboardd',
    description: 'Dashboardd Page',
    url: `${siteConfig.url}/dashboardd`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=Dashboardd`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboardd',
    description: 'Dashboardd Page',
    images: [`${siteConfig.url}/api/og?title=Dashboardd`],
  },
};

async function getTotalDashboard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch total dashboard data');
  }
  return res.json();
}

// async function getTotalAuthor() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/total-authors`, { cache: 'no-store' });
//   if (!res.ok) {
//     // This will activate the closest `error.tsx` Error Boundary
//     throw new Error('Failed to fetch total author data');
//   }
//   return res.json();
// }

// async function getTotalBook() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/total-books`, { cache: 'no-store' });
//   if (!res.ok) {
//     // This will activate the closest `error.tsx` Error Boundary
//     throw new Error('Failed to fetch total book data');
//   }
//   return res.json();
// }

// async function getTotalGenre() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/dashboard/total-genres`, { cache: 'no-store' });
//   if (!res.ok) {
//     // This will activate the closest `error.tsx` Error Boundary
//     throw new Error('Failed to fetch total genre data');
//   }
//   return res.json();
// }

async function getStatisticBookByAuthor() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/statistics/book-by-author`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch book by author data');
  }
  return res.json();
}

async function getStatisticBookByGenre() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/statistics/book-by-genre`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error('Failed to fetch book by genre data');
  }
  return res.json();
}

export default async function Page() {
  const totalDashboard = await getTotalDashboard();
  // const totalAuthor = await getTotalAuthor();
  // const totalBook = await getTotalBook();
  // const totalGenre = await getTotalGenre();
  const statisticBookByAuthor = await getStatisticBookByAuthor();
  const statisticBookByGenre = await getStatisticBookByGenre();
  // TODO Docs https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
  // const totalDashboardData = getTotalDashboard();
  // const statisticBookByAuthorData = getStatisticBookByAuthor();
  // const statisticBookByGenreData = getStatisticBookByGenre();
  // // Initiate both requests in parallel
  // // Wait for the promises to resolve
  // const [totalDashboard, statisticBookByAuthor, statisticBookByGenre] = await Promise.all([
  //   totalDashboardData,
  //   statisticBookByAuthorData,
  //   statisticBookByGenreData,
  // ]);

  return (
    <>
      <Title>Dashboardd</Title>

      <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {/* <Card
          title='Author'
          link='/author'
          count={totalAuthor.author}
          icon={<UsersIcon className='h-12 w-12' />}
          data-testid='author-count'
        />
        <Card
          title='Book'
          link='/book'
          count={totalBook.book}
          icon={<BookIcon className='h-12 w-12' />}
          data-testid='book-count'
        />
        <Card
          title='Genre'
          link='/genre'
          count={totalGenre.genre}
          icon={<LayoutListIcon className='h-12 w-12' />}
          data-testid='genre-count'
        /> */}
        <Card
          title='Author'
          link='/author'
          count={totalDashboard.author}
          icon={<UsersIcon className='h-12 w-12' />}
          data-testid='author-count'
        />
        <Card
          title='Book'
          link='/book'
          count={totalDashboard.book}
          icon={<BookIcon className='h-12 w-12' />}
          data-testid='book-count'
        />
        <Card
          title='Genre'
          link='/genre'
          count={totalDashboard.genre}
          icon={<LayoutListIcon className='h-12 w-12' />}
          data-testid='genre-count'
        />
      </div>

      <DashboardPage
        dataStatisticBookByAuthor={statisticBookByAuthor}
        dataStatisticBookByGenre={statisticBookByGenre}
      />
    </>
  );
}
