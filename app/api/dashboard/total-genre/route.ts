import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export async function GET() {
  const { data: genres } = await supabase.from('book_genres').select(`id`, { count: 'exact' });
  return NextResponse.json(
    {
      genre: genres.length,
    },
    { status: 200 },
  );
}
