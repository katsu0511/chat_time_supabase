'use client';

import { usePathname } from 'next/navigation';
import useLoading from '@/lib/hooks/useLoading';
import ErrorModal from '@/components/Organisms/ErrorModal';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { displayErrorModal } = useLoading();

  return (
    <main className={`flex w-full min-h-dvh ${pathname === '/' ? 'py-10' : 'py-20'}`}>
      <div className='w-full flex-1 md:max-w-screen-md xl:max-w-screen-xl md:px-4 md:mx-auto'>
        {children}
      </div>
      { displayErrorModal && <ErrorModal /> }
    </main>
  );
}
