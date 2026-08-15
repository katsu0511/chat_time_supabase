export default function Button(props: {usage: string, error: string}) {
  return (
    <div className='py-2'>
      {props.error && <p className='text-red-500 font-bold text-center mb-4'>{props.error}</p>}
      <input type='submit' value={props.usage} className='block bg-[color:var(--color-background)] text-[color:var(--color-primary)] border-[color:var(--color-primary)] border-2 rounded-md h-10 w-20 mx-auto my-0 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white cursor-pointer' />
    </div>
  );
}
