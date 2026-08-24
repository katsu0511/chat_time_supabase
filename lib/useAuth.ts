import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    router
  };
};

export default useAuth;
