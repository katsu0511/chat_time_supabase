'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/infrastructure/supabaseBrowser';
import FriendList from '@/components/Organisms/FriendList';
import MessageContent from '@/components/Molecules/MessageContent';
import SendMessage from '@/components/Molecules/SendMessage';

export default function Messages({user, friends}: {user: AppUser, friends: AppUser[]}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [friendId, setFriendId] = useState<string>();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const friendIdRef = useRef<string>(friendId);

  useEffect(() => {
    friendIdRef.current = friendId;
  }, [friendId]);

  const getMessages = useCallback(async (friendId: string) => {
    setFriendId(friendId);
    const res = await fetch(`/api/getMessages?friendId=${friendId}`);
    if (!res.ok) {
      setMessages([]);
      return;
    }
    const contents: Message[] = await res.json();
    setMessages(contents);
  }, []);

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
          const isTranslated: boolean = newMessage.is_translated;

          if (
            senderId === myId && receiverId === friendIdRef.current && !isTranslated ||
            senderId === friendIdRef.current && receiverId === myId && isTranslated
          ) {
            const message: Message = {
              messageId: newMessage.message_id,
              senderId,
              receiverId,
              content: newMessage.content,
              isTranslated,
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
  }, [user]);

  return (
    <div className='flex w-full h-full md:border-[color:var(--color-primary)] md:border-x-4'>
      <FriendList friends={friends} currentFriendId={friendId} getMessages={getMessages} />
      <div className='w-[70%] h-full'>
        <div ref={messageContainerRef} className='bg-[color:var(--light-secondary)] w-full h-[calc(100%-40px)] overflow-y-auto'>
          {messages.map(message => (
            <MessageContent key={message.messageId} userId={user.id} message={message} />
          ))}
        </div>
        {
          friendId === undefined
          ? <div className='bg-[color:var(--light-secondary)] w-full h-10'></div>
          : <SendMessage receiverId={friendId} />
        }
      </div>
    </div>
  );
}
