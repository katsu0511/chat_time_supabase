import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/infrastructure/supabaseAdmin';

export async function POST(req: Request) {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { password } = await req.json();
  if (!password) return NextResponse.json({ error: 'Password is required' }, { status: 400 });
  try {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password }
    );
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
