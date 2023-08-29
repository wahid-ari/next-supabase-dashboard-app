import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

// /api/genre/total-book
export async function GET() {
  const { data: books_genres } = await supabase.from('book_books_genres').select(`*`).order('id');
  const { data: genres } = await supabase.from('book_genres').select(`*`).order('id');
  // Make an array of object structure
  let items = [];
  for (const genre of genres) {
    items.push({
      id: genre.id,
      label: genre.name,
      slug: genre.slug,
      total: 0,
    });
  }
  // Count total book that have same genre
  let result = [];
  for (const item of items) {
    for (const book_genre of books_genres) {
      if (book_genre.genre_id == item.id) {
        let filtered = items.filter((i) => i.id == book_genre.genre_id)[0];
        filtered.total += 1;
        result.push(filtered);
      }
    }
  }
  // Remove duplicate values from an array of objects in javascript
  // https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
  let data = result.reduce((unique, o) => {
    if (!unique.some((obj: any) => obj.id === o.id)) {
      unique.push(o);
    }
    return unique;
  }, []);
  data.sort((a: any, b: any) => b.total - a.total);
  return NextResponse.json(data, { status: 200 });
}
