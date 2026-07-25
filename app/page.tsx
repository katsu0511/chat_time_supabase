import { auth } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import Messages from '@/components/Organisms/Messages';

export default async function Home() {
  const session = await auth();
  if (!session) return redirect('/login');
  return <Messages session={session} />;
}
