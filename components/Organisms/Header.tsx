'use client';

import type { User as AuthUser } from '@supabase/supabase-js';
import useLoading from '@/lib/hooks/useLoading';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/components/Atoms/LogoutButton';

export default function Header({ user }: { user: AuthUser | null }) {
  const { loading, setLoading } = useLoading();
  const pathname = usePathname();

  const onMoveToHome = () => {
    if (pathname !== '/') {
      setLoading(true);
    }
  };

  return (
    <header className='fixed bg-[color:var(--color-primary)] w-full h-10 z-20'>
      <div className='flex justify-between max-w-screen-xl w-full h-full px-4 mx-auto'>
        {
          loading || !user
          ? <h1 className='text-white text-3xl font-bold leading-10'>Chat Time</h1>
          : <Link href='/' className='text-white text-3xl font-bold leading-10 duration-300 hover:opacity-60' onClick={onMoveToHome}>Chat Time</Link>
        }
        {user && <LogoutButton />}
      </div>
    </header>
  );
}
