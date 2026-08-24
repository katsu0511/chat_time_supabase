import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/getAuthUser';
import { redirect } from 'next/navigation';
import { getUser, getFriendIds } from '@/lib/getter';
import SearchUsers from '@/components/Organisms/SearchUsers';

export default async function Friend() {
  const authUser: AuthUser | null = await getAuthUser();
  if (!authUser) {
    redirect('/login');
  }
  const appUser: AppUser | null = await getUser(authUser.id);
  if (!appUser) {
    redirect('/login');
  }
  const friendIds = await getFriendIds(appUser.id);
  return <SearchUsers user={appUser} friendIds={friendIds} />;
}
