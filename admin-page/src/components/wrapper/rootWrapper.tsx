'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cookies } from 'next/headers'

export function RootWrapper({ children, ...props }: any) {
  const router = useRouter();

  useEffect(() => {
    if (!cookies().get('bsc_at')) {
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
}
