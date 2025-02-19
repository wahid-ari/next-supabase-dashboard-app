import { NextResponse } from 'next/server';
import authors from '@/data/authors.json';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const generate = searchParams.get('generate');
  if (id) {
    const { data } = await supabase
      .from('book_authors')
      .select(`*, book_books (*), book_quotes_authors (*)`)
      .eq('id', id)
      .order('id');
    return NextResponse.json(data, { status: 200 });
  } else if (generate) {
    const { error } = await supabase.from('book_authors').insert(authors);
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 422 });
    }
    return NextResponse.json({ message: 'Success Seeding Author' }, { status: 200 });
  } else {
    const { data } = await supabase.from('book_authors').select(`*`).order('id');
    return NextResponse.json(data, { status: 200 });
  }
}
