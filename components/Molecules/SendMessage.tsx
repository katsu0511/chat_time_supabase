'use client';

import { useState } from 'react';
import { Input, Button } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function SendMessage(props: {senderId: number, receiverId: number | undefined}) {
  const [message, setMessage] = useState('');

  const sendMessage = async (senderId: number, receiverId: number | undefined, content: string) => {
    content = content.trim();
    if (!content) return;

    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderId, receiverId, content }),
    });

    if (!res.ok) return null;
    setMessage('');
  };

  return (
    <div className='flex w-full h-10'>
      <Input
        disableUnderline
        disabled={ props.receiverId == undefined }
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
            borderColor: blue[500],
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            p: 1,
            appearance: 'none'
          }
        }}
      />
      <Button
        variant='contained'
        color='primary'
        disableElevation={true}
        disabled={ props.receiverId == undefined || message.trim() == '' }
        onClick={() => sendMessage(props.senderId, props.receiverId, message)}
        sx={{
          display: 'block',
          color: 'white',
          width: '80px',
          height: '100%',
          borderRadius: '0'
        }}
      >
        Send
      </Button>
    </div>
  );
}
