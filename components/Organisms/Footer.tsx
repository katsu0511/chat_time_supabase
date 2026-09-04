import type { User as AuthUser } from '@supabase/supabase-js';
import FooterLink from '@/components/Atoms/FooterLink';

export default async function Footer({user}: {user: AuthUser | null}) {
  return (
    <footer className='fixed bottom-0 bg-[color:var(--color-primary)] w-full h-10 z-10'>
      {user
        ? <div className='flex justify-center max-w-screen-xl w-full h-full px-4 mx-auto'>
            <FooterLink display='Chat' url=''/>
            <FooterLink display='Friend' url='friend'/>
            <FooterLink display='Setting' url='setting'/>
          </div>
        : <div className='text-white text-xl max-w-screen-xl w-full h-full leading-10 text-center px-4 mx-auto'>&copy;Chat time</div>
      }
    </footer>
  );
}
