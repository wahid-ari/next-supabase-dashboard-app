import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

// app api
export async function getAppSessionToken(authorization: string, token: string) {
  if (!authorization) return NextResponse.json({ error: 'Please provide bearer token in headers' }, { status: 401 });
  const { data } = await supabase.from('book_sessions').select('*').eq('token', token).single();
  if (data) return data;
  else NextResponse.json({ error: 'Token invalid' }, { status: 401 });
}

// pages api
export async function getSessionToken(res: NextApiResponse, header: string, token: string) {
  if (!header) return res.status(401).json({ error: 'Please provide bearer token in headers' });
  const { data } = await supabase.from('book_sessions').select('*').eq('token', token).single();
  if (data) return data;
  else res.status(401).json({ error: 'Token invalid' });
}

export async function writeLogs(user_id: number, action: string, table: string = '', data_id: string | string[] = '') {
  const { error } = await supabase.from('book_logs').insert([
    {
      user_id: user_id,
      action: action,
      table: table,
      description: `user ${user_id} ${action} ${table} ${data_id}`,
    },
  ]);
  return error;
}
