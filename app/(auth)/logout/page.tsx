import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';

import LoadingDots from '@/components/systems/LoadingDots';

import LogoutPage from './logout-page';

export const metadata: Metadata = {
  title: 'Logout - Next.js App Router',
  description: 'Logout Page',
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <LogoutPage session={session} />
      <LoadingDots medium />
    </div>
  );
}
