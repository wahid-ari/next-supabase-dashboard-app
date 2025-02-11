'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useAuthorData } from '@/libs/swr';
import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import LabeledInput from '@/components/systems/LabeledInput';
import Shimmer from '@/components/systems/Shimmer';
import TextArea from '@/components/systems/TextArea';
import Title from '@/components/systems/Title';

export default function EditPage({ id }) {
  const { data, error } = useAuthorData(id);
  const router = useRouter();
  const { updateToast, pushToast, dismissToast } = useToast();
  const [editItem, setEditItem] = useState({
    name: '',
    link: '',
    image: '',
    born: '',
    web: '',
    bio: '',
  });

  useEffect(() => {
    if (data) {
      setEditItem({
        name: data.name,
        link: data.link,
        image: data.image,
        born: data.born,
        web: data.web,
        bio: data.bio,
      });
    }
  }, [data]);

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
      if (Array.isArray(error?.response?.data?.message)) {
        const errors = [...error?.response?.data?.message].reverse();
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
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
    }
  }

  if (error) {
    return <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>;
  }

  return (
    <>
      <div className='mb-6'>{data ? <Title>Edit {data?.name}</Title> : <Title>Edit Author</Title>}</div>
      {data ? (
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

            <Button type='submit' className='mt-1.5 w-full py-2'>
              Update
            </Button>
          </div>
        </form>
      ) : (
        <div className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
          <div>
            {[...Array(4).keys()].map((e, i) => (
              <Shimmer key={i} className='mb-4 p-2'>
                <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </Shimmer>
            ))}
          </div>
          <div>
            <Shimmer className='mb-4 p-2'>
              <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
            <Shimmer className='mb-4 p-2'>
              <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
            <Shimmer className='mb-4 p-2'>
              <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
          </div>
        </div>
      )}
    </>
  );
}
