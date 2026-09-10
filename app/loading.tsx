import { Backdrop, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Backdrop
      open
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 100
      }}
    >
      <CircularProgress color='inherit' />
      <p className='text-[color:var(--text-primary)] text-2xl ml-5 animate-pulse md:text-5xl'>Loading...</p>
    </Backdrop>
  );
}
