'use client';

import useAuth from '@/lib/hooks/useAuth';
import { useEffect } from 'react';
import Heading from '@/components/Atoms/Heading';
import Input from '@/components/Molecules/Input';
import LanguageSelect from '@/components/Molecules/LanguageSelect';
import { Language } from '@/lib/domain/languages';
import Button from '@/components/Molecules/Button';
import PageLink from '@/components/Atoms/PageLink';

export default function AccountSettingForm({ user }: { user: AppUser }) {
  const { name, setName, language, setLanguage, error, setError, router } = useAuth();

  const changeSetting = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.name === name && user.language === language) {
      setError('You don\'t change any account setting');
      return;
    }

    const res = await fetch('/api/changeAccountSetting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, language }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }

    router.push('/setting');
  };

  useEffect(() => {
    setName(user.name);
    setLanguage(user.language as Language);
  }, [user, setName, setLanguage]);

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={changeSetting}>
        <Heading title='Account Setting' />
        <Input label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        <LanguageSelect label='Language' value={language} onChange={(e) => setLanguage(e.target.value as Language)} />
        <Button usage='Change' error={error} />
        <PageLink path='account/email' display='Email Setting' />
        <PageLink path='account/password' display='Password Setting' />
        <PageLink path='' display='Setting' />
      </form>
    </div>
  );
}
