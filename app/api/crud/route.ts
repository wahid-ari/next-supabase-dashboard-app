import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Success GET' }, { status: 200 });
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
