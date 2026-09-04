'use client';

import { usePathname } from 'next/navigation';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className={`flex w-full min-h-dvh ${pathname === '/' ? 'py-10' : 'py-20'}`}>
      <div className='w-full flex-1 md:max-w-screen-md xl:max-w-screen-xl md:px-4 md:mx-auto'>
        {children}
      </div>
    </main>
  );
}
