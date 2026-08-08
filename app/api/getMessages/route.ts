import { getMessages } from '@/lib/getter';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get('id');
  const friendIdParam = searchParams.get('friendId');
  if (!idParam) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  if (!friendIdParam) return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
  const id = Number(idParam);
  if (isNaN(id)) return NextResponse.json({ error: 'ID must be a number' }, { status: 400 });
  const friendId = Number(friendIdParam);
  if (isNaN(friendId)) return NextResponse.json({ error: 'Friend ID must be a number' }, { status: 400 });
  const messages = await getMessages(id, friendId);
  return NextResponse.json(messages);
}
