'use client';

import useLoading from '@/lib/hooks/useLoading';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import MessageContent from '@/components/Molecules/MessageContent';
import { CircularProgress } from '@mui/material';
import SendMessage from '@/components/Molecules/SendMessage';

type Props = {
  user: AppUser
  friend: AppUser | undefined
  messages: Message[]
  onBackToFriendList: () => void
};

export default function ChatScreen({ user, friend, messages, onBackToFriendList }: Props) {
  const { loading, setLoading } = useLoading();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const displayChatScreen = friend?.id === undefined ? 'hidden' : 'block';
  const heightOfMessageContent = window.innerWidth < 768 ? 'h-[calc(100dvh-160px)] min-h-[calc(100dvh-160px)]' : 'h-[calc(100dvh-120px)] min-h-[calc(100dvh-120px)]';

  useEffect(() => {
    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'auto'
    });
  }, [messages, loading]);

  return (
    <div className={`${displayChatScreen} w-full h-full md:block md:w-[70%]`}>
      <div className='flex items-center bg-[color:var(--light-secondary)] w-full h-10 px-2 md:hidden'>
        <Image
          className='cursor-pointer duration-300 hover:opacity-60'
          onClick={() => onBackToFriendList()}
          src='/left-arrow.png'
          width={26}
          height={26}
          alt='Back'
        />
        <span className='text-xl font-bold pl-4'>{friend?.name}</span>
      </div>
      <div ref={messageContainerRef} className={`bg-[color:var(--light-secondary)] w-full ${heightOfMessageContent} overflow-y-auto`}>
        {messages.map(message => (
          <MessageContent key={message.messageId} userId={user.id} message={message} />
        ))}
        {
          loading &&
          <div className='flex justify-end items-center gap-[10px] pr-5 pb-2'>
            <span className='animate-pulse'>Sending...</span>
            <CircularProgress size={24} />
          </div>
        }
      </div>
      {
        friend?.id === undefined
        ? <div className='bg-[color:var(--light-secondary)] w-full h-10'></div>
        : <SendMessage receiverId={friend.id} loading={loading} setLoading={setLoading} />
      }
    </div>
  );
}
