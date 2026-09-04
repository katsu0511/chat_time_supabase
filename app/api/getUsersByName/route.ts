import { getUsers } from '@/lib/api/getter';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  try {
    const users = await getUsers(name);
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
