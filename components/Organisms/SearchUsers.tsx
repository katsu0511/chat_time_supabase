'use client';

import { useState, useContext } from 'react';
import { ThemeContext } from '@/components/Templates/ThemeProviderWrapper';
import { Input } from '@mui/material';
import UserList from '@/components/Molecules/UserList';

export default function SearchUsers(props: {user: AppUser, friendIds: string[]}) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [friendIds, setFriendIds] = useState<string[]>(props.friendIds);

  const context = useContext(ThemeContext);
  if (!context) return null;
  const { colors } = context;

  const searchUsers = async (name: string) => {
    name = name.trim();
    if (!name) {
      setUsers([]);
      return;
    }
    let users: AppUser[] = [];
    const res = await fetch(`/api/getUsersByName?name=${name}`);
    if (res.ok) users = await res.json();
    setUsers(users);
  };

  const handleFriendAdded = (newFriendId: string) => {
    setFriendIds((prev) => [...prev, newFriendId]);
  };

  return (
    <div className='w-full h-full py-20'>
      <h2 className='text-2xl font-bold text-[color:var(--color-primary)] text-center pb-4'>Search Users</h2>
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
            borderColor: colors.main,
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
          <UserList key={user.id} user={user} myId={props.user.id} friendIds={friendIds} onFriendAdded={handleFriendAdded} />
        ))}
      </ul>
    </div>
  );
}
