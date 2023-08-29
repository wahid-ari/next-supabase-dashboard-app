import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

// /api/session?q='movie title'
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  if (!query) {
    return NextResponse.json({ message: 'Query Required' }, { status: 200 });
  }
  // https://supabase.com/docs/guides/database/full-text-search#search-multiple-columns
  // create function in supabase > sql editor > new query
  // create function title_isbn(book_books) returns text as $$
  //   select $1.title || ' ' || $1.isbn;
  // $$ language sql immutable;
  const { data: books } = await supabase.from('book_books').select(`*`).textSearch('title_isbn', `'${query}'`);
  const { data: authors } = await supabase.from('book_authors').select(`*`).textSearch('name', `'${query}'`);
  return NextResponse.json({ books, authors }, { status: 200 });
}
