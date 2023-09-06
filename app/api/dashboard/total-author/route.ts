import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export async function GET() {
  const { data: authors } = await supabase.from('book_authors').select(`id`, { count: 'exact' });
  return NextResponse.json(
    {
      author: authors.length,
    },
    { status: 200 },
  );
}
