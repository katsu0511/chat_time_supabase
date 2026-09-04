import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { redirect } from 'next/navigation';
import { FormControl } from '@mui/material';
import Heading from '@/components/Atoms/Heading';
import ThemeModeWrapper from '@/components/Organisms/ThemeModeWrapper';
import ThemeColorWrapper from '@/components/Organisms/ThemeColorWrapper';
import PageLink from '@/components/Atoms/PageLink';

export default async function ThemeSetting() {
  const user: AuthUser | null = await getAuthUser();
  if (!user) return redirect('/login');

  return (
    <div className='w-full h-full'>
      <FormControl
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Heading title='Theme Setting' />
        <ThemeModeWrapper />
        <ThemeColorWrapper />
        <PageLink path='' display='Setting' />
      </FormControl>
    </div>
  );
}
