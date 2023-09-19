'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowUpRightIcon, PlusIcon } from 'lucide-react';

import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';
import InputDebounce from '@/components/systems/InputDebounce';
import LinkButton from '@/components/systems/LinkButton';
import ReactTable from '@/components/systems/ReactTable';
import Title from '@/components/systems/Title';

export default function AuthorPage({ data }: { data: any }) {
  const router = useRouter();
  const { updateToast, pushToast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting author',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    }
  }

  function handleShowDeleteModal(id: any, name: any) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row: any) => {
          // console.log(row.cell.row.index)
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
              href={`author/detail/${values.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Born',
        accessor: 'born',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          let countryArray = original.born?.split(',');
          let country = countryArray[countryArray.length - 1];
          return country ? country : '-';
        },
      },
      {
        Header: 'Web',
        accessor: 'web',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          if (original.web) {
            return (
              <a
                href={original?.web}
                className='flex w-16 items-center rounded text-sm font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                target='_blank'
                rel='noreferrer'
              >
                Open
                <ArrowUpRightIcon className='ml-1 h-4 w-4' />
              </a>
            );
          }
          return '-';
        },
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
                href={`author/edit/${values.id}`}
                className='mr-2 rounded bg-sky-600 px-[6px] py-[3px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!px-[6px] !py-[2px]'
                onClick={() => handleShowDeleteModal(values.id, values.name)}
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

  const tableInstance = useRef(null);

  return (
    <>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title className='mb-0'>Author</Title>
        <LinkButton href='/author/add' className='flex items-center gap-2'>
          <PlusIcon className='h-5 w-5' />
          Add New Author
        </LinkButton>
      </div>

      <InputDebounce
        label='Search'
        name='search'
        id='search'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => {
          setInputDebounceValue(value);
          tableInstance?.current?.setGlobalFilter(value);
        }}
      />

      <ReactTable columns={column} data={data} ref={tableInstance} page_size={20} itemPerPage={[10, 20, 50, 100]} />

      <Dialog
        title='Delete Author'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>
    </>
  );
}
