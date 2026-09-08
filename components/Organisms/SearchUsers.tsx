'use client';

import { useState, useContext, useEffect } from 'react';
import useLoading from '@/lib/hooks/useLoading';
import { ThemeContext } from '@/components/Templates/ThemeProviderWrapper';
import Heading from '@/components/Atoms/Heading';
import { Input } from '@mui/material';
import UserList from '@/components/Molecules/UserList';

export default function SearchUsers(props: {user: AppUser, friendIds: string[]}) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [friendIds, setFriendIds] = useState<string[]>(props.friendIds);
  const { loading, setLoading } = useLoading();

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

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const context = useContext(ThemeContext);
  if (!context) return null;
  const { colors } = context;

  return (
    <div className='w-full h-full'>
      <Heading title='Search Users' />
      <Input
        disableUnderline
        disabled={loading}
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
            borderColor: loading ? '#9CA3AF' : colors.main,
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            p: 1,
            cursor: loading ? 'not-allowed' : 'text',
            appearance: 'none'
          }
        }}
        onChange={(e) => searchUsers(e.target.value)}
      />
      <ul className='block h-[calc(100dvh-302px)] text-center mt-5 overflow-y-scroll'>
        {users.map(user => (
          <UserList key={user.id} user={user} myId={props.user.id} isFriend={friendIds.includes(user.id)} onFriendAdded={handleFriendAdded} />
        ))}
      </ul>
    </div>
  );
}
