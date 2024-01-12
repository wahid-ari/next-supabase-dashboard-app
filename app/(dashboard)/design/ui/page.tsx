import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

import UiPage from './ui-page';

export const metadata: Metadata = {
  title: 'UI',
  description: 'UI Design Page',
  alternates: {
    canonical: `${siteConfig.url}/design/ui`,
  },
  openGraph: {
    title: 'UI',
    description: 'UI Design Page',
    url: `${siteConfig.url}/design/ui`,
    images: [
      {
        url: `${siteConfig.url}/api/og?title=UI`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI',
    description: 'UI Design Page',
    images: [`${siteConfig.url}/api/og?title=UI`],
  },
};

const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

export default function Page() {
  return (
    <>
      <div className='relative'>
        <Title>UI</Title>
        <span className='absolute left-[30px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' className='pt-4' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#accordion'>
              Accordion
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#alert'>
              Alert
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#alertdialog'>
              AlertDialog
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#aspectratio'>
              AspectRatio
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#avatar'>
              Avatar
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#badge'>
              Badge
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#button'>
              Button
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#calendar'>
              Calendar
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#card'>
              Card
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#carousel'>
              Carousel
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#checkbox'>
              Checkbox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#collapsible'>
              Collapsible
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#combobox'>
              Combobox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#command'>
              Command
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#contextmenu'>
              ContextMenu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#datatable'>
              DataTable
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#datepicker'>
              DatePicker
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dialog'>
              Dialog
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#drawer'>
              Drawer
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dropdownmenu'>
              DropdownMenu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#hovercard'>
              HoverCard
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input'>
              Input
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input-debounce'>
              InputDebounce
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#label'>
              Label
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#menubar'>
              Menubar
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#navigationmenu'>
              NavigationMenu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#pagination'>
              Pagination
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#popover'>
              Popover
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#progress'>
              Progress
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#radiogroup'>
              RadioGroup
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#resizable'>
              Resizable
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#scrollarea'>
              ScrollArea
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#select'>
              Select
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#separator'>
              Separator
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#sheet'>
              Sheet
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#skeleton'>
              Skeleton
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#slider'>
              Slider
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#sonner'>
              Sonner (Toast)
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#switch'>
              Switch
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#table'>
              Table
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabs'>
              Tabs
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#textarea'>
              Textarea
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#theme'>
              Theme
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#toast'>
              Toast
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#toggle'>
              Toggle
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#togglegroup'>
              ToggleGroup
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tooltip'>
              Tooltip
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#typography'>
              Typography
            </Link>
          </span>
        </div>
      </Wrapper>

      <UiPage />
    </>
  );
}
