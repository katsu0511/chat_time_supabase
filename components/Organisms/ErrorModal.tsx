import useLoading from '@/lib/hooks/useLoading';
import { Button } from '@mui/material';

export default function ErrorModal() {
  const { errorMessage, setDisplayErrorModal } = useLoading();

  return (
    <div className='fixed top-0 left-0 flex justify-center items-center bg-black/80 w-full h-full z-100'>
      <div className='flex justify-center items-center bg-white w-70 h-50 rounded-lg'>
        <div className='text-center'>
          <p className='w-full mb-5'>{errorMessage}</p>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setDisplayErrorModal(false)}
            sx={{ color: 'white' }}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
