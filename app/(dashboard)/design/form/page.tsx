import type { Metadata } from 'next';
import Link from 'next/link';

import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

import FormPage from './form-page';

export const metadata: Metadata = {
  title: 'Form',
  description: 'Form Design Page',
};

const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

export default function Page() {
  return (
    <>
      <div className='relative'>
        <Title>Form</Title>
        <span className='absolute left-[65px] top-1 flex h-5 w-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex h-3 w-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' className='pt-4' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input'>
              Input
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#checkbox'>
              Checkbox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#datepicker'>
              DatePicker
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#radiogroup'>
              RadioGroup
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#select'>
              Select
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#switch'>
              Switch
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#textarea'>
              Textarea
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#combobox'>
              Combobox
            </Link>
          </span>
        </div>
      </Wrapper>

      <FormPage />
    </>
  );
}
