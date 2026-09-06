export default function Button({ usage, error, disabled }: { usage: string, error: string, disabled: boolean }) {
  const buttonClassName = disabled
    ? 'bg-gray-400 text-white border-gray-400 hover:bg-gray-400 cursor-progress'
    : 'bg-[color:var(--color-background)] text-[color:var(--color-primary)] border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white cursor-pointer';

  return (
    <div className='py-2'>
      {error && <p className='text-red-500 font-bold text-center mb-4'>{error}</p>}
      <input type='submit' value={disabled ? 'Loading..' : usage} disabled={disabled} className={`block border-2 rounded-md h-10 w-25 mx-auto my-0 duration-300 ${buttonClassName}`} />
    </div>
  );
}
