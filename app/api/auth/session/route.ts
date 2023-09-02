import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/libs/auth';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'You are not logged in' }), { status: 401 });
  }

  return NextResponse.json(
    {
      authenticated: !!session,
      session,
    },
    { status: 200 },
  );
}
