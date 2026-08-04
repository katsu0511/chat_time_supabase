import { auth } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getFriends } from '@/lib/getter';
import Messages from '@/components/Organisms/Messages';

export default async function Home() {
  const session = await auth();
  if (!session) return redirect('/login');
  const id = Number(session.user.id);
  if (isNaN(id)) return NextResponse.json({ error: 'ID must be a number' }, { status: 400 });
  const friends = await getFriends(id);
  return <Messages session={session} friends={friends} />;
}
