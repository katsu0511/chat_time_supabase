'use client';

export default function Header() {
  return (
    <header className='bg-blue-500 w-full h-10'>
      <div className='flex justify-between max-w-screen-xl w-full h-full px-4 mx-auto'>
        <h1 className='text-white text-3xl font-bold leading-10'>Chat Time</h1>
      </div>
    </header>
  );
}
