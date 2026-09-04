import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { NextResponse } from 'next/server';
import { getMessages } from '@/lib/api/getter';

export async function GET(req: Request) {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const friendId = searchParams.get('friendId');
  if (!friendId) return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
  try {
    const messages = await getMessages(user.id, friendId);
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
