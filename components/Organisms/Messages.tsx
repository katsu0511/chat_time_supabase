'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/infrastructure/supabaseBrowser';
import FriendList from '@/components/Organisms/FriendList';
import ChatScreen from '@/components/Organisms/ChatScreen';

export default function Messages({user, friends}: {user: AppUser, friends: AppUser[]}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [friendId, setFriendId] = useState<string | undefined>();
  const [friendName, setFriendName] = useState<string | undefined>();
  const friendIdRef = useRef<string>(friendId);

  const getMessages = useCallback(async (friendId: string, friendName: string) => {
    setFriendId(friendId);
    setFriendName(friendName);
    const res = await fetch(`/api/getMessages?friendId=${friendId}`);
    if (!res.ok) {
      setMessages([]);
      return;
    }
    const contents: Message[] = await res.json();
    setMessages(contents);
  }, []);

  const backToFriendList = () => {
    setMessages([]);
    setFriendId(undefined);
    setFriendName(undefined);
  };

  useEffect(() => {
    friendIdRef.current = friendId;
  }, [friendId]);

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
    <div className='block w-full h-full md:flex md:border-[color:var(--color-primary)] md:border-x-4'>
      <FriendList friends={friends} currentFriendId={friendId} getMessages={getMessages} />
      <ChatScreen user={user} friendId={friendId} friendName={friendName} messages={messages} onBackToFriendList={backToFriendList} />
    </div>
  );
}
