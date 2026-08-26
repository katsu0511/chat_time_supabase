import '@/app/globals.css';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';
import type { User as AuthUser } from '@supabase/supabase-js';
import getAuthUser from '@/lib/auth/getAuthUser';
import { ThemeProviderWrapper } from '@/components/Templates/ThemeProviderWrapper';
import Header from '@/components/Organisms/Header';
import Main from '@/components/Templates/Main';
import Footer from '@/components/Organisms/Footer';

const fnt = Inconsolata({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat time',
  description: 'App for chatting with friends',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: AuthUser | null = await getAuthUser();

  return (
    <html lang='en' className='select-none'>
      <body className={fnt.className}>
        <ThemeProviderWrapper>
          <Header user={user} />
          <Main>{children}</Main>
          <Footer user={user} />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
