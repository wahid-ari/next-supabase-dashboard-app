'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import LabeledInput from '@/components/systems/LabeledInput';
import TextArea from '@/components/systems/TextArea';

export default function AddAuthorPage() {
  const { updateToast, pushToast, dismissToast } = useToast();
  const [createItem, setCreateItem] = useState({
    name: '',
    link: '',
    image: '',
    born: '',
    web: '',
    bio: '',
  });
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Creating author',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/author`, createItem);
      if (res.status == 200) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        router.refresh();
        router.push('/author');
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.error)) {
        const errors = [...error?.response?.data?.error].reverse();
        // show all error
        dismissToast();
        errors.forEach((item: any) => {
          pushToast({ message: item?.message, isError: true });
        });
        // only show one error
        // errors.map((item: any) => {
        //   updateToast({ toastId, message: item?.message, isError: true });
        // })
      } else {
        updateToast({ toastId, message: error?.response?.data?.error, isError: true });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
      <div>
        <LabeledInput
          label='Author Name'
          type='text'
          name='name'
          value={createItem.name}
          onChange={(e) => setCreateItem({ ...createItem, name: e.target.value })}
          placeholder='Author Name'
        />

        <LabeledInput
          label='GoodReads Profile URL (Optional)'
          type='text'
          name='goodreads'
          value={createItem.link}
          onChange={(e) => setCreateItem({ ...createItem, link: e.target.value })}
          placeholder='https://www.goodreads.com/author/show/153394.Suzanne_Collins'
        />

        <LabeledInput
          label='Image URL (Optional)'
          type='text'
          name='image'
          value={createItem.image}
          onChange={(e) => setCreateItem({ ...createItem, image: e.target.value })}
          placeholder='https://images.gr-assets.com/authors/1630199330p5/153394.jpg'
        />

        <LabeledInput
          label='Born (Optional)'
          type='text'
          name='youtube'
          value={createItem.born}
          onChange={(e) => setCreateItem({ ...createItem, born: e.target.value })}
          placeholder='The United States'
        />
      </div>
      <div>
        <LabeledInput
          label='Web URL (Optional)'
          type='text'
          name='web'
          value={createItem.web}
          onChange={(e) => setCreateItem({ ...createItem, web: e.target.value })}
          placeholder='http://suzannecollins.com'
        />

        <TextArea
          label='Bio (Optional)'
          name='bio'
          value={createItem.bio}
          onChange={(e) => setCreateItem({ ...createItem, bio: e.target.value })}
          placeholder='Author Bio'
          height={6}
        />

        <Button.success type='submit' className='w-full mt-1.5 py-2'>
          Save
        </Button.success>
      </div>
    </form>
  );
}
