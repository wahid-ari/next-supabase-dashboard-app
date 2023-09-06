import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export async function GET() {
  const { data: books } = await supabase.from('book_books').select(`id`, { count: 'exact' });
  return NextResponse.json(
    {
      book: books.length,
    },
    { status: 200 },
  );
}
