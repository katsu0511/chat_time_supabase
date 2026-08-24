import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/getAuthUser';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/Organisms/LoginForm';

export default async function Login() {
  const user: AuthUser | null = await getAuthUser();
  if (user) {
    redirect('/');
  }
  return <LoginForm />;
}
