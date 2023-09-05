'use client';

import { useEffect, useState } from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useTheme } from 'next-themes';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

import { cn } from '@/libs/utils';
import { options, optionsBarChart, optionsHorizontalBarChart, populateData } from '@/utils/chartSetup';
import { useMounted } from '@/hooks/useMounted';

import Text from '@/components/systems/Text';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
);

export default function DashboardPage({
  dataStatisticBookByAuthor,
  dataStatisticBookByGenre,
}: {
  dataStatisticBookByAuthor: any;
  dataStatisticBookByGenre: any;
}) {
  const dataBookByAuthor = populateData(dataStatisticBookByAuthor, 'book');
  const dataBookByGenre = populateData(dataStatisticBookByGenre, 'book');

  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(0);
  const mounted = useMounted();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [mounted]);

  return (
    <div className='mt-5 grid grid-cols-1 gap-5'>
      <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
          <Text.medium>Total Book by Genre</Text.medium>
        </div>
        {mounted ? (
          <div className='m-auto w-80 py-3'>
            <Pie options={options} data={dataBookByGenre} />
          </div>
        ) : (
          <div className='py-3 w-80 m-auto'>
            <div className='flex flex-wrap justify-center gap-y-2 gap-x-4 mb-3'>
              <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-12 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
            <div
              className={cn(
                'relative isolate w-64 h-64 m-auto overflow-hidden rounded-full bg-neutral-200/60 p-4',
                'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
                'before:bg-gradient-to-r before:from-transparent before:via-white/60',
                'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
              )}
            >
              <div className='h-full w-full rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </div>
        )}
      </div>

      <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
          <Text.medium>Total Book by Author</Text.medium>
        </div>
        <div className='p-3'>
          {mounted ? (
            <Bar
              options={optionsBarChart(theme)}
              data={dataBookByAuthor}
              height={windowWidth > 800 ? 100 : windowWidth > 640 ? 150 : windowWidth > 480 ? 250 : 350}
            />
          ) : (
            <div
              className={cn(
                'relative isolate overflow-hidden rounded-xl bg-neutral-200/60 p-4 px-8',
                'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]',
                'before:bg-gradient-to-r before:from-transparent before:via-white/60',
                'before:to-transparent dark:bg-[#1f1f1f] dark:before:via-rose-100/10',
              )}
            >
              <div className='flex flex-row items-end gap-2 sm:gap-4 md:gap-8 lg:gap-10'>
                <div className='h-32 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-16 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-32 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-16 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-64 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-72 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
