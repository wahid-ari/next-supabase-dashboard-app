import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
export async function GET(request: NextRequest, { params }) {
  const { searchParams } = new URL(request.url);
  // /api/session/1
  const idParam = params.id; // '1'
  // /api/session/1?id=2
  const idQuery = searchParams.get('id');
  return NextResponse.json({ idParam, idQuery }, { status: 200 });
}
