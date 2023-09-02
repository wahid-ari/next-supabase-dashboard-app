import { NextRequest, NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { supabase } from '@/libs/supabase';

// async function pass() {
//   let hashed = await hash('password', 8);
// save hashed to db
//   console.log(hashed)
// compare hashed from db and password from a form that submitted
//   let isMatch = await compare(form.password, hashed);
//   console.log(isMatch)
// }
// pass()

// const token = jwt.sign(
//   {
//     username: data.username,
//     password: data.name,
//   },
//   process.env.NEXTAUTH_SECRET
// );
// const user = jwt.verify(token, process.env.NEXTAUTH_SECRET);

export async function POST(request: NextRequest) {
  // Get Request Body, Extract the body of the request
  const { username, password } = await request.json();
  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 422 });
  } else if (!password) {
    return NextResponse.json({ error: 'Password required' }, { status: 422 });
  } else {
    const { data, error } = await supabase
      .from('book_users')
      .select(`*`)
      .eq('username', username.toLowerCase())
      .limit(1)
      .single();
    if (error) {
      return NextResponse.json({ error: 'User not found' }, { status: 422 });
    }
    const isMatch = await compare(password, data?.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Password mismatch' }, { status: 422 });
    }
    delete data.password;
    delete data.created_at;
    const token = jwt.sign(
      {
        id: data.id,
        username: data.username,
        name: data.name,
        type: data.type,
      },
      process.env.NEXTAUTH_SECRET,
    );
    const { error: errorSession } = await supabase.from('book_sessions').insert({ user_id: data.id, token: token });
    console.error(errorSession);
    // const decode = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    // console.log(decode)
    return NextResponse.json({ ...data, token }, { status: 200 });
  }
}
