import { NextRequest, NextResponse } from 'next/server';

import { getAppHeader, getAppSessionToken, supabase } from '@/libs/supabase';

export async function GET() {
  const { data } = await supabase.from('book_sessions').select(`*, book_users (id, name, username, type)`).order('id');
  return NextResponse.json(data, { status: 200 });
}

// /api/session?id=1
export async function DELETE(request: NextRequest) {
  // Get Request Header Token
  // const { authorization, token } = getAppHeader();
  // if (!authorization) return NextResponse.json({ error: 'Please provide bearer token in headers' }, { status: 401 });
  // Get Request Query
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // Check Session if Token is Valid
  // const session = await getAppSessionToken(token);
  // if (session) {
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
  // } else {
  //   return NextResponse.json({ error: 'Token invalid' }, { status: 401 });
  // }
}
