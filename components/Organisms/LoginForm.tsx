'use client';

import useAuth from '@/lib/hooks/useAuth';
import { handleLogin } from '@/lib/api/auth';
import Input from '@/components/Molecules/Input';
import Button from '@/components/Molecules/Button';
import PageLink from '@/components/Atoms/PageLink';

export default function LoginForm() {
  const { email, setEmail, password, setPassword, error, setError, router } = useAuth();

  const login = async (e: React.SubmitEvent) => {
    e.preventDefault();
    handleLogin(email, password, router, setError);
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={login}>
        <Input label='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button usage='Login' error={error} />
        <PageLink path='signup' display='Signup' />
      </form>
    </div>
  );
}
