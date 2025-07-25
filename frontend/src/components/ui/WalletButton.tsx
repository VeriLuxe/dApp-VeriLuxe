'use client';

import { useWalletStore } from '@/stores/walletStore';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

export function WalletButton() {
  const { loggedIn, address, connecting, connect, disconnect } = useWalletStore();

  const handleClick = () => {
    if (loggedIn) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Button onClick={handleClick} disabled={connecting} className="bg-rose-300 hover:bg-rose-400 text-gray-800 border-0">
      {connecting ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : loggedIn ? (
        <LogOut className="h-4 w-4 mr-2" />
      ) : (
        <Wallet className="h-4 w-4 mr-2" />
      )}
      {loggedIn ? `${address?.slice(0, 4)}...` : 'Connect Wallet'}
    </Button>
  );
}
