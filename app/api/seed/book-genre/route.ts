import { NextResponse } from 'next/server';
import books_genres from '@/data/books_genres.json';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const generate = searchParams.get('generate');
  if (id) {
    const { data } = await supabase
      .from('book_books_genres')
      .select(`*, book_quotes (*), book_quotes_books_genres (*)`)
      .eq('id', id)
      .order('id');
    return NextResponse.json(data, { status: 200 });
  } else if (generate) {
    const { error } = await supabase.from('book_books_genres').insert(books_genres);
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 422 });
    }
    return NextResponse.json({ message: 'Success Seeding Book Genre' }, { status: 200 });
  } else {
    const { data } = await supabase.from('book_books_genres').select(`*`).order('id');
    return NextResponse.json(data, { status: 200 });
  }
}
