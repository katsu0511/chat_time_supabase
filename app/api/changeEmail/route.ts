import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import supabaseAdmin from '@/lib/infrastructure/supabaseAdmin';
import { NextResponse } from 'next/server';
import { changeEmail } from '@/lib/api/actions';

export async function POST(req: Request) {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  try {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { email, email_confirm: true }
    );
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    const newEmail = await changeEmail(user.id, email);
    return NextResponse.json(newEmail);
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
