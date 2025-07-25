'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWalletStore } from '@/stores/walletStore';
import { FashionAuthDApp } from '@/components/modules/dapp/FashionAuthDApp';

export default function Dashboard() {
  const router = useRouter();
  const { loggedIn } = useWalletStore();

  useEffect(() => {
    if (!loggedIn) {
      router.replace('/');
    }
  }, [loggedIn, router]);

  if (!loggedIn) {
    return null;
  }

  return <FashionAuthDApp />;
}
