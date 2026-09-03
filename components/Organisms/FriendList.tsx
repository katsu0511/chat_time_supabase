'use client';

export default function FriendList({ friends, currentFriendId, getMessages }: { friends: AppUser[], currentFriendId: string | undefined, getMessages: (friendId: string, friendName: string) => void }) {
  const displayFriendList = currentFriendId && 'hidden';

  return (
    <div className={`${displayFriendList} w-full h-full md:block md:w-[30%]`}>
      <ul className='w-full h-[calc(100dvh-80px)] overflow-x-hidden overflow-y-scroll'>
        {friends.map(friend => (
          <li key={friend.id} className='w-full h-24 border-[color:var(--color-secondary)] border-b-1'>
            <button
              className={`w-full h-full p-2 cursor-pointer duration-300 ${currentFriendId === friend.id && 'bg-[color:var(--color-secondary)] shadow-xl'} hover:bg-[color:var(--color-secondary)] hover:shadow-xl`}
              onClick={() => getMessages(friend.id, friend.name)}
            >
              <p className='w-full h-[50%] text-2xl leading-10 text-left'>{friend.name}</p>
              <p className='w-full h-[50%] text-lg leading-10 text-left'>{friend.email}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
