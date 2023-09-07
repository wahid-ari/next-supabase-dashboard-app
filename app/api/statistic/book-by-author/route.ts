import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { data: books_authors } = await supabase.from('book_authors').select(`*, book_books (*)`).order('id');
  // Make an array of object structure
  let items = [];
  for (const author of books_authors) {
    items.push({
      id: author.id,
      label: author.name,
      total: author.book_books.length,
    });
  }
  let sortedData = items.sort((a: any, b: any) => b.total - a.total).slice(0, 10);
  return NextResponse.json(sortedData, { status: 200 });
}
