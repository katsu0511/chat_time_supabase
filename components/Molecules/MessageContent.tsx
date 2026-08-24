import dayjs from 'dayjs';

export default function MessageContent({ userId, message }: { userId: string, message: Message }) {
  const justify = userId === message.senderId ? 'justify-end' : 'justify-start';
  const order = userId === message.senderId ? 'order-0 text-right' : 'order-2 text-left';
  const datetime = dayjs(message.createdAt).format('YYYY/MM/DD HH:mm');
  const speechBubble1 = userId === message.senderId ? 'right-2 bg-[color:var(--color-primary)] rounded-[0_0_100%_0]' : 'left-2 bg-[color:var(--color-background)] rounded-[0_0_0_100%]';
  const speechBubble2 = userId === message.senderId ? 'right-1' : 'left-1';
  const backGround = userId === message.senderId ? 'bg-[color:var(--color-primary)] mr-3' : 'bg-[color:var(--color-background)] ml-3';
  const color = userId === message.senderId ? 'text-white' : 'text-[color:var(--text-primary)]';

  return (
    <div className={`flex ${justify} items-end relative w-full min-h-12`}>
      <div className={`text-xs text-black ${order} min-h-4 max-h-8 mx-1 mb-3`}>{datetime}</div>
      <div className='order-1 h-full'>
        <span className={`absolute top-3 ${speechBubble1} w-3 h-3 z-1`}></span>
        <span className={`absolute top-[3px] ${speechBubble2} bg-[color:var(--light-secondary)] w-6 h-3 rounded-[50%_/_0_0_100%_100%] z-2`}></span>
        <div className={`relative min-h-6 rounded-xl ${backGround} my-3 px-2 z-3`}>
          <p className={`${color} h-full leading-6 wrap-anywhere`}>{message.content}</p>
        </div>
      </div>
    </div>
  );
}
