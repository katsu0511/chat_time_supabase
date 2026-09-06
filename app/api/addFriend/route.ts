import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { NextResponse } from 'next/server';
import { getUser } from '@/lib/api/getter';
import { addFriend } from '@/lib/api/actions';

type AddFriendRequest = {
  friendId?: string;
};

export async function POST(req: Request) {
  const authUser: AuthUser | null = await getAuthUser();
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const appUser: AppUser | null = await getUser(authUser.id);
    if (!appUser) return NextResponse.json({ error: 'User not found' }, { status: 400 });
    const { friendId }: AddFriendRequest = await req.json();
    if (!friendId) return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
    const rows = await addFriend(appUser.id, friendId);
    if (rows === 0) return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    return NextResponse.json({ message: 'Friend added' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
