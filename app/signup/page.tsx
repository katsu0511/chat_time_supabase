import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { redirect } from 'next/navigation';
import SignupForm from '@/components/Organisms/SignupForm';

export default async function Signup() {
  const user: AuthUser | null = await getAuthUser();
  if (user) return redirect('/');
  return <SignupForm />;
}
