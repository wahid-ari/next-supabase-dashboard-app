import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // TODO Docs https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors
  // TODO Docs https://github.com/vercel/next.js/discussions/47933
  return NextResponse.json(
    { message: 'Success GET' },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      },
    },
  );
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Success POST' }, { status: 200 });
}

export async function PUT(request: Request) {
  return NextResponse.json({ message: 'Success PUT' }, { status: 201 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: 'Success DELETE' }, { status: 200 });
}
