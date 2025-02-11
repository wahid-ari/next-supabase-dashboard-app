'use client';

import { useState } from 'react';
import axios from 'axios';
import { TrashIcon } from 'lucide-react';
import { useDebounce } from 'use-debounce';

import { cn } from '@/libs/utils';
import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';
import Input from '@/components/systems/Input';
import InputDebounce from '@/components/systems/InputDebounce';
import Label from '@/components/systems/Label';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

export default function SessionPage({ data }) {
  const [search, setSearch] = useState('');
  const [searchDebounce] = useDebounce(search, 300);
  const { updateToast, pushToast } = useToast();
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);

  const filteredData =
    searchDebounce === ''
      ? data
      : data.filter((item: any) =>
          item.book_users.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(searchDebounce.toLowerCase().replace(/\s+/g, '')),
        );

  async function handleDeleteAll() {
    const toastId = pushToast({
      message: `Deleting All Session`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session`);
      if (res.status == 200) {
        setOpenDeleteAllDialog(false);
        updateToast({ toastId, message: res?.data?.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      const { detail } = error?.response?.data;
      if (detail) {
        updateToast({ toastId, message: detail, isError: true });
      } else {
        updateToast({
          toastId,
          message: error?.response?.data?.message,
          isError: true,
        });
      }
    }
  }

  function getTime(date: string) {
    let time = new Date(date);
    return time.toLocaleTimeString('en-US');
  }

  return (
    <>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title className='mb-0'>Session</Title>
        {/* <Button.danger onClick={() => setOpenDeleteAllDialog(true)} className='flex items-center gap-2'>
          <TrashIcon className='h-4 w-4' />
          Delete All
        </Button.danger> */}
      </div>

      <Dialog
        title='Delete All Session'
        open={openDeleteAllDialog}
        isDanger
        setOpen={setOpenDeleteAllDialog}
        onClose={() => setOpenDeleteAllDialog(false)}
        onConfirm={handleDeleteAll}
      >
        <div className='mt-5 text-center sm:text-left'>Are you sure want to delete All Session ?</div>
      </Dialog>

      <Label>Search</Label>
      <Input name='search' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />

      <TableSimple
        head={
          <>
            <TableSimple.td shrink>No</TableSimple.td>
            <TableSimple.td shrink>ID</TableSimple.td>
            <TableSimple.td className={cn(filteredData.length < 1 && 'w-32 text-center')}>Name</TableSimple.td>
            <TableSimple.td>Token</TableSimple.td>
            <TableSimple.td shrink>Date</TableSimple.td>
            <TableSimple.td shrink>Time</TableSimple.td>
          </>
        }
        caption={filteredData.length > 0 ? '' : 'No Data'}
      >
        {filteredData.map((item: any, index: number) => {
          return (
            <TableSimple.tr key={index}>
              <TableSimple.td shrink>{index + 1}</TableSimple.td>
              <TableSimple.td>{item.user_id}</TableSimple.td>
              <TableSimple.td>{item.book_users.name}</TableSimple.td>
              <TableSimple.td>{item.token.split('.')[2]}</TableSimple.td>
              <TableSimple.td>{item.created_at.split('T')[0]}</TableSimple.td>
              <TableSimple.td>{getTime(item.created_at)}</TableSimple.td>
            </TableSimple.tr>
          );
        })}
      </TableSimple>
    </>
  );
}
