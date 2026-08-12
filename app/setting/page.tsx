import { auth } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { FormControl } from '@mui/material';
import ThemeModeWrapper from '@/components/Organisms/ThemeModeWrapper';
import ThemeColorWrapper from '@/components/Organisms/ThemeColorWrapper';

export default async function Setting() {
  const session = await auth();
  if (!session) return redirect('/login');

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
        <ThemeModeWrapper />
        <ThemeColorWrapper />
      </FormControl>
    </div>
  );
}
