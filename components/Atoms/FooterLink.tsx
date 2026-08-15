'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function FooterLink({display, url}: {display: string, url: string}) {
  const pathname = usePathname();
  if (pathname === url) return <span className='block bg-[color:var(--color-primary)] text-white border-[color:var(--color-primary)] border-x-2 border-y-4 text-lg font-bold text-center h-10 w-50'>{display}</span>;
  return <Link href={url} className='block bg-[color:var(--color-background)] text-[color:var(--color-primary)] border-[color:var(--color-primary)] border-x-2 border-y-4 text-lg font-bold text-center h-10 w-50 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>{display}</Link>;
}
