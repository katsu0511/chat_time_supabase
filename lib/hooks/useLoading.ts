'use client';

import { useContext } from 'react';
import { LoadingContext } from '@/components/Templates/LoadingProviderWrapper';

export default function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within LoadingProviderWrapper');
  }

  return context;
}
