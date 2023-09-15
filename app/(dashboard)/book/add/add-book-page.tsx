'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Select from 'react-select';

import useToast from '@/hooks/useToast';

import Button from '@/components/systems/Button';
import Label from '@/components/systems/Label';
import LabeledInput from '@/components/systems/LabeledInput';
import SearchBox from '@/components/systems/SearchBox';
import TextArea from '@/components/systems/TextArea';

export default function AddBookPage({ authors, genres }) {
  const router = useRouter();
  const { updateToast, pushToast } = useToast();
  const [createItem, setCreateItem] = useState({
    author_id: null,
    title: '',
    isbn: '',
    language: '',
    pages: '',
    published: '',
    link: '',
    image: '',
    description: '',
  });
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [queryAuthor, setQueryAuthor] = useState('');
  const filteredAuthor =
    queryAuthor === ''
      ? authors
      : authors.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryAuthor.toLowerCase().replace(/\s+/g, '')),
        );
  const [selectedGenres, setSelectedGenres] = useState(null);
  // convert genres data from db (id, name) to match with react-select requirement (value, label)
  const listOfGenres = [];
  genres?.forEach((item: any) => {
    listOfGenres.push({
      value: item.id,
      label: item.name,
    });
  });

  // if user selecting author, set author id
  useEffect(() => {
    if (selectedAuthor) setCreateItem((createItem) => ({ ...createItem, author_id: selectedAuthor.id }));
  }, [selectedAuthor]);

  // if user selecting tags, set tags
  useEffect(() => {
    // @ts-ignore
    setCreateItem({ ...createItem, genre: selectedGenres });
  }, [selectedGenres]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Creating book',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`, createItem);
      if (res.status == 200) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        router.refresh();
        router.push('/book');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    }
  }

  return (
    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
      <div>
        <LabeledInput
          label='Title'
          type='text'
          name='title'
          value={createItem.title}
          onChange={(e) => setCreateItem({ ...createItem, title: e.target.value })}
          placeholder='Book Title'
        />

        <Label htmlFor='genre' className='my-2'>
          Genre
        </Label>
        <Select
          options={listOfGenres}
          isMulti
          noOptionsMessage={() => 'Not Found'}
          value={selectedGenres}
          // @ts-ignore
          onChange={setSelectedGenres}
          placeholder='Search and Select Genre'
          name='genre'
          className='mb-4 rounded'
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

        <SearchBox
          label='Author'
          value={selectedAuthor}
          placeholder='Search and Select Author'
          onChange={setSelectedAuthor}
          onChangeQuery={(e) => setQueryAuthor(e.target.value)}
          afterLeave={() => setQueryAuthor('')}
          filtered={filteredAuthor}
          query={queryAuthor}
        />

        <LabeledInput
          wrapperClassName='mt-0.5'
          label='Image URL (Optional)'
          type='text'
          name='image'
          value={createItem.image}
          onChange={(e) => setCreateItem({ ...createItem, image: e.target.value })}
          placeholder='https://images.gr-assets.com/books/1630199330p5/153394.jpg'
        />

        <TextArea
          label='Description (Optional)'
          name='description'
          height={4}
          value={createItem.description}
          onChange={(e) => setCreateItem({ ...createItem, description: e.target.value })}
          placeholder='Book Description'
        />
      </div>
      <div>
        <LabeledInput
          label='ISBN (Optional)'
          type='number'
          min={0}
          name='isbn'
          value={createItem.isbn}
          onChange={(e) => setCreateItem({ ...createItem, isbn: e.target.value })}
          placeholder='9780684830490'
          onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
        />

        <LabeledInput
          label='Language (Optional)'
          type='text'
          name='language'
          value={createItem.language}
          onChange={(e) => setCreateItem({ ...createItem, language: e.target.value })}
          placeholder='English'
        />

        <LabeledInput
          label='Total Page (Optional)'
          type='number'
          min={0}
          name='pages'
          value={createItem.pages}
          onChange={(e) => setCreateItem({ ...createItem, pages: e.target.value })}
          placeholder='100'
          onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
        />

        <LabeledInput
          label='Published Date (Optional)'
          type='date'
          name='published'
          value={createItem.published}
          onChange={(e) => setCreateItem({ ...createItem, published: e.target.value })}
          placeholder='2023-05-05'
        />

        <LabeledInput
          label='GoodReads URL (Optional)'
          type='text'
          name='goodreads'
          value={createItem.link}
          onChange={(e) => setCreateItem({ ...createItem, link: e.target.value })}
          placeholder='https://www.goodreads.com/book/show/2767052-the-hunger-games'
        />

        <Button.success type='submit' className='mt-2 py-2 w-full'>
          Save
        </Button.success>
      </div>
    </form>
  );
}
