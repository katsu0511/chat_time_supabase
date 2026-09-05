import type { User as AuthUser } from '@supabase/supabase-js';
import Link from 'next/link';
import LogoutButton from '@/components/Atoms/LogoutButton';

export default function Header({user}: {user: AuthUser | null}) {
  return (
    <header className='fixed bg-[color:var(--color-primary)] w-full h-10 z-10'>
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
