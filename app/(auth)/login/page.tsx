import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';

import LoginPage from './login-page';

export const metadata: Metadata = {
  title: 'Login - Next.js App Router',
  description: 'Login Page',
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return <LoginPage />;
}
