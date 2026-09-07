'use client';

import useLoading from '@/lib/hooks/useLoading';
import { useEffect } from 'react';
import Heading from '@/components/Atoms/Heading';
import PageLink from '@/components/Atoms/PageLink';

export default function SettingHomePage() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

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
