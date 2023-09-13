'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signOut } from 'next-auth/react';

export default function LogoutPage({ session }: { session: any }) {
  const router = useRouter();

  useEffect(() => {
    async function postLogout() {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/logout`, {
          user_id: session?.id,
          token: session?.token,
        });
        if (res.status == 200) {
          signOut({ redirect: true, callbackUrl: '/' });
        }
      } catch (error) {
        console.error(error);
        router.push('/');
      }
    }

    postLogout();
  }, [router, session?.id, session?.token]);

  return '';
}
