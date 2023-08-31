'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';

import useToast from '@/hooks/useToast';

import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';
import InputDebounce from '@/components/systems/InputDebounce';
import LabeledInput from '@/components/systems/LabeledInput';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

export default function GenrePage({ data }: { data: any }) {
  const router = useRouter();
  const { updateToast, pushToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [name, setName] = useState('');
  const [editItem, setEditItem] = useState({ id: null, name: '' });
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  const filteredData =
    inputDebounceValue === ''
      ? data
      : data.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(inputDebounceValue.toLowerCase().replace(/\s+/g, '')),
        );

  async function handleCreate() {
    const toastId = pushToast({
      message: `Creating ${name}`,
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, { name: name });
      if (res.status == 200) {
        setOpenCreateDialog(false);
        setName('');
        updateToast({ toastId, message: res?.data?.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      router.refresh();
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Updating genre',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre`, editItem);
      if (res.status == 201) {
        setOpenEditDialog(false);
        setEditItem({ id: null, name: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      router.refresh();
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: `Deleting ${deleteItem.name}`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/genre?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      router.refresh();
    }
  }

  function handleShowEditModal(id: any, name: any) {
    setEditItem({ id: id, name: name });
    setOpenEditDialog(true);
  }

  function handleShowDeleteModal(id: any, name: any) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

  return (
    <>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title className='mb-0'>Genre</Title>
        <Button.success onClick={() => setOpenCreateDialog(true)} className='flex items-center gap-2'>
          <PlusIcon className='h-5 w-5' />
          Add New Genre
        </Button.success>
      </div>

      <InputDebounce
        label='Search'
        id='inputdebounce'
        name='inputdebounce'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => setInputDebounceValue(value)}
      />

      <Dialog
        title='Create Genre'
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={handleCreate}
        confirmText='Save'
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Genre Name'
          />
        </div>
      </Dialog>

      <Dialog
        title='Edit Genre'
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={handleEdit}
        confirmText='Update'
        isEdit
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
        </div>
      </Dialog>

      <Dialog
        title='Delete Genre'
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

      <TableSimple
        head={
          <>
            <TableSimple.td shrink>No</TableSimple.td>
            <TableSimple.td>Name</TableSimple.td>
            <TableSimple.td shrink>Action</TableSimple.td>
          </>
        }
      >
        {filteredData.map((item: any, index: number) => {
          return (
            <TableSimple.tr key={index}>
              <TableSimple.td shrink>{index + 1}</TableSimple.td>
              <TableSimple.td>
                <Link
                  href={`/genre/${item.id}`}
                  className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  {item.name}
                </Link>
              </TableSimple.td>
              <TableSimple.td>
                <Button className='mr-2 !px-[6px] !py-[2px]' onClick={() => handleShowEditModal(item.id, item.name)}>
                  Edit
                </Button>
                <Button.danger
                  className='!px-[6px] !py-[2px]'
                  onClick={() => handleShowDeleteModal(item.id, item.name)}
                >
                  Delete
                </Button.danger>
              </TableSimple.td>
            </TableSimple.tr>
          );
        })}
      </TableSimple>
    </>
  );
}
