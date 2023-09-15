'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import useToast from '@/hooks/useToast';

import Button from '@/components/systems/Button';
import LabeledInput from '@/components/systems/LabeledInput';
import TextArea from '@/components/systems/TextArea';

export default function EditAuthorPage({ data }) {
  const { updateToast, pushToast } = useToast();
  const [editItem, setEditItem] = useState({
    name: data.name,
    link: data.link,
    image: data.image,
    born: data.born,
    web: data.web,
    bio: data.bio,
  });
  const router = useRouter();

  async function handleEdit(e: any) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Updating author',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`, { id: data.id, ...editItem });
      if (res.status == 201) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        router.refresh();
        router.push('/author');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    }
  }

  return (
    <form className='grid grid-cols-1 gap-x-8 md:grid-cols-2' onSubmit={handleEdit}>
      <div>
        <LabeledInput
          label='Author Name'
          type='text'
          name='name'
          value={editItem.name}
          onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          placeholder='Author Name'
        />

        <LabeledInput
          label='GoodReads Profile URL (Optional)'
          type='text'
          name='goodreads'
          value={editItem.link}
          onChange={(e) => setEditItem({ ...editItem, link: e.target.value })}
          placeholder='https://www.goodreads.com/author/show/153394.Suzanne_Collins'
        />

        <LabeledInput
          label='Image URL (Optional)'
          type='text'
          name='image'
          value={editItem.image}
          onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
          placeholder='https://images.gr-assets.com/authors/1630199330p5/153394.jpg'
        />

        <LabeledInput
          label='Born (Optional)'
          type='text'
          name='youtube'
          value={editItem.born}
          onChange={(e) => setEditItem({ ...editItem, born: e.target.value })}
          placeholder='The United States'
        />
      </div>
      <div>
        <LabeledInput
          label='Web URL (Optional)'
          type='text'
          name='web'
          value={editItem.web}
          onChange={(e) => setEditItem({ ...editItem, web: e.target.value })}
          placeholder='http://suzannecollins.com'
        />

        <TextArea
          label='Bio (Optional)'
          name='bio'
          value={editItem.bio}
          onChange={(e) => setEditItem({ ...editItem, bio: e.target.value })}
          placeholder='Author Bio'
          height={6}
        />

        <Button type='submit' className='w-full mt-1.5 py-2'>
          Update
        </Button>
      </div>
    </form>
  );
}
