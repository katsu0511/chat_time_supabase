'use client';

import useLoading from '@/lib/hooks/useLoading';
import Link from 'next/link';

export default function PageLink({ path, display }: { path: string, display: string }) {
  const { loading, setLoading } = useLoading();

  const commonClassName = 'inline-block font-bold duration-300';

  return (
    <div className='flex justify-center mt-10'>
      {
        loading
        ? <span className={`${commonClassName} text-gray-400 cursor-not-allowed`}>&gt;&gt; {display}</span>
        : <Link href={`./${path}`} className={`${commonClassName} text-[color:var(--color-primary)] cursor-pointer hover:opacity-40`} onClick={() => setLoading(true)}>&gt;&gt; {display}</Link>
      }
    </div>
  );
}
