import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { NextResponse } from 'next/server';
import { getUser } from '@/lib/api/getter';
import { Languages, Language } from '@/lib/domain/languages';
import translateMessage from '@/lib/domain/translateMessage';
import { sendMessage } from '@/lib/api/actions';

type SendMessageRequest = {
  receiverId?: string;
  content?: string;
};

export async function POST(req: Request) {
  const authUser: AuthUser | null = await getAuthUser();
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const appUser: AppUser | null = await getUser(authUser.id);
    if (!appUser) return NextResponse.json({ error: 'User not found' }, { status: 400 });
    const { receiverId, content }: SendMessageRequest = await req.json();
    if (!receiverId) return NextResponse.json({ error: 'Receiver ID is required' }, { status: 400 });
    if (!content) return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    const receiver: AppUser | null = await getUser(receiverId);
    if (!receiver) return NextResponse.json({ error: 'Receiver user not found' }, { status: 400 });
    if (appUser.language !== receiver.language) {
      const language = Languages[receiver.language as Language];
      const translatedContent = await translateMessage(language, content);
      if (!translatedContent) return NextResponse.json({ error: 'Translation error' }, { status: 500 });
      await sendMessage(appUser.id, receiverId, content, translatedContent);
    } else await sendMessage(appUser.id, receiverId, content, content);
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
