import { sendMessage } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { senderId, receiverId, content } = await req.json();
  if (!senderId) return NextResponse.json({ error: 'Sender ID is required' }, { status: 400 });
  if (!receiverId) return NextResponse.json({ error: 'Receiver ID is required' }, { status: 400 });
  if (!content) return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
  const message = await sendMessage(senderId, receiverId, content as string);
  return NextResponse.json(message);
}
