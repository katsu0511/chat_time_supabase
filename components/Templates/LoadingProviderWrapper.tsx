'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

type LoadingContext = {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  sendingState: boolean
  setSendingState: Dispatch<SetStateAction<boolean>>
  errorMessage: string
  setErrorMessage: Dispatch<SetStateAction<string>>
  displayErrorModal: boolean
  setDisplayErrorModal: Dispatch<SetStateAction<boolean>>
};

export const LoadingContext = createContext<LoadingContext | undefined>(undefined);

export function LoadingProviderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [sendingState, setSendingState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [displayErrorModal, setDisplayErrorModal] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading, sendingState, setSendingState, errorMessage, setErrorMessage, displayErrorModal, setDisplayErrorModal }}>
      {children}
    </LoadingContext.Provider>
  );
}
