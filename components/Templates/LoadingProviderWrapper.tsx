'use client';

import { Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type LoadingContext = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
};

export const LoadingContext = createContext<LoadingContext | undefined>(undefined);

export function LoadingProviderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    // pathname changed, so navigation has completed
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
