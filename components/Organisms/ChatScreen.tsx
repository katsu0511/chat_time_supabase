'use client';

import { useRef, useEffect } from 'react';
import MessageContent from '@/components/Molecules/MessageContent';
import SendMessage from '@/components/Molecules/SendMessage';

export default function ChatScreen({ user, friendId, messages }: { user: AppUser, friendId: string | undefined, messages: Message[] }) {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'auto'
    });
  }, [messages]);

  return (
    <div className='w-full h-full md:w-[70%]'>
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
  );
}
