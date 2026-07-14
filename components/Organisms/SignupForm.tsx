'use client';

import useAuth from '@/lib/useAuth';
import { handleSignup } from '@/lib/auth';
import Input from '@/components/Molecules/Input';
import Button from '@/components/Molecules/Button';
import PageLink from '@/components/Atoms/PageLink';

export default function SignupForm() {
  const { name, setName, userid, setUserid, password, setPassword, error, setError, router } = useAuth();

  const signup = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignup(name, userid, password, router, setError);
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={signup}>
        <Input label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        <Input label='User ID' type='text' value={userid} onChange={(e) => setUserid(e.target.value)} />
        <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button usage='Signup' error={error} />
        <PageLink usage='login' />
      </form>
    </div>
  );
}
