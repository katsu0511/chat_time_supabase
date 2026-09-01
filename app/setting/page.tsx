import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { redirect } from 'next/navigation';
import Heading from '@/components/Atoms/Heading';
import PageLink from '@/components/Atoms/PageLink';

export default async function Setting() {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return redirect('/login');

  return (
    <div className='flex items-center w-full h-full'>
      <div className='w-full'>
        <Heading title='Setting' />
        <PageLink path='setting/theme' display='Theme Setting' />
        <PageLink path='setting/account' display='Account Setting' />
      </div>
    </div>
  );
}
