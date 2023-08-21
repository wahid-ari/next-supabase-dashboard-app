import { NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export async function GET() {
  const { data } = await supabase.from('book_logs').select(`*, book_users (username, name, type)`).order('id');
  return NextResponse.json(data, { status: 200 });
}
