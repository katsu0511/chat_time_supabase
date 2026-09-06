'use client';

import { useState, useContext } from 'react';
import { ThemeContext } from '@/components/Templates/ThemeProviderWrapper';
import { Input, Button } from '@mui/material';

export default function SendMessage(props: {receiverId: string | undefined}) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme } = context;

  const sendMessage = async (receiverId: string | undefined, content: string) => {
    content = content.trim();
    if (!content) return;

    setLoading(true);
    setMessage('');

    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ receiverId, content }),
    });

    if (!res.ok) return null;

    setLoading(false);
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
        onClick={() => sendMessage(props.receiverId, message)}
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
