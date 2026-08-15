import '@/app/globals.css';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';
import { auth } from '@/lib/getSession';
import SessionProviderWrapper from '@/components/Templates/SessionProviderWrapper';
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
  const session = await auth();

  return (
    <html lang='en' className='select-none'>
      <body className={fnt.className}>
        <SessionProviderWrapper session={session}>
          <ThemeProviderWrapper>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </ThemeProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
