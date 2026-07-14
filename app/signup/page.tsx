// import { getAuthSession } from '@/lib/getSession';
// import { redirect } from 'next/navigation';
import SignupForm from '@/components/SignupForm';

export default async function Signup() {
  // const session = await getAuthSession();
  // if (session) return redirect('/');
  return <SignupForm />;
}
