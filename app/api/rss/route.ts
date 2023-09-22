import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data: books } = await supabase.from('book_books').select(`title, description, slug, created_at`).order('id');
  // const { data: authors } = await supabase.from('book_authors').select(`name, bio, slug, created_at`).order('id');
  return NextResponse.json({ books }, { status: 200 });
}
