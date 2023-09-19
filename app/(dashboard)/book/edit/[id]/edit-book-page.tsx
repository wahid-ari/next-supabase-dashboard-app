'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Select from 'react-select';

import useToast from '@/hooks/use-hot-toast';

import Button from '@/components/systems/Button';
import Label from '@/components/systems/Label';
import LabeledInput from '@/components/systems/LabeledInput';
import SearchBox from '@/components/systems/SearchBox';
import TextArea from '@/components/systems/TextArea';

export default function EditBookPage({ id, book, author, genre }) {
  const router = useRouter();
  const { updateToast, pushToast } = useToast();
  const [editItem, setEditItem] = useState({
    author_id: book.book_authors?.id,
    title: book.title,
    isbn: book.isbn,
    language: book.language,
    pages: book.pages,
    published: book.published,
    link: book.link,
    image: book.image,
    description: book.description,
  });
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [queryAuthor, setQueryAuthor] = useState('');
  const filteredAuthor =
    queryAuthor === ''
      ? author
      : author.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryAuthor.toLowerCase().replace(/\s+/g, '')),
        );
  const [selectedGenres, setSelectedGenres] = useState(null);
  // convert genres data from db (id, name) to match with react-select requirement (value, label)
  const listOfGenres = [];
  genre?.forEach((item: any) => {
    listOfGenres.push({
      value: item.id,
      label: item.name,
    });
  });

  // set book author from db
  useEffect(() => {
    setSelectedAuthor({ id: book.book_authors?.id, name: book.book_authors?.name });
  }, []);

  // if user selecting author, set author id
  useEffect(() => {
    if (selectedAuthor) setEditItem((editItem) => ({ ...editItem, author_id: selectedAuthor.id }));
  }, [selectedAuthor]);

  // set book genre from db
  useEffect(() => {
    let bookCurrentGenres = [];
    for (const bookGenre of book?.genre_array) {
      for (const item of genre) {
        if (item.id == bookGenre.id) {
          bookCurrentGenres.push({
            value: item.id,
            label: item.name,
          });
        }
      }
    }
    setSelectedGenres(bookCurrentGenres);
  }, []);

  // if user selecting genres, set genres
  useEffect(() => {
    // use if here to fix data missing when reopening edit page
    if (selectedGenres) {
      // @ts-ignore
      setEditItem({ ...editItem, genre: selectedGenres });
    }
  }, [selectedGenres]);

  async function handleEdit(e) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Updating book',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`, { id: id, ...editItem });
      if (res.status == 201) {
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
    <form onSubmit={handleEdit} className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
      <div>
        <LabeledInput
          label='Title'
          type='text'
          name='title'
          value={editItem.title}
          onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
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
          value={editItem.image}
          onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
          placeholder='https://images.gr-assets.com/books/1630199330p5/153394.jpg'
        />

        <TextArea
          label='Description (Optional)'
          name='description'
          height={4}
          value={editItem.description}
          onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
          placeholder='Book Description'
        />
      </div>
      <div>
        <LabeledInput
          label='ISBN (Optional)'
          type='number'
          min={0}
          name='isbn'
          value={editItem.isbn}
          onChange={(e) => setEditItem({ ...editItem, isbn: e.target.value })}
          placeholder='9780684830490'
          onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
        />

        <LabeledInput
          label='Language (Optional)'
          type='text'
          name='language'
          value={editItem.language}
          onChange={(e) => setEditItem({ ...editItem, language: e.target.value })}
          placeholder='English'
        />

        <LabeledInput
          label='Total Page (Optional)'
          type='number'
          min={0}
          name='pages'
          value={editItem.pages}
          onChange={(e) => setEditItem({ ...editItem, pages: e.target.value })}
          placeholder='100'
          onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
        />

        <LabeledInput
          label='Published Date (Optional)'
          type='date'
          name='published'
          value={editItem.published}
          onChange={(e) => setEditItem({ ...editItem, published: e.target.value })}
          placeholder='2023-05-05'
        />

        <LabeledInput
          label='GoodReads URL (Optional)'
          type='text'
          name='goodreads'
          value={editItem.link}
          onChange={(e) => setEditItem({ ...editItem, link: e.target.value })}
          placeholder='https://www.goodreads.com/book/show/2767052-the-hunger-games'
        />

        <Button type='submit' className='mt-2 py-2 w-full'>
          Update
        </Button>
      </div>
    </form>
  );
}
