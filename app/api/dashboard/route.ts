import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data: authors } = await supabase.from('book_authors').select(`id`, { count: 'exact' });
  const { data: books } = await supabase.from('book_books').select(`id`, { count: 'exact' });
  const { data: genres } = await supabase.from('book_genres').select(`id`, { count: 'exact' });
  return NextResponse.json(
    {
      author: authors.length,
      book: books.length,
      genre: genres.length,
    },
    { status: 200 },
  );
}
