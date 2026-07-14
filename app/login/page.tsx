// import { getAuthSession } from '@/lib/getSession';
// import { redirect } from 'next/navigation';
import LoginForm from '@/components/Organisms/LoginForm';

export default async function Login() {
  // const session = await getAuthSession();
  // if (session) return redirect('/');
  return <LoginForm />;
}
