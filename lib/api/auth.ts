import { supabase } from '@/lib/infrastructure/supabaseBrowser';
import { Language } from '@/lib/domain/languages';
import { createUser } from '@/lib/api/actions';
import { Prisma } from '@/lib/generated/prisma/client';

export const handleLogin = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { message: 'Failed to login' };
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return { message: 'Failed to logout' };
};

export const handleSignup = async (name: string, email: string, language: Language, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error || !data.user) return { message: error?.message ?? 'Failed to signup' };

  try {
    await createUser({ id: data.user.id, name, email, language });
  } catch (error) {
    if (error instanceof Error) {
      if (error.constructor.name === 'PrismaClientKnownRequestError' && (error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
        console.error('This user ID is already used: ', error.message);
        return { message: 'This user ID is already used.'};
      }
      console.error('General error: ', error);
      return { message: 'General error' };
    }
    console.error('Unknown error: ', error);
    return { message: 'Unknown error' };
  }
};

export const checkPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { message: 'Current password is wrong'};
};
