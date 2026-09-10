'use client';

import { Dispatch, SetStateAction, useContext } from 'react';
import useLoading from '@/lib/hooks/useLoading';
import { ThemeContext } from '@/components/Templates/ThemeProviderWrapper';
import { Input, Button } from '@mui/material';

type Props = {
  receiverId: string | undefined
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  setSendingMessage: Dispatch<SetStateAction<string>>
};

export default function SendMessage({ receiverId, message, setMessage, setSendingMessage }: Props) {
  const { loading, setLoading, setSendingState, setErrorMessage, setDisplayErrorModal } = useLoading();
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  const sendMessage = async (content: string) => {
    setSendingMessage('Checking...');
    setLoading(true);
    setSendingState(true);
    setMessage('');

    content = content.trim();
    if (!content) {
      setErrorMessage('Something went wrong');
      setDisplayErrorModal(true);
      setLoading(false);
      setSendingState(false);
      return;
    }

    setSendingMessage('Translating...');

    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ receiverId, content }),
    });

    setSendingMessage('Sending...');

    if (!res.ok) {
      const data = await res.json();
      setErrorMessage(data.error);
      setDisplayErrorModal(true);
    }

    setLoading(false);
    setSendingState(false);
  };

  return (
    <div className='flex w-full h-10'>
      <Input
        disableUnderline
        disabled={loading}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          display: 'block',
          width: 'calc(100% - 80px)',
          height: '100%'
        }}
        inputProps={{
          sx: {
            display: 'block',
            border: '2px solid',
            borderColor: loading ? '#9CA3AF' : theme.palette.secondary.main,
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            p: 1,
            cursor: loading ? 'not-allowed' : 'text',
            appearance: 'none'
          }
        }}
      />
      <Button
        variant='contained'
        color='secondary'
        disableElevation={true}
        disabled={ loading || message.trim() === '' }
        onClick={() => sendMessage(message)}
        sx={{
          display: 'block',
          color: 'white',
          width: '80px',
          height: '100%',
          borderRadius: '0',
          '&.Mui-disabled': {
            pointerEvents: 'unset',
            cursor: loading || message.trim() === '' ? 'not-allowed' : 'pointer',
          }
        }}
      >
        Send
      </Button>
    </div>
  );
}
