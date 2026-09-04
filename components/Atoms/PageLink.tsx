import Link from 'next/link';

export default function PageLink({ path, display, disabled = false }: { path: string, display: string, disabled?: boolean }) {
  return (
    <div className='flex justify-center mt-10'>
      {
        disabled
        ? <span className='inline-block text-gray-400 font-bold duration-300 cursor-not-allowed'>&gt;&gt; {display}</span>
        : <Link href={`./${path}`} className='inline-block text-[color:var(--color-primary)] font-bold duration-300 cursor-pointer hover:opacity-40'>&gt;&gt; {display}</Link>
      }
    </div>
  );
}
