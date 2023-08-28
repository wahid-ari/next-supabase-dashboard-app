import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getAppSessionToken, supabase } from '@/libs/supabase';

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
export async function GET(request: NextRequest, { params }) {
  const { searchParams } = new URL(request.url);
  // /api/session/1?id=2
  const idQuery = searchParams.get('id');
  // /api/session/1
  const idParam = params.id; // '1'
  // const { data } = await supabase.from('book_sessions').select(`*, book_users (*)`).order('id');
  return NextResponse.json({ idQuery, idParam }, { status: 200 });
}
