import getAuthUser from '@/lib/getAuthUser';
import { redirect } from 'next/navigation';
import SignupForm from '@/components/Organisms/SignupForm';

export default async function Signup() {
  const user = await getAuthUser();
  if (user) return redirect('/');
  return <SignupForm />;
}
