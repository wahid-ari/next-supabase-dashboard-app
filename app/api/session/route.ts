import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getAppSessionToken, supabase } from '@/libs/supabase';

export async function GET() {
  const { data } = await supabase.from('book_sessions').select(`*, book_users (*)`).order('id');
  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // const headersList = headers();
  // const authorization = headersList.get('authorization');
  // const token = authorization?.split(' ')[1] || '';
  // const sessionDelete = await getAppSessionToken(authorization, token);
  // if (sessionDelete) {
  if (!id) {
    const { data } = await supabase.from('book_sessions').select(`*`).order('id');
    for (const item of data) {
      const { error } = await supabase.from('book_sessions').delete().eq('id', item.id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }
    }
    return NextResponse.json({ message: 'Success delete all session' }, { status: 200 });
  } else {
    const { error } = await supabase.from('book_sessions').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    return NextResponse.json({ message: 'Success delete session' }, { status: 200 });
  }
  // }
}
