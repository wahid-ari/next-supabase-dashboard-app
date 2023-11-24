import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

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
  // console.log(items)
  // [
  //   { id: 1, label: 'Art', slug: 'art', total: 0 },
  //   { id: 2, label: 'Biography', slug: 'biography', total: 0 }
  // ]
  // Count total book that have same genre
  let result = [];
  for (const item of items) {
    let filtered = books_genres.filter((i) => i.genre_id == item.id);
    result.push({
      ...item,
      total: filtered.length,
    });
  }
  // console.log(result);
  // [
  //   { id: 1, label: 'Art', slug: 'art', total: 1 },
  //   { id: 2, label: 'Biography', slug: 'biography', total: 9 }
  // ]
  result.sort((a: any, b: any) => b.total - a.total);
  return NextResponse.json(result, { status: 200 });
}
