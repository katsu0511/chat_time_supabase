import { useState } from 'react';
import { Button } from '@mui/material';

export default function UserList(props: {user: AppUser, myId: string, friendIds: string[], onFriendAdded: (id: string) => void}) {
  const [loading, setLoading] = useState(false);

  const addFriend = async () => {
    setLoading(true);

    const res = await fetch('/api/addFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ friendId: props.user.id }),
    });

    if (res.ok) {
      props.onFriendAdded(props.user.id);
    } else {
      const data = await res.json();
      alert(data.error);
    }

    setLoading(false);
  };

  return (
    <li key={props.user.id} className='w-full max-w-100 h-[50px] mx-auto px-5 my-0'>
      <div className='flex w-full h-full border-[color:var(--color-primary)] border-b-1'>
        <div className='w-[calc(100%-84px)] max-w-82 h-full text-left px-2'>
          <p className='text-xl w-full h-[25px]'>{props.user.name}</p>
          <p className='text-sm w-full h-6 leading-6'>{props.user.email}</p>
        </div>
        <div className='w-18 h-full pr-2'>
          {
            props.user.id != props.myId &&
            <Button
              variant='contained'
              color='secondary'
              disableElevation={true}
              disabled={loading || props.friendIds.includes(props.user.id)}
              onClick={addFriend}
              sx={{
                display: 'block',
                color: 'white',
                width: '76px',
                height: '36px',
                borderRadius: '5px',
                padding: 0,
                marginTop: '7px',
                marginBottom: '6px'
              }}
            >
              {loading ? 'Loading..' : props.friendIds.includes(props.user.id) ? 'Friend' : 'Add'}
            </Button>
          }
        </div>
      </div>
    </li>
  );
}
