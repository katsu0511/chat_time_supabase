import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [name, setName] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return {
    name,
    setName,
    userid,
    setUserid,
    password,
    setPassword,
    error,
    setError,
    router
  };
};

export default useAuth;
