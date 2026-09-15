import MessageDate from '@/components/Atoms/MessageDate';
import MessageContent from '@/components/Molecules/MessageContent';

type Props = {
  userId: string
  messages: Message[]
  createdAt: Date
};

export default function MessageGroup({ userId, messages, createdAt }: Props) {
  return (
    <div>
      <MessageDate createdAt={createdAt} />
      {messages.map((message) => (
        <MessageContent key={message.messageId} userId={userId} message={message} />
      ))}
    </div>
  );
}
