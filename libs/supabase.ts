import { NextApiResponse } from 'next';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '', {
  auth: { persistSession: false },
});

export function getAppHeader() {
  const headersList = headers();
  const authorization = headersList.get('authorization');
  const token = authorization?.split(' ')[1] || '';
  return { authorization, token };
}

// app api
export async function getAppSessionToken(token: string) {
  const { data } = await supabase.from('book_sessions').select('*').eq('token', token).single();
  if (data) return data;
  else return null;
}

// pages api
export async function getSessionToken(res: NextApiResponse, header: string, token: string) {
  if (!header) return res.status(401).json({ message: 'Please provide bearer token in headers' });
  const { data } = await supabase.from('book_sessions').select('*').eq('token', token).single();
  if (data) return data;
  else res.status(401).json({ message: 'Token invalid' });
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
