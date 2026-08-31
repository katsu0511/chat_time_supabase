import { useState } from 'react';
import { Language } from '@/lib/domain/languages';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [language, setLanguage] = useState<Language>('en');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
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
