'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function FooterLink({display, url}: {display: string, url: string}) {
  const pathname = usePathname();
  if (pathname === url) return <span className='block bg-blue-500 text-white border-blue-500 border-x-2 border-y-4 text-lg font-bold text-center h-10 w-50'>{display}</span>;
  return <Link href={url} className='block bg-white text-blue-500 border-blue-500 border-x-2 border-y-4 text-lg font-bold text-center h-10 w-50 duration-300 hover:bg-blue-500 hover:text-white'>{display}</Link>;
}
