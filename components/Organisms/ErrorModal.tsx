import { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';

type Props = {
  message: string
  setDisplayModal: Dispatch<SetStateAction<boolean>>
};

export default function ErrorModal({ message, setDisplayModal }: Props) {
  return (
    <div className='fixed top-0 left-0 flex justify-center items-center bg-black/80 w-full h-full z-100'>
      <div className='flex justify-center items-center bg-white w-70 h-50 rounded-lg'>
        <div className='text-center'>
          <p className='w-full mb-5'>{message}</p>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setDisplayModal(false)}
            sx={{ color: 'white' }}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
