'use client';

import { supabase } from '@/lib/infrastructure/supabaseBrowser';
import useAuth from '@/lib/hooks/useAuth';

export default function LogoutButton() {
  const { router } = useAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
      return;
    }
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      className='block bg-[color:var(--color-primary)] text-white h-10 w-20 duration-300 hover:bg-white hover:text-[color:var(--color-primary)] cursor-pointer'
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
