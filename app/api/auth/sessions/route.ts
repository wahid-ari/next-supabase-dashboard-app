import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return new NextResponse(JSON.stringify({ authenticated: !!session, message: 'You are not logged in' }), {
      status: 401,
    });
  }

  return NextResponse.json(
    {
      authenticated: session == null ? false : true,
      session,
    },
    { status: 200 },
  );
}
