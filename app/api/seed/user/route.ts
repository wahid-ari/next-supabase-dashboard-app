import { NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';

import { supabase } from '@/libs/supabase';

export const dynamic = 'force-dynamic';

// set Password before seed user
const admins = [
  {
    name: 'Admin',
    username: 'admin',
    password: '',
    type: 'admin',
  },
  {
    name: 'User',
    username: 'user',
    password: '',
    type: 'user',
  },
];

async function hashPassword() {
  const admins_hashed = [];
  // Hashing Password
  for (const item of admins) {
    let password_hashed = await hash(item.password, 8);
    admins_hashed.push({
      ...item,
      password: password_hashed,
    });
  }
  // Compare Password
  // const admin_data_original = [];
  // for (const item of admins_hashed) {
  //   let password_original = await compare('', item.password);
  //   admin_data_original.push({
  //     ...item,
  //     password: password_original,
  //   });
  // }
  return admins_hashed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');
  const generate = searchParams.get('generate');
  const clean = searchParams.get('clean');

  if (id) {
    const { data } = await supabase.from('book_users').select(`id, name, username, type`).eq('id', id).order('id');
    return NextResponse.json(data, { status: 200 });
  } else if (generate) {
    const admins_hashed = await hashPassword();
    const { data, error } = await supabase.from('book_users').insert(admins_hashed).select(`id, name, username, type`);
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 422 });
    }
    return NextResponse.json(data, { status: 200 });
  } else if (clean) {
    // select current users id
    const { data: selectUsers } = await supabase.from('book_users').select('id').order('id');
    // convert to array of id [1, 2, 3]
    let user_ids = selectUsers.map((item) => item.id);
    // delete current users
    const { error: errorDelete } = await supabase.from('countries').delete().in('id', user_ids);
    if (errorDelete) {
      return NextResponse.json({ message: errorDelete.message }, { status: 422 });
    }
    // seed users
    const admins_hashed = await hashPassword();
    const { data, error } = await supabase.from('book_users').insert(admins_hashed).select(`id, name, username, type`);
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 422 });
    }
    return NextResponse.json(data, { status: 200 });
  } else {
    const { data } = await supabase.from('book_users').select(`id, name, username, type`).order('id');
    return NextResponse.json(data, { status: 200 });
  }
}
