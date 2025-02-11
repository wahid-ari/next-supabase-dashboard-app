import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import RegisterPage from './register-page';

export const metadata: Metadata = {
  title: 'Register - Next.js App Router',
  description: 'Register Page',
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return <RegisterPage />;
}
