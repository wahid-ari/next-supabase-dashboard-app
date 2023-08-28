import type { Metadata } from 'next';
import Link from 'next/link';

import Auth from '@/components/example/auth/Auth';
import Card from '@/components/example/card/Card';
import Dashboard from '@/components/example/dashboard/Dashboard';
import Music from '@/components/example/music/Music';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

export const metadata: Metadata = {
  title: 'Example UI',
  description: 'Example UI Design Page',
};

const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

export default function Page() {
  return (
    <>
      <div className='relative'>
        <Title>Example UI</Title>
        <span className='absolute left-[135px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' className='pt-4' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dashboard'>
              Dashboard
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#card'>
              Card
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#music'>
              Music
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#auth'>
              Auth
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper
        id='dashboard'
        name='Dashboard'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/examples/dashboard'
      >
        <Dashboard />
      </Wrapper>

      <Wrapper id='card' name='Card' noChildren noClassName noProps docs='https://ui.shadcn.com/examples/card'>
        <Card />
      </Wrapper>

      <Wrapper id='music' name='Music' noChildren noClassName noProps docs='https://ui.shadcn.com/examples/music'>
        <Music />
      </Wrapper>

      <Wrapper
        id='auth'
        name='Auth'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/examples/authentication'
      >
        <Auth />
      </Wrapper>
    </>
  );
}
