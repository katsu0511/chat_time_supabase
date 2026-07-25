'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return <button onClick={() => signOut({ callbackUrl: '/login' })} className='block bg-blue-500 text-white h-10 w-20 duration-300 hover:bg-white hover:text-blue-500 cursor-pointer'>Logout</button>;
}
