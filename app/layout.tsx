import './globals.css';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';
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
  return (
    <html lang='en' className='select-none' suppressHydrationWarning>
      <body className={fnt.className}>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
