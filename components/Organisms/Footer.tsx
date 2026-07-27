'use client';

import { useSession } from 'next-auth/react';
import FooterLink from '@/components/Atoms/FooterLink';

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className='bg-blue-500 w-full h-10'>
      {session
        ? <div className='flex justify-center max-w-screen-xl w-full h-full px-4 mx-auto'>
            <FooterLink display='Chat' url='/'/>
            <FooterLink display='Friend' url='/friend'/>
            <FooterLink display='Setting' url='/setting'/>
          </div>
        : <div className='text-white text-xl max-w-screen-xl w-full h-full leading-10 text-center px-4 mx-auto'>&copy;Chat time</div>
      }
    </footer>
  );
}
