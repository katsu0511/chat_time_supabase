import useLoading from '@/lib/hooks/useLoading';

export default function Button({ usage, error, hasClicked }: { usage: string, error: string, hasClicked: boolean }) {
  const { loading } = useLoading();

  const buttonClassName = loading
    ? 'bg-gray-400 text-white border-gray-400 hover:bg-gray-400'
    : 'bg-[color:var(--color-background)] text-[color:var(--color-primary)] border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white';
  const cursorClassName = hasClicked ? ' cursor-progress' : loading ? 'cursor-not-allowed' : ' cursor-pointer';

  return (
    <div className='py-2'>
      {error && <p className='text-red-500 font-bold text-center mb-4'>{error}</p>}
      <input type='submit' disabled={loading} value={hasClicked ? 'Loading..' : usage} className={`block border-2 rounded-md h-10 w-25 mx-auto my-0 duration-300 ${buttonClassName} ${cursorClassName}`} />
    </div>
  );
}
