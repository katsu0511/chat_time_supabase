'use client';

import type { Session, User } from 'next-auth';
import { useState, useCallback, useEffect, useRef } from 'react';
import MessageContent from '@/components/Molecules/MessageContent';
import SendMessage from '@/components/Molecules/SendMessage';

export default function Messages({session, friends}: {session: Session, friends: User[]}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [friendId, setFriendId] = useState<number>();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const getMessages = useCallback(async (friendId: number) => {
    setFriendId(friendId);
    const res = await fetch(`/api/getMessages?id=${session.user.id}&friendId=${friendId}`);
    if (!res.ok) setMessages([]);
    const contents: Message[] = await res.json();
    setMessages(contents);
  }, [session.user.id]);

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'auto'
    });
  }, [messages]);

  return (
    <div className='flex w-full h-full md:border-[color:var(--color-primary)] md:border-x-4'>
      <div className='w-[30%] h-full'>
        <ul>
          {friends.map(friend => (
            <li key={friend.id} className='w-full h-24'>
              <button
                className={`w-full h-full p-2 cursor-pointer duration-300 ${friendId === Number(friend.id) && 'bg-[color:var(--color-secondary)] shadow-xl'} hover:bg-[color:var(--color-secondary)] hover:shadow-xl`}
                onClick={() => getMessages(Number(friend.id))}
              >
                <p className='w-full h-[50%] text-2xl leading-10 text-left'>{friend.name}</p>
                <p className='w-full h-[50%] text-lg leading-10 text-left'>{friend.userId}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-[70%] h-full'>
        <div ref={messageContainerRef} className='bg-[color:var(--light-secondary)] w-full h-[calc(100%-40px)] overflow-y-auto'>
          {messages.map(message => (
            <MessageContent key={message.messageId} id={Number(session.user.id)} message={message} />
          ))}
        </div>
        {
          friendId === undefined
          ? <div className='bg-[color:var(--light-secondary)] w-full h-10'></div>
          : <SendMessage senderId={Number(session.user.id)} receiverId={friendId} />
        }
      </div>
    </div>
  );
}
