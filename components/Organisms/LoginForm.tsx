'use client';

import useAuth from '@/lib/useAuth';
import { handleLogin } from '@/lib/auth';
import Input from '@/components/Molecules/Input';
import Button from '@/components/Molecules/Button';
import PageLink from '@/components/Atoms/PageLink';

export default function LoginForm() {
  const { userid, setUserid, password, setPassword, error, setError, router } = useAuth();

  const login = async (e: React.SubmitEvent) => {
    e.preventDefault();
    handleLogin(userid, password, router, setError);
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={login}>
        <Input label='User ID' type='text' value={userid} onChange={(e) => setUserid(e.target.value)} />
        <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button usage='Login' error={error} />
        <PageLink usage='signup' />
      </form>
    </div>
  );
}
