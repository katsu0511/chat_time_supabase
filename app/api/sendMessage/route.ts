import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { NextResponse } from 'next/server';
import { getUser } from '@/lib/api/getter';
import { Languages, Language } from '@/lib/domain/languages';
import translateMessage from '@/lib/domain/translateMessage';
import { sendMessage } from '@/lib/api/actions';

export async function POST(req: Request) {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { receiverId, content } = await req.json();
  if (!receiverId) return NextResponse.json({ error: 'Receiver ID is required' }, { status: 400 });
  if (!content) return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
  const receiver: AppUser | null = await getUser(receiverId);
  if (!receiver) return NextResponse.json({ error: 'User not found' }, { status: 400 });
  const language = Languages[receiver.language as Language];
  try {
    const translatedContent = await translateMessage(language, content);
    await sendMessage(user.id, receiverId, content, translatedContent!);
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Translation error' }, { status: 500 });
  }
}
