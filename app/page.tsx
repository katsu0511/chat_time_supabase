import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/getAuthUser';
import { redirect } from 'next/navigation';
import { getUser, getFriends } from '@/lib/getter';
import Messages from '@/components/Organisms/Messages';

export default async function Home() {
  const authUser: AuthUser | null = await getAuthUser();
  if (!authUser) {
    redirect('/login');
  }
  const appUser: AppUser | null = await getUser(authUser.id);
  if (!appUser) {
    redirect('/login');
  }
  const friends: AppUser[] = await getFriends(appUser.id);
  return <Messages user={appUser} friends={friends} />;
}
