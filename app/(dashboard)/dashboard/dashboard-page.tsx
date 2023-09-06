'use client';

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
import {
  BarChart,
  Bar as BarRecharts,
  CartesianGrid,
  Cell,
  Legend as LegendRecharts,
  PieChart,
  Pie as PieRecharts,
  ResponsiveContainer,
  Tooltip as TooltipRecharts,
  XAxis,
  YAxis,
} from 'recharts';

import { cn } from '@/libs/utils';
import { options, optionsBarChart, optionsHorizontalBarChart, populateData } from '@/utils/chartSetup';
import { useMounted } from '@/hooks/useMounted';
import useWindowSize from '@/hooks/useWindowSize';

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

const COLORS = [
  '#36b9cc',
  '#1cc88a',
  '#6f42c1',
  '#e74a3b',
  '#fd7e14',
  '#f6c23e',
  '#84cc16',
  '#22c55e',
  '#2563eb',
  '#f43f5e',
  '#8b5cf6',
  '#ea580c',
  '#facc15',
];

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
  const windowSize = useWindowSize();
  const mounted = useMounted();

  return (
    <div className='mt-5 grid grid-cols-1 gap-5'>
      <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
          <Text.medium className='text-[15px]'>Total Book by Genre (Recharts)</Text.medium>
        </div>
        {mounted ? (
          <div className='m-auto w-80 py-3'>
            <ResponsiveContainer width='100%' height={350}>
              <PieChart data={dataStatisticBookByGenre}>
                <PieRecharts
                  className='focus:outline-1 dark:focus:!outline-1 focus:outline-sky-600 dark:focus:!outline-sky-500 mb-4'
                  data={dataStatisticBookByGenre}
                  dataKey='total'
                  type='monotone'
                  strokeWidth={2}
                  stroke={theme == 'dark' ? '#171717' : '#fff'}
                  fill='#adfa1d'
                  cx='50%'
                  cy='50%'
                  innerRadius={windowSize.width < 450 ? 50 : 60}
                  outerRadius={windowSize.width < 450 ? 80 : 90}
                  label={true}
                  labelLine={true}
                  paddingAngle={1}
                >
                  {dataStatisticBookByGenre.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </PieRecharts>
                <TooltipRecharts
                  content={<CustomTooltip category='Genre' />}
                  cursor={{
                    stroke: theme == 'dark' ? '#525252' : '#a3a3a3',
                    strokeWidth: 1,
                    fill: 'transparent',
                    strokeDasharray: 10,
                  }}
                />
                <LegendRecharts formatter={renderColorfulLegendText} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className='py-3 w-80 m-auto'>
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
            <div className='mt-3 w-64 mx-auto flex flex-wrap justify-center gap-y-2 gap-x-4 mb-3'>
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
          </div>
        )}
      </div>

      <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
          <Text.medium className='text-[15px]'>Total Book by Author (Recharts)</Text.medium>
        </div>
        <div className='m-auto p-3'>
          {mounted ? (
            <ResponsiveContainer width='100%' height={350}>
              <BarChart
                data={dataStatisticBookByAuthor}
                barCategoryGap={
                  windowSize.width > 1200 ? 20 : windowSize.width > 900 ? 15 : windowSize.width > 600 ? 10 : 5
                }
              >
                <XAxis
                  dataKey='label'
                  // label="Height"
                  stroke={theme == 'dark' ? '#a3a3a3' : '#525252'}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  height={65}
                  interval={0}
                  tick={<CustomXAxisTick />}
                />
                <YAxis
                  stroke={theme == 'dark' ? '#a3a3a3' : '#525252'}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <BarRecharts dataKey='total' fill='#adfa1d' radius={[4, 4, 0, 0]}>
                  {dataStatisticBookByAuthor.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </BarRecharts>
                <TooltipRecharts
                  content={<CustomTooltip category='Author' />}
                  cursor={{
                    stroke: theme == 'dark' ? '#525252' : '#a3a3a3',
                    strokeWidth: 1,
                    fill: 'transparent',
                    strokeDasharray: 10,
                  }}
                />
                {/* <CartesianGrid strokeDasharray='4' /> */}
              </BarChart>
            </ResponsiveContainer>
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

      <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='bg-neutral-100/80 p-3 dark:bg-[#1F1F1F]'>
          <Text.medium className='text-[15px]'>Total Book by Genre</Text.medium>
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
          <Text.medium className='text-[15px]'>Total Book by Author</Text.medium>
        </div>
        <div className='p-3'>
          {mounted ? (
            <Bar
              options={optionsBarChart(theme)}
              data={dataBookByAuthor}
              height={windowSize.width > 800 ? 100 : windowSize.width > 640 ? 150 : windowSize.width > 480 ? 250 : 350}
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

function CustomTooltip({
  active,
  payload,
  label,
  category = 'Category',
}: {
  active?: boolean;
  payload?: any;
  label?: string;
  category?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className='rounded bg-white/80 p-3 shadow backdrop-blur-sm dark:bg-neutral-900/80'>
        <p className='mb-2 font-medium'>{`${category} : ${label || payload[0].payload.label}`}</p>
        <p className='font-medium'>{`Total Book : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

function CustomXAxisTick({ x, y, payload }: any) {
  const { theme } = useTheme();
  const windowSize = useWindowSize();
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill={theme == 'light' ? '#525252' : '#a3a3a3'}
        color={theme == 'light' ? '#525252' : '#a3a3a3'}
        fontSize={windowSize.width > 550 ? 13 : 12}
        transform='rotate(-35)'
      >
        {payload.value.split(' ')[payload.value.split(' ').length - 1]}
      </text>
    </g>
  );
}

function renderColorfulLegendText(value: string, entry: any) {
  return (
    <span className='text-neutral-700 dark:text-neutral-300'>
      {entry.payload.label} - <span className='font-semibold'>{entry.payload.total}</span>
    </span>
  );
}
