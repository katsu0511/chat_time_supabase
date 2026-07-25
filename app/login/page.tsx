import { auth } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/Organisms/LoginForm';

export default async function Login() {
  const session = await auth();
  if (session) return redirect('/');
  return <LoginForm />;
}
