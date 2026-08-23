import { getMessages } from '@/lib/getter';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const friendId = searchParams.get('friendId');
  if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  if (!friendId) return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
  const messages = await getMessages(userId, friendId);
  return NextResponse.json(messages);
}
