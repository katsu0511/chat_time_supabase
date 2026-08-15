'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return <button onClick={() => signOut({ callbackUrl: '/login' })} className='block bg-[color:var(--color-primary)] text-white h-10 w-20 duration-300 hover:bg-white hover:text-[color:var(--color-primary)] cursor-pointer'>Logout</button>;
}
