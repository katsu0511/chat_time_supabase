import { Language } from '@/lib/domain/languages';
import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { NextResponse } from 'next/server';
import { createUser } from '@/lib/api/actions';
import { Prisma } from '@/lib/generated/prisma/client';

type CreateUserRequest = {
  name?: string
  language?: Language
};

export async function POST(req: Request) {
  const authUser: AuthUser | null = await getAuthUser();
  if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, language }: CreateUserRequest = await req.json();
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!authUser.email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  if (!language) return NextResponse.json({ error: 'Language is required' }, { status: 400 });
  try {
    await createUser({ id: authUser.id, name, email: authUser.email, language });
    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        console.error('This user ID is already used: ', error.message);
        return NextResponse.json({ error: 'This user ID is already used' }, { status: 409 });
      }
      console.error('General error: ', error);
      return NextResponse.json({ error: 'General error' }, { status: 500 });
    }
    console.error('Unknown error: ', error);
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
