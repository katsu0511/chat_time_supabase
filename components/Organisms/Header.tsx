import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import LogoutButton from '@/components/Atoms/LogoutButton';

export default async function Header({user}: {user: User | null}) {
  return (
    <header className='bg-[color:var(--color-primary)] w-full h-10'>
      <div className='flex justify-between max-w-screen-xl w-full h-full px-4 mx-auto'>
        {user
          ? <Link href='/' className='text-white text-3xl font-bold leading-10 duration-300 hover:opacity-60'>Chat Time</Link>
          : <h1 className='text-white text-3xl font-bold leading-10'>Chat Time</h1>
        }
        {user && <LogoutButton />}
      </div>
    </header>
  );
}
