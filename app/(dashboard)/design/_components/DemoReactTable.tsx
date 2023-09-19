'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { faker } from '@faker-js/faker';
import { MoreHorizontal } from 'lucide-react';

import { tabledata } from '@/utils/table-data';
import { useMounted } from '@/hooks/use-mounted';

import { Button as ButtonUi } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import Button from '@/components/systems/Button';
import InputDebounce from '@/components/systems/InputDebounce';
import LabeledInput from '@/components/systems/LabeledInput';
import ReactTable from '@/components/systems/ReactTable';

export default function DemoReactTable() {
  const mounted = useMounted();

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
    <>
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
    </>
  );
}
