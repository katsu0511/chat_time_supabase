import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/api/getter';
import EmailSettingForm from '@/components/Organisms/EmailSettingForm';

export default async function EmailSetting() {
  const authUser: AuthUser | null = await getAuthUser();
  if (!authUser) {
    redirect('/login')
  }
  const appUser: AppUser | null = await getUser(authUser.id);
  if (!appUser) {
    redirect('/login');
  }
  return <EmailSettingForm user={appUser} />;
}
