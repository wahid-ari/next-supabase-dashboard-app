'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import LoadingDots from '@/components/systems/LoadingDots';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  if (status === 'loading') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <LoadingDots medium />
      </div>
    );
  }

  return <>{children}</>;
}
