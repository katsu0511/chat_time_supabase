'use client';

import useLoading from '@/lib/hooks/useLoading';
import { useEffect } from 'react';
import { FormControl } from '@mui/material';
import Heading from '@/components/Atoms/Heading';
import ThemeModeWrapper from '@/components/Organisms/ThemeModeWrapper';
import ThemeColorWrapper from '@/components/Organisms/ThemeColorWrapper';
import PageLink from '@/components/Atoms/PageLink';

export default function ThemeSettingForm() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

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
