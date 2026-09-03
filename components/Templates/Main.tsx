export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex w-full min-h-[calc(100dvh-80px)] py-20'>
      <div className='w-full flex-1 md:max-w-screen-md xl:max-w-screen-xl md:px-4 md:mx-auto'>
        {children}
      </div>
    </main>
  );
}
