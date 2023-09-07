import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data: books } = await supabase.from('book_books').select(`slug`).order('id');
  const { data: authors } = await supabase.from('book_authors').select(`slug`).order('id');
  const { data: genres } = await supabase.from('book_genres').select(`slug`).order('id');
  return NextResponse.json({ books, authors, genres }, { status: 200 });
}
