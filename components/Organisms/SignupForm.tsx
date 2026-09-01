'use client';

import useAuth from '@/lib/hooks/useAuth';
import { handleSignup } from '@/lib/api/auth';
import Input from '@/components/Molecules/Input';
import LanguageSelect from '@/components/Molecules/LanguageSelect';
import { Language } from '@/lib/domain/languages';
import Button from '@/components/Molecules/Button';
import PageLink from '@/components/Atoms/PageLink';

export default function SignupForm() {
  const { name, setName, email, setEmail, language, setLanguage, password, setPassword, passwordConfirm, setPasswordConfirm, error, setError, router } = useAuth();

  const signup = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignup(name, email, language, password, passwordConfirm, router, setError);
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={signup}>
        <Input label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        <Input label='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <LanguageSelect label='Language' onChange={(e) => setLanguage(e.target.value as Language)} />
        <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Input label='Password Confirm' type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        <Button usage='Signup' error={error} />
        <PageLink path='login' display='Login' />
      </form>
    </div>
  );
}
