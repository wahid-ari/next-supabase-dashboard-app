'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { validateFormObject } from '@/validations/zod';
import * as yup from 'yup';
import { z } from 'zod';

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

  const zodSchema = z
    .object({
      usernamee: z
        .string()
        .regex(/^[A-Za-z]+$/, { message: 'Username must be alphabet without space' })
        .min(1, { message: 'Username is required' }),
      emaill: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
      age: z
        .number({
          required_error: 'Age is required',
          invalid_type_error: 'Age is required',
        })
        .positive({ message: 'Age must be a positive number' })
        .gt(17, { message: 'Age must be a greater than 17' })
        .int({ message: 'Age must be an integer' }),
      password: z
        .string()
        .nonempty({
          message: 'Password is required',
        })
        .min(8, { message: 'Password length minimal is 8' }),
      confirmPassword: z.string().nonempty({
        message: 'Confirm Password is required',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Oops! Password doesnt match',
    });
  const [admin, setAdmin] = useState({
    usernamee: '',
    emaill: '',
    age: '',
    password: '',
    confirmPassword: '',
  });
  function handleAdminChange(e: any) {
    let valueNumber = e.target.name == 'age' ? Number(e.target.value) : e.target.value;
    setAdmin({
      ...admin,
      // [e.target.name]: e.target.value,
      [e.target.name]: valueNumber,
    });
  }
  async function checkValidZod(e: any) {
    e.preventDefault();
    try {
      const validZod = zodSchema.safeParse(admin);
      if (validZod.success === false) {
        dismissToast();
        // console.log(validZod.error);
        // console.log(validZod.error.issues);
        validZod.error.issues.forEach((el) => {
          pushToast({ message: el.message, isError: true });
        });
      } else {
        const toastId = pushToast({
          message: 'Posting ZOD Data',
          isLoading: true,
        });
        setTimeout(() => {
          updateToast({ toastId, message: 'Success Posting ZOD Data', isError: false });
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const [userZod, setUserZod] = useState({
    username_object: '',
    email_object: '',
    age_object: '',
    password_object: '',
    confirmPassword_object: '',
  });
  const [errorsZod, setErrorsZod] = useState({
    username_object: '',
    email_object: '',
    age_object: '',
    password_object: '',
    confirmPassword_object: '',
  });
  function handleUserZodChange(e: any) {
    let valueNumber = e.target.name == 'age_object' ? Number(e.target.value) : e.target.value;
    setUserZod({
      ...userZod,
      // [e.target.name]: e.target.value,
      [e.target.name]: valueNumber,
    });
  }
  async function checkValidZodObject(e: any) {
    e.preventDefault();
    const { valid, errors } = await validateFormObject(userZod);
    if (valid) {
      const toastId = pushToast({
        message: 'Posting ZOD Object Data',
        isLoading: true,
      });
      setTimeout(() => {
        updateToast({ toastId, message: 'Success Posting ZOD Object Data', isError: false });
      }, 2000);
      setErrorsZod({
        username_object: '',
        email_object: '',
        age_object: '',
        password_object: '',
        confirmPassword_object: '',
      });
    } else {
      // @ts-ignore
      setErrorsZod(errors);
      return;
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

      <Wrapper id='validation-zod' name='Validation (zod)' noChildren noClassName noProps>
        <form onSubmit={checkValidZod}>
          <LabeledInput
            data-testid='username-zod'
            label='Username'
            name='usernamee'
            value={admin.usernamee}
            placeholder='Username'
            onChange={handleAdminChange}
          />
          <LabeledInput
            data-testid='email-zod'
            label='Email'
            name='emaill'
            type='email'
            value={admin.emaill}
            placeholder='Email'
            onChange={handleAdminChange}
          />
          <LabeledInput
            data-testid='age-zod'
            type='number'
            label='Age'
            name='age'
            value={admin.age}
            placeholder='Number'
            onChange={handleAdminChange}
          />
          <LabeledInput
            data-testid='password-zod'
            type='password'
            label='Password'
            name='password'
            value={admin.password}
            placeholder='Password'
            onChange={handleAdminChange}
          />
          <LabeledInput
            data-testid='confirmPassword-zod'
            type='password'
            label='Confirm Password'
            name='confirmPassword'
            value={admin.confirmPassword}
            placeholder='Confirm Password'
            onChange={handleAdminChange}
          />
          <Button type='submit'>Submit Zod</Button>
        </form>
      </Wrapper>

      <Wrapper id='validation-zod-object' name='Validation (zod object)' noChildren noClassName noProps>
        <form onSubmit={checkValidZodObject}>
          <LabeledInput
            data-testid='username-object'
            label='Username'
            name='username_object'
            value={userZod.username_object}
            placeholder='Username'
            onChange={handleUserZodChange}
          />
          {errorsZod?.username_object && (
            <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.username_object}</span>
          )}
          <LabeledInput
            data-testid='email-object'
            label='Email'
            name='email_object'
            type='email'
            value={userZod.email_object}
            placeholder='Email'
            onChange={handleUserZodChange}
          />
          {errorsZod?.email_object && <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.email_object}</span>}
          <LabeledInput
            data-testid='age-object'
            type='number'
            label='Age'
            name='age_object'
            value={userZod.age_object}
            placeholder='Number'
            onChange={handleUserZodChange}
            min={0}
            onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />
          {errorsZod?.age_object && <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.age_object}</span>}

          <LabeledInput
            data-testid='password-object'
            type='password'
            label='Password'
            name='password_object'
            value={userZod.password_object}
            placeholder='Password'
            onChange={handleUserZodChange}
          />
          {errorsZod?.password_object && (
            <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.password_object}</span>
          )}
          <LabeledInput
            data-testid='confirmPassword-object'
            type='password'
            label='Confirm Password'
            name='confirmPassword_object'
            value={userZod.confirmPassword_object}
            placeholder='Confirm Password'
            onChange={handleUserZodChange}
          />
          {errorsZod?.confirmPassword_object && (
            <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.confirmPassword_object}</span>
          )}
          <Button type='submit'>Submit Zod Object</Button>
        </form>
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
