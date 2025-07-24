"use client";

import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, WalletIcon, LogOut, AlertTriangle } from 'lucide-react';

export function WalletConnect() {
  const {
    isConnected,
    isConnecting,
    publicKey,
    error,
    walletType,
    connectWallet,
    disconnectWallet,
    clearError,
  } = useWallet();

  if (error) {
    return (
      <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-700">{error}</span>
        <button
          onClick={clearError}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          ×
        </button>
      </div>
    );
  }

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="border-green-200 text-green-600">
          <WalletIcon className="h-3 w-3 mr-1" />
          {walletType === 'freighter' ? 'Freighter' : walletType} • {publicKey.substring(0, 8)}...{publicKey.substring(-4)}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-rose-300 hover:bg-rose-400 text-gray-800 border-0"
    >
      {isConnecting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-800 mr-2"></div>
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </>
      )}
    </Button>
  );
}