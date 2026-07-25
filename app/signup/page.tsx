import { auth } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import SignupForm from '@/components/Organisms/SignupForm';

export default async function Signup() {
  const session = await auth();
  if (session) return redirect('/');
  return <SignupForm />;
}
