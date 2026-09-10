import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { redirect } from 'next/navigation';
import ThemeSettingForm from '@/components/Organisms/ThemeSettingForm';

export default async function ThemeSetting() {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return redirect('/login');
  return <ThemeSettingForm />;
}
