import type { Metadata } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

import LayoutPage from './layout-page';

export const metadata: Metadata = {
  title: 'Layout',
  description: 'Layout Design Page',
};

const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

export default function Page() {
  return (
    <Layout>
      <div className='relative'>
        <Title>Layout</Title>
        <span className='absolute left-[85px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' className='pt-4' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#breadcrumb'>
              Breadcrumb
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#nav-accordion'>
              NavAccordion
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#nav-link'>
              NavLink
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#nav-link-logout'>
              NavLink.logout
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#menu'>
              Menu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#theme-changer'>
              ThemeChanger
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#navbar'>
              Navbar
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#layout'>
              Layout
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#sidebar'>
              Sidebar
            </Link>
          </span>
        </div>
      </Wrapper>

      <LayoutPage />
    </Layout>
  );
}
