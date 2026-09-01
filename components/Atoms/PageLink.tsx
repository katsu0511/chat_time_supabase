import Link from 'next/link';

export default function PageLink({ path, display }: { path: string, display: string }) {
  return (
    <div className='flex justify-center mt-10'>
      <Link href={`./${path}`} className='inline-block text-[color:var(--color-primary)] font-bold duration-300 hover:opacity-40 cursor-pointer'>&gt;&gt; {display}</Link>
    </div>
  );
}
