'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/infrastructure/supabaseBrowser';
import useLoading from '@/lib/hooks/useLoading';
import FriendList from '@/components/Organisms/FriendList';
import ChatScreen from '@/components/Organisms/ChatScreen';

export default function Messages({ user, friends }: { user: AppUser, friends: AppUser[] }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chattingFriend, setChattingFriend] = useState<AppUser | undefined>();
  const { setLoading } = useLoading();
  const friendRef = useRef<AppUser>(chattingFriend);

  const getMessages = useCallback(async (friend: AppUser) => {
    if (friendRef.current?.id !== friend.id) {
      setMessage('');
    }
    setChattingFriend(friend);

    const res = await fetch(`/api/getMessages?friendId=${friend.id}`);
    if (!res.ok) {
      setMessages([]);
      return;
    }

    const contents: Message[] = await res.json();
    setMessages(contents);
  }, []);

  const backToFriendList = () => {
    setMessages([]);
    setChattingFriend(undefined);
  };

  useEffect(() => {
    friendRef.current = chattingFriend;
  }, [chattingFriend]);

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
            senderId === myId && receiverId === friendRef.current?.id && !isTranslated ||
            senderId === friendRef.current?.id && receiverId === myId && isTranslated
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

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className='block w-full h-full md:flex md:border-[color:var(--color-primary)] md:border-x-4'>
      <FriendList friends={friends} chattingFriend={chattingFriend} getMessages={getMessages} />
      <ChatScreen user={user} friend={chattingFriend} messages={messages} message={message} setMessage={setMessage} onBackToFriendList={backToFriendList} />
    </div>
  );
}
