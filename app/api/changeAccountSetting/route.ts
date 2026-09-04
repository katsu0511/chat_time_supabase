import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { NextResponse } from 'next/server';
import { changeAccountSetting } from '@/lib/api/actions';

export async function POST(req: Request) {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, language } = await req.json();
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!language) return NextResponse.json({ error: 'Language is required' }, { status: 400 });
  try {
    const newAccountSetting = await changeAccountSetting(user.id, name, language);
    return NextResponse.json(newAccountSetting);
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
