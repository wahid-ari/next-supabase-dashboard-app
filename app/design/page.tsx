'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import * as yup from 'yup';

import useToast from '@/hooks/useToast';
import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Code from '@/components/systems/Code';
import LabeledInput from '@/components/systems/LabeledInput';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

export const metadata: Metadata = {
  title: 'Design System - NextJS',
  description: 'Design Page',
};

const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

export default function Design() {
  const { updateToast, pushToast, dismissToast } = useToast();
  let userSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username required')
      .matches(/^[A-Za-z]+$/, 'Username must be alphabet'),
    email: yup.string().required('Email required').email('Email must be valid').typeError('Email must be valid'),
    angka: yup
      .number()
      .required('Number required')
      .integer('Number must be integer not float')
      .typeError('Number must be valid'),
    angka_positif: yup
      .number()
      .required('Number positive required')
      .positive('Number positive must be positif')
      .integer('Number positive must be integer not float')
      .typeError('Number positive must be valid'),
  });
  const [user, setUser] = useState({
    username: '',
    email: '',
    angka: '',
    angka_positif: '',
  });
  function handleUserChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function checker(schema: any, param: any) {
    try {
      await schema.validate(param, { abortEarly: false });
      return { valid: true };
    } catch (err: any) {
      return { valid: false, errors: err.errors };
    }
  }
  async function checkValid() {
    try {
      const { valid, errors } = await checker(userSchema, user);
      if (!valid && errors) {
        dismissToast();
        errors.forEach((el: any) => {
          pushToast({ message: el, isError: true });
        });
      }
      // console.log(valid);
      // console.log(errors);
      if (valid) {
        const toastId = pushToast({
          message: 'Posting YUP Data',
          isLoading: true,
        });
        setTimeout(() => {
          updateToast({ toastId, message: 'Success Posting YUP Data', isError: false });
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  }

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
            <Link className={tocClass} href='#reactselect'>
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
            <Link className={tocClass} href='#inputdebounce'>
              InputDebounce
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#textarea'>
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
        <LabeledInput
          data-testid='username-yup'
          label='Username'
          name='username'
          value={user.username}
          placeholder='Username'
          onChange={handleUserChange}
        />
        <LabeledInput
          data-testid='email-yup'
          label='Email'
          name='email'
          type='email'
          value={user.email}
          placeholder='Email'
          onChange={handleUserChange}
        />
        <LabeledInput
          data-testid='number-yup'
          type='number'
          label='Number'
          name='angka'
          value={user.angka}
          placeholder='Number'
          onChange={handleUserChange}
        />
        <LabeledInput
          data-testid='positive-yup'
          type='number'
          min={0}
          label='Positif Number'
          name='angka_positif'
          value={user.angka_positif}
          placeholder='Positif Number'
          onChange={handleUserChange}
        />
        <Button onClick={checkValid}>Submit Yup</Button>
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
    </Layout>
  );
}
