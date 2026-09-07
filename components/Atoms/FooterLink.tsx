'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useLoading from '@/lib/hooks/useLoading';

export default function FooterLink({ display, url }: { display: string, url: string }) {
  const { loading } = useLoading();

  const elementClassName = 'block border-[color:var(--color-primary)] border-x-2 border-y-4 text-lg font-bold text-center h-10 w-50';
  const linkClassName = `bg-[color:var(--color-background)] text-[color:var(--color-primary)] ${elementClassName} duration-300`;
  const pathname = usePathname().split('/')[1];

  if (pathname === url) {
    return <span className={`${elementClassName} bg-[color:var(--color-primary)] text-white`}>{display}</span>;
  }

  if (loading) {
    return <span className={`${linkClassName} cursor-not-allowed`}>{display}</span>
  }

  return <Link href={`/${url}`} className={`${linkClassName} hover:bg-[color:var(--color-primary)] hover:text-white`}>{display}</Link>;
}
