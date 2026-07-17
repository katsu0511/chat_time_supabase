'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LogoutButton from '@/components/Atoms/LogoutButton';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className='bg-blue-500 w-full h-10'>
      <div className='flex justify-between max-w-screen-xl w-full h-full px-4 mx-auto'>
        {session
          ? <Link href='/' className='text-white text-3xl font-bold leading-10 duration-300 hover:opacity-60'>Chat Time</Link>
          : <h1 className='text-white text-3xl font-bold leading-10'>Chat Time</h1>
        }
        {session && <LogoutButton />}
      </div>
    </header>
  );
}
