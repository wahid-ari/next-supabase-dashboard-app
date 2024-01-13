'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as HoverCard from '@radix-ui/react-hover-card';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';
import InputDebounce from '@/components/systems/InputDebounce';
import LinkButton from '@/components/systems/LinkButton';
import ReactTable from '@/components/systems/ReactTable';
import Title from '@/components/systems/Title';

export default function BookPage({ data }: { data: any }) {
  const router = useRouter();
  const { updateToast, pushToast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting book',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      const { detail } = error?.response?.data;
      if (detail) {
        updateToast({ toastId, message: detail, isError: true });
      } else {
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
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
        Header: 'Title',
        accessor: 'title',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          let length = values.title.length;
          let text = length > 30 ? values.title?.slice(0, 30) + ' ...' : values.title;
          return (
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Link
                  href={`book/detail/${values.id}`}
                  className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  {text}
                </Link>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  side='top'
                  className={cn(
                    'z-50 max-h-40 max-w-sm overflow-auto rounded-md border text-sm shadow-md',
                    'bg-white p-2.5 font-medium leading-5 text-neutral-700',
                    'scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:scrollbar-thumb-neutral-800',
                  )}
                >
                  {values.title}
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          );
        },
      },
      {
        Header: 'Author',
        accessor: 'book_authors.name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          if (!original?.book_authors?.name) {
            return '-';
          } else {
            return (
              <Link
                href={`/author/detail/${original?.book_authors?.id}`}
                className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              >
                {original?.book_authors?.name || '-'}
              </Link>
            );
          }
        },
      },
      {
        Header: 'Year',
        accessor: 'published',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          let year = values.published?.split('-')[0];
          return year || '-';
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
                href={`book/edit/${values.id}`}
                className='mr-2 rounded bg-sky-600 px-[6px] py-[3px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!px-[6px] !py-[2px]'
                onClick={() => handleShowDeleteModal(values.id, values.title)}
              >
                Delete
              </Button.danger>
              {/* <button onClick={() => alert(`${row.cell.row.values.id} - ${row.cell.row.values.name}`)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
              <button onClick={() => showDeleteModal(row.cell.row.values.id, row.cell.row.values.name)}
                className="text-red-500 hover:text-red-700 text-sm font-medium">
                Delete
              </button> */}
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
        <Title className='mb-0'>Book</Title>
        <LinkButton href='/book/add' className='flex items-center gap-2'>
          <PlusIcon className='h-5 w-5' />
          Add New Book
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
        title='Delete Book'
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
