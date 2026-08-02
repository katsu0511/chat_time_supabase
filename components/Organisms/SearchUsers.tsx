'use client';

import { useState } from 'react';
import type { Session, User } from 'next-auth';
import { Input } from '@mui/material';
import UserList from '@/components/Molecules/UserList';
import { blue } from '@mui/material/colors';

export default function SearchUsers(props: {session: Session, friendIds: number[]}) {
  const [users, setUsers] = useState<User[]>([]);
  const [friendIds, setFriendIds] = useState<number[]>(props.friendIds);

  const searchUsers = async (name: string) => {
    name = name.trim();
    if (!name) {
      setUsers([]);
      return;
    }
    let users: User[] = [];
    const res = await fetch(`/api/getUsersByName?name=${name}`);
    if (res.ok) users = await res.json();
    setUsers(users);
  };

  const handleFriendAdded = (newFriendId: number) => {
    setFriendIds((prev) => [...prev, newFriendId]);
  };

  return (
    <div className='w-full h-full py-20'>
      <Input
        disableUnderline
        sx={{
          display: 'block',
          width: '100%',
          maxWidth: '400px',
          height: '50px',
          padding: '0 20px',
          margin: '0 auto'
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
        onChange={(e) => searchUsers(e.target.value)}
      />
      <ul className='block text-center py-10'>
        {users.map(user => (
            <UserList key={user.id} user={user} myId={props.session.user.id} friendIds={friendIds} onFriendAdded={handleFriendAdded} />
        ))}
      </ul>
    </div>
  );
}
