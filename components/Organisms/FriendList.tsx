'use client';

export default function FriendList({ friends, currentFriendId, getMessages }: { friends: AppUser[], currentFriendId: string | undefined, getMessages: (friendId: string) => void }) {
  return (
    <div className='w-[30%] h-full'>
      <ul>
        {friends.map(friend => (
          <li key={friend.id} className='w-full h-24'>
            <button
              className={`w-full h-full p-2 cursor-pointer duration-300 ${currentFriendId === friend.id && 'bg-[color:var(--color-secondary)] shadow-xl'} hover:bg-[color:var(--color-secondary)] hover:shadow-xl`}
              onClick={() => getMessages(friend.id)}
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
