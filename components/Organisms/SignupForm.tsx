'use client';

import { useState } from 'react';
import useAuth from '@/lib/hooks/useAuth';
import { handleSignup } from '@/lib/api/auth';
import Heading from '@/components/Atoms/Heading';
import Input from '@/components/Molecules/Input';
import LanguageSelect from '@/components/Molecules/LanguageSelect';
import { Language } from '@/lib/domain/languages';
import Button from '@/components/Molecules/Button';
import PageLink from '@/components/Atoms/PageLink';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const { name, setName, email, setEmail, language, setLanguage, password, setPassword, passwordConfirm, setPasswordConfirm, error, setError, router } = useAuth();

  const signup = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== passwordConfirm) {
      setError('Password doesn\'t match');
      setLoading(false);
      return;
    }

    const error = await handleSignup(name, email, language, passwordConfirm, router);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={signup}>
        <Heading title='Signup' />
        <Input label='Name' type='text' value={name} disabled={loading} onChange={(e) => setName(e.target.value)}/>
        <Input label='Email' type='email' value={email} disabled={loading} onChange={(e) => setEmail(e.target.value)} />
        <LanguageSelect label='Language' value={language} disabled={loading} onChange={(e) => setLanguage(e.target.value as Language)} />
        <Input label='Password' type='password' value={password} disabled={loading} onChange={(e) => setPassword(e.target.value)}/>
        <Input label='Password Confirm' type='password' value={passwordConfirm} disabled={loading} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        <Button usage='Signup' error={error} disabled={loading} />
        <PageLink path='login' display='Login' disabled={loading} />
      </form>
    </div>
  );
}
