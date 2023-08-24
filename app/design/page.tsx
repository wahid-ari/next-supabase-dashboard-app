import type { Metadata } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Code from '@/components/systems/Code';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

import DemoDialog from './_components/DemoDialog';
import DemoDropdownMenu from './_components/DemoDropdownMenu';
import DemoModal from './_components/DemoModal';
import DemoReactSelect from './_components/DemoReactSelect';
import DemoReactTable from './_components/DemoReactTable';
import DemoSearchbox from './_components/DemoSearchbox';
import DemoUseToast from './_components/DemoUseToast';
import DemoValidation from './_components/DemoValidation';
import DemoValidationZod from './_components/DemoValidationZod';
import DemoValidationZodObject from './_components/DemoValidationZodObject';
import DesignPage from './design-page';

export const metadata: Metadata = {
  title: 'Components - NextJS',
  description: 'Components Design Page',
};

const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

export default function Page() {
  return (
    <Layout>
      <Title>Components</Title>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#validation'>
              Validation (YUP)
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#validation-zod'>
              Validation (ZOD)
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#validation-zod-object'>
              Validation (ZOD Object)
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dialog'>
              Dialog
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#modal'>
              Modal
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#searchbox'>
              SearchBox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#react-select'>
              ReactSelect
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#reacttable'>
              ReactTable
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dropdownmenu'>
              DropdownMenu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#code'>
              Code
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#usetoast'>
              useToast
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#hover-card'>
              HoverCard
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
            <Link className={tocClass} href='#linkbutton'>
              LinkButton
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#checkbox'>
              Checkbox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#container'>
              Container
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#heading'>
              Heading
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input'>
              Input
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#inputdisabled'>
              Input.disabled
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#fileinput'>
              FileInput
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#label'>
              Label
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#labeledinput'>
              LabeledInput
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#labeledinputdisabled'>
              LabeledInput.disabled
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input-debounce'>
              InputDebounce
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#text-area'>
              TextArea
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#textareadisabled'>
              TextArea.disabled
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#select'>
              Select
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#progress'>
              Progress
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#radio'>
              Radio
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#shimer'>
              Shimer
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabs'>
              Tabs
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabspanel'>
              Tabs.panel
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#table'>
              Table
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabletr'>
              Table.tr
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabletd'>
              Table.td
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#table-simple'>
              TableSimple
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tablesimple-tr'>
              TableTableSimple.tr
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tablesimple-td'>
              TableTableSimple.td
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#text'>
              Text
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#card'>
              Card
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#section'>
              Section
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#show-more'>
              ShowMore
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#loading-dots'>
              LoadingDots
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#loading-skeleton'>
              LoadingSkeleton
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper id='validation' name='Validation (yup)' noChildren noClassName noProps>
        <DemoValidation />
      </Wrapper>

      <Wrapper id='validation-zod' name='Validation (zod)' noChildren noClassName noProps>
        <DemoValidationZod />
      </Wrapper>

      <Wrapper id='validation-zod-object' name='Validation (zod object)' noChildren noClassName noProps>
        <DemoValidationZodObject />
        <p className='mt-4 flex flex-col'>
          Ref
          <span>
            <a
              href='https://next-form-validation.vercel.app/example/zod-object'
              target='_blank'
              rel='noreferrer'
              className='text-sky-500 transition-all hover:text-sky-600'
            >
              Zod Object
            </a>
          </span>
        </p>
        <p>
          <a
            href='https://next-form-validation.vercel.app/example/zod-object-validation'
            target='_blank'
            rel='noreferrer'
            className='text-sky-500 transition-all hover:text-sky-600'
          >
            Zod Object Validation
          </a>
        </p>
      </Wrapper>

      <Wrapper
        id='dialog'
        name='Dialog (Radix)'
        noClassName
        noProps
        props={['open', 'setOpen', 'title', 'children', 'isDanger', 'onClose', 'onConfirm', 'showIcon']}
      >
        <DemoDialog />
      </Wrapper>

      <Wrapper
        id='modal'
        name='Modal (HeadlessUI)'
        noClassName
        noProps
        props={['open', 'title', 'children', 'isDanger', 'onClose', 'onConfirm', 'showIcon', 'confirmText']}
      >
        <DemoModal />
      </Wrapper>

      <Wrapper
        id='searchbox'
        name='SearchBox'
        noClassName
        noProps
        noChildren
        props={['label', 'value', 'placeholder', 'onChange', 'query', 'onChangeQuery', 'afterLeave', 'filtered']}
      >
        <DemoSearchbox />
      </Wrapper>

      <Wrapper
        id='react-select'
        name='ReactSelect'
        noChildren
        props={[
          'instanceId',
          'options',
          'isMulti',
          'noOptionsMessage',
          'value',
          'onChange',
          'placeholder',
          'name',
          'classNamePrefix',
          'theme',
        ]}
      >
        <DemoReactSelect />
      </Wrapper>

      <Wrapper
        id='reacttable'
        name='React Table'
        props={['columns', 'data', 'page_size', 'bordered', 'itemPerPage', 'keyword', 'showInfo', 'filteredLength']}
        noProps
        noWrap
      >
        <DemoReactTable />
      </Wrapper>

      <Wrapper id='dropdownmenu' name='DropdownMenu' noChildren noClassName noProps>
        <DemoDropdownMenu />
      </Wrapper>

      <Wrapper id='code' name='Code' noChildren props={['name', 'code', 'lang']}>
        <Code
          data-testid='code'
          code={`import useToast from '@utils/useToast()'

const { updateToast, pushToast, dismissToast } = useToast();

function toastAsync() {
  const toastId = pushToast({
    message: "Loading Posting Data",
    isLoading: true,
  });
  setTimeout(() => {
    updateToast({ toastId, message: "Posting Data Success", isError: false });
  }, 3000);
};`}
        />
      </Wrapper>

      <Wrapper id='usetoast' name='useToast (hook)' noProps noChildren noClassName>
        <DemoUseToast />
      </Wrapper>

      <DesignPage />
    </Layout>
  );
}
