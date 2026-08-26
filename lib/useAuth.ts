import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return {
    name,
    setName,
    email,
    setEmail,
    language,
    setLanguage,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    error,
    setError,
    router
  };
};

export default useAuth;
