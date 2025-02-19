import { NextResponse } from 'next/server';
import books from '@/data/books.json';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const generate = searchParams.get('generate');
  // Removing genre_array
  for (const quote of books) {
    delete quote.genre_array;
  }
  if (id) {
    const { data } = await supabase
      .from('book_books')
      .select(`*, book_books (*), book_books_books (*)`)
      .eq('id', id)
      .order('id');
    return NextResponse.json(data, { status: 200 });
  } else if (generate) {
    const { error } = await supabase.from('book_books').insert(books);
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 422 });
    }
    return NextResponse.json({ message: 'Success Seeding Book' }, { status: 200 });
  } else {
    const { data } = await supabase.from('book_books').select(`*`).order('id');
    return NextResponse.json(data, { status: 200 });
  }
}
