'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { faker } from '@faker-js/faker';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, MoreHorizontal } from 'lucide-react';
import ReactSelect from 'react-select';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { z } from 'zod';

import { tabledata } from '@/utils/tableData';
import { validateFormObject } from '@/validations/zod';
import { useMounted } from '@/hooks/useMounted';
import useToast from '@/hooks/useToast';

import { Button as ButtonUi } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Code from '@/components/systems/Code';
import Dialog from '@/components/systems/Dialog';
import InputDebounce from '@/components/systems/InputDebounce';
import Label from '@/components/systems/Label';
import LabeledInput from '@/components/systems/LabeledInput';
import Modal from '@/components/systems/Modal';
import ReactTable from '@/components/systems/ReactTable';
import SearchBox from '@/components/systems/SearchBox';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

export const metadata: Metadata = {
  title: 'Design System - NextJS',
  description: 'Design Page',
};

const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

export default function Design() {
  const mounted = useMounted();
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDangerDialog, setOpenDangerDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDangerModal, setOpenDangerModal] = useState(false);
  const [inputDebounceValue, setInputDebounceValue] = useState();

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

  const searchBoxData = [
    {
      id: 1,
      name: 'Option 1',
    },
    {
      id: 2,
      name: 'Option 2',
    },
    {
      id: 3,
      name: 'Option 3',
    },
  ];
  const [selectedSearchBox, setSelectedSearchBox] = useState();
  const [querySearchBox, setQuerySearchBox] = useState('');
  const filteredSearchBox =
    querySearchBox === ''
      ? searchBoxData
      : searchBoxData.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(querySearchBox.toLowerCase().replace(/\s+/g, '')),
        );

  const reactSelectData = [
    {
      value: 1,
      label: 'Romance',
    },
    {
      value: 2,
      label: 'Comedy',
    },
    {
      value: 3,
      label: 'History',
    },
  ];
  const [reactSelect, setReactSelect] = useState();

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row: any) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`#`}
              className='rounded text-sm font-medium text-sky-500 hover:text-sky-600 focus:border-sky-500 
            focus:outline-none focus:ring-2 focus:ring-sky-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 300,
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          // console.log(`${values.id} - ${values.name} - ${original.cover} - ${original.artists.id} - ${original.artists.name}`)
          return (
            <div>
              <Link
                href={`#`}
                className='mr-2 rounded bg-sky-600 px-[6px] py-[3px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!px-[6px] !py-[2px]'
                // onClick={() => handleShowDeleteModal(values.id, values.name)}
              >
                Delete
              </Button.danger>
            </div>
          );
        },
      },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row: any) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 300,
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        width: 10,
        disableSortBy: true,
        Cell: ({ row }: { row: any }) => {
          const data = row.original;
          return (
            <div className='relative'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ButtonUi variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </ButtonUi>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.name)}>
                    Copy Name
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [],
  );
  function createUser() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
  }
  const fakerUsers = useMemo(() => faker.helpers.multiple(createUser, { count: 50 }), []);
  const tableInstance = useRef<any>(null);
  const [inputDebounceValues, setInputDebounceValues] = useState('');
  const tableInstances = useRef<any>(null);
  const [filteredLength, setFilteredLength] = useState(0);
  useEffect(() => {
    setFilteredLength(tableInstances?.current?.rows?.length);
  }, [inputDebounceValues]);

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

      <Wrapper
        id='dialog'
        name='Dialog (Radix)'
        noClassName
        noProps
        props={['open', 'setOpen', 'title', 'children', 'isDanger', 'onClose', 'onConfirm', 'showIcon']}
      >
        <Button onClick={() => setOpenDialog(true)}>Open Dialog</Button>
        <br />
        <br />

        <Dialog
          data-testid='dialog'
          title='Confirmation'
          open={openDialog}
          showIcon
          setOpen={setOpenDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => setOpenDialog(false)}
        >
          Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
          consectetur aliquip mollit nisi irure quis Lorem eu non sit.
        </Dialog>

        <Button.danger onClick={() => setOpenDangerDialog(true)}>Open Danger Dialog</Button.danger>

        <Dialog
          data-testid='dialog-danger'
          title='Delete Confirmation'
          open={openDangerDialog}
          showIcon
          isDanger
          setOpen={setOpenDangerDialog}
          onClose={() => setOpenDangerDialog(false)}
          onConfirm={() => setOpenDangerDialog(false)}
        >
          Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.
        </Dialog>
      </Wrapper>

      <Wrapper
        id='modal'
        name='Modal (HeadlessUI)'
        noClassName
        noProps
        props={['open', 'title', 'children', 'isDanger', 'onClose', 'onConfirm', 'showIcon', 'confirmText']}
      >
        <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
        <br />
        <br />

        <Modal
          data-testid='modal'
          title='Confirmation'
          open={openModal}
          showIcon
          onClose={() => setOpenModal(false)}
          onConfirm={() => setOpenModal(false)}
        >
          Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
          consectetur aliquip mollit nisi irure quis Lorem eu non sit.
        </Modal>

        <Button.danger onClick={() => setOpenDangerModal(true)}>Open Danger Modal</Button.danger>

        <Modal
          data-testid='modal-danger'
          title='Delete Confirmation'
          open={openDangerModal}
          showIcon
          isDanger
          onClose={() => setOpenDangerModal(false)}
          onConfirm={() => setOpenDangerModal(false)}
        >
          Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.
        </Modal>
      </Wrapper>

      <Wrapper
        id='searchbox'
        name='SearchBox'
        noClassName
        noProps
        noChildren
        props={['label', 'value', 'placeholder', 'onChange', 'query', 'onChangeQuery', 'afterLeave', 'filtered']}
      >
        <SearchBox
          data-testid='searchbox'
          label='Search Box'
          value={selectedSearchBox}
          placeholder='Search or Select'
          onChange={setSelectedSearchBox}
          onChangeQuery={(e) => setQuerySearchBox(e.target.value)}
          afterLeave={() => setQuerySearchBox('')}
          filtered={filteredSearchBox}
          query={querySearchBox}
        />
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
        <Label htmlFor='reactselect' className='mb-2'>
          Category
        </Label>
        <ReactSelect
          id='reactselect'
          instanceId='reactselect'
          aria-label='React Select'
          // @ts-ignore
          options={reactSelectData}
          isMulti
          noOptionsMessage={() => 'Not Found'}
          value={reactSelect}
          // @ts-ignore
          onChange={setReactSelect}
          placeholder='Search or Select'
          name='reactselect'
          classNames={{
            option: (option) => (option.isSelected ? '!border-red-600' : '!border-grey-300'),
          }}
          classNamePrefix='react-select'
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: `#0ea5e9`,
              primary25: `#0ea5e9`,
              primary50: `#0ea5e9`,
              neutral40: `#EF4444`,
            },
          })}
        />
      </Wrapper>

      <Wrapper
        id='reacttable'
        name='React Table'
        props={['columns', 'data', 'page_size', 'bordered', 'itemPerPage', 'keyword', 'showInfo', 'filteredLength']}
        noProps
        noWrap
      >
        <LabeledInput
          label='Search Data'
          id='caridata'
          name='caridata'
          placeholder='Keyword'
          onChange={(e) => {
            tableInstance?.current?.setGlobalFilter(e.target.value);
          }}
        />
        <ReactTable data-testid='reacttable' columns={column} data={tabledata} ref={tableInstance} page_size={5} />
        <br />
        <InputDebounce
          label='Search'
          id='inputdebounces'
          name='inputdebounces'
          placeholder='Search'
          value={inputDebounceValues}
          onChange={(value) => {
            setInputDebounceValues(value);
            tableInstances?.current?.setGlobalFilter(value);
          }}
        />
        {mounted ? (
          <ReactTable
            columns={columns}
            data={fakerUsers}
            ref={tableInstances}
            page_size={10}
            itemPerPage={[10, 20, 50, 100]}
            keyword={inputDebounceValues}
            showInfo
            filteredLength={filteredLength}
          />
        ) : null}
      </Wrapper>

      <Wrapper id='dropdownmenu' name='DropdownMenu' noChildren noClassName noProps>
        <Menu as='div' className='relative'>
          {({ open }) => (
            <>
              <Menu.Button
                className={twMerge(
                  'flex items-center rounded font-medium text-gray-600 transition-all hover:text-gray-900',
                  'focus:outline-none dark:text-neutral-300 dark:hover:text-neutral-100',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                )}
              >
                Menu
                <ChevronDownIcon
                  className={twMerge('ml-1 h-5 w-4 transition-all duration-200', open ? 'rotate-180' : 'rotate-0')}
                  aria-hidden='true'
                />
              </Menu.Button>
              <Transition
                enter='transition ease-in-out duration-300'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in-out duration-100'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute z-50 mt-2 w-32 origin-top-right rounded-md border bg-white shadow-md focus:outline-none dark:border-neutral-700 dark:bg-neutral-900'>
                  <div className='space-y-1 px-2 py-2'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href='/settings'
                          className={twMerge(
                            'flex w-full rounded px-2 py-1.5 text-sm',
                            active
                              ? 'bg-gray-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                              : 'text-gray-700 dark:text-neutral-300',
                          )}
                        >
                          Setting
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href='/design/ui'
                          className={twMerge(
                            'flex w-full rounded px-2 py-1.5 text-sm',
                            active
                              ? 'bg-gray-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                              : 'text-gray-700 dark:text-neutral-300',
                          )}
                        >
                          UI
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={twMerge(
                            'flex w-full rounded px-2 py-1.5 text-sm',
                            active
                              ? 'bg-gray-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                              : 'text-gray-700 dark:text-neutral-300',
                          )}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
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
