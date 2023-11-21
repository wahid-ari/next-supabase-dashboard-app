import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '@/libs/supabase';

export async function POST(request: NextRequest) {
  // Get Request Body, Extract the body of the request
  const { user_id, token } = await request.json();
  if (!user_id) {
    return NextResponse.json({ message: 'User id required' }, { status: 422 });
  } else if (!token) {
    return NextResponse.json({ message: 'Token required' }, { status: 422 });
  } else {
    const { error } = await supabase.from('book_sessions').delete().eq('token', token);
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 422 });
    }
    return NextResponse.json({ message: 'Success delete session' }, { status: 200 });
  }
}
