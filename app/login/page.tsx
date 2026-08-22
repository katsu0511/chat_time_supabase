import getAuthUser from '@/lib/getAuthUser';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/Organisms/LoginForm';

export default async function Login() {
  const user = await getAuthUser();
  if (user) {
    redirect('/');
  }
  return <LoginForm />;
}
