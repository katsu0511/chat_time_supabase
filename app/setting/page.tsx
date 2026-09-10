import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { redirect } from 'next/navigation';
import SettingHomePage from '@/components/Organisms/SettingHomePage';

export default async function Setting() {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return redirect('/login');
  return <SettingHomePage />;
}
