'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

type LoadingContext = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
};

export const LoadingContext = createContext<LoadingContext | undefined>(undefined);

export function LoadingProviderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
