import { sendMessage } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { senderId: senderIdParam, receiverId: receiverIdParam, content } = await req.json();
  if (!senderIdParam) return NextResponse.json({ error: 'Sender ID is required' }, { status: 400 });
  if (!receiverIdParam) return NextResponse.json({ error: 'Receiver ID is required' }, { status: 400 });
  if (!content) return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
  const senderId = Number(senderIdParam);
  if (isNaN(senderId)) return NextResponse.json({ error: 'Sender ID must be a number' }, { status: 400 });
  const receiverId = Number(receiverIdParam);
  if (isNaN(receiverId)) return NextResponse.json({ error: 'Receiver ID must be a number' }, { status: 400 });
  const message = await sendMessage(senderId, receiverId, content as string);
  return NextResponse.json(message);
}
