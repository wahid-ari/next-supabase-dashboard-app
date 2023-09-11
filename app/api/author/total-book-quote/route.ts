import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data } = await supabase
    .from('book_authors')
    .select(`id,name, image, slug, book_books (id), book_quotes (id)`)
    .order('id');
  return NextResponse.json(data, { status: 200 });
}
