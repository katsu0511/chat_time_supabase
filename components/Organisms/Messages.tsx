'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabaseBrowser';
import MessageContent from '@/components/Molecules/MessageContent';
import SendMessage from '@/components/Molecules/SendMessage';

export default function Messages({user, friends}: {user: AppUser, friends: AppUser[]}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [friendId, setFriendId] = useState<string>();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const getMessages = useCallback(async (friendId: string) => {
    setFriendId(friendId);
    const res = await fetch(`/api/getMessages?userId=${user.id}&friendId=${friendId}`);
    if (!res.ok) {
      setMessages([]);
      return;
    }
    const contents: Message[] = await res.json();
    setMessages(contents);
  }, [user]);

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'auto'
    });
  }, [messages]);

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
        },
        (payload) => {
          const newMessage = payload.new;
          const senderId = newMessage.sender_id;
          const receiverId = newMessage.receiver_id;
          const myId = user.id;

          if (senderId === myId && receiverId === friendId || senderId === friendId && receiverId === myId) {
            const message: Message = {
              messageId: newMessage.message_id,
              senderId,
              receiverId,
              content: newMessage.content,
              createdAt: newMessage.created_at,
            };
            setMessages(prev => [...prev, message]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, friendId]);

  return (
    <div className='flex w-full h-full md:border-[color:var(--color-primary)] md:border-x-4'>
      <div className='w-[30%] h-full'>
        <ul>
          {friends.map(friend => (
            <li key={friend.id} className='w-full h-24'>
              <button
                className={`w-full h-full p-2 cursor-pointer duration-300 ${friendId === friend.id && 'bg-[color:var(--color-secondary)] shadow-xl'} hover:bg-[color:var(--color-secondary)] hover:shadow-xl`}
                onClick={() => getMessages(friend.id)}
              >
                <p className='w-full h-[50%] text-2xl leading-10 text-left'>{friend.name}</p>
                <p className='w-full h-[50%] text-lg leading-10 text-left'>{friend.email}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-[70%] h-full'>
        <div ref={messageContainerRef} className='bg-[color:var(--light-secondary)] w-full h-[calc(100%-40px)] overflow-y-auto'>
          {messages.map(message => (
            <MessageContent key={message.messageId} userId={user.id} message={message} />
          ))}
        </div>
        {
          friendId === undefined
          ? <div className='bg-[color:var(--light-secondary)] w-full h-10'></div>
          : <SendMessage senderId={user.id} receiverId={friendId} />
        }
      </div>
    </div>
  );
}
