import type { User } from 'next-auth';
import { addFriend } from '@/lib/actions';
import { Button } from '@mui/material';

export default function UserList(props: {user: User, myId: string, friendIds: number[], onFriendAdded: (id: number) => void}) {
  const handleAddFriend = async () => {
    const result = await addFriend(Number(props.myId), Number(props.user.id));
    if (result && props.onFriendAdded) props.onFriendAdded(Number(props.user.id));
  };

  return (
    <li key={props.user.id} className='w-full max-w-100 h-[50px] mx-auto px-5 my-0'>
      <div className='flex w-full h-full border-[color:var(--color-primary)] border-b-1'>
        <div className='w-[calc(100%-72px)] max-w-82 h-full text-left px-2'>
          <p className='text-xl w-full h-[25px]'>{props.user.name}</p>
          <p className='text-sm w-full h-6 leading-6'>{props.user.userId}</p>
        </div>
        <div className='w-18 h-full pr-2'>
          {
            props.user.id != props.myId &&
            <Button
              variant='contained'
              color='secondary'
              disableElevation={true}
              disabled={props.friendIds.includes(props.user.id as unknown as number)}
              onClick={handleAddFriend}
              sx={{
                display: 'block',
                color: 'white',
                width: '64px',
                height: '36px',
                borderRadius: '5px',
                padding: 0,
                marginTop: '7px',
                marginBottom: '6px'
              }}
            >
              {props.friendIds.includes(props.user.id as unknown as number) ? 'Friend' : 'Add'}
            </Button>
          }
        </div>
      </div>
    </li>
  );
}
