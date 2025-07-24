"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Networks } from '@stellar/stellar-sdk';

// Freighter API types
interface FreighterApi {
  isConnected(): Promise<boolean>;
  isAllowed(): Promise<boolean>;
  setAllowed(): Promise<void>;
  getPublicKey(): Promise<string>;
  signTransaction(transaction: string, options?: { networkPassphrase?: string }): Promise<string>;
  getNetwork(): Promise<string>;
}

declare global {
  interface Window {
    freighter?: FreighterApi;
  }
}

interface WalletContextType {
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  walletType: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  signTransaction: (transaction: string) => Promise<string>;
  clearError: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);

  // Check for previously connected wallet on mount
  useEffect(() => {
    const savedPublicKey = localStorage.getItem('stellar-public-key');
    const savedWalletType = localStorage.getItem('stellar-wallet-type');
    
    if (savedPublicKey && savedWalletType) {
      // Verify the wallet is still connected
      verifyWalletConnection(savedWalletType, savedPublicKey);
    }
  }, []);

  const verifyWalletConnection = async (type: string, savedKey: string) => {
    try {
      if (type === 'freighter' && window.freighter) {
        const isConnected = await window.freighter.isConnected();
        const isAllowed = await window.freighter.isAllowed();
        
        if (isConnected && isAllowed) {
          const currentKey = await window.freighter.getPublicKey();
          if (currentKey === savedKey) {
            setPublicKey(savedKey);
            setWalletType(type);
            setIsConnected(true);
            return;
          }
        }
      }
      
      // If verification fails, clear saved data
      localStorage.removeItem('stellar-public-key');
      localStorage.removeItem('stellar-wallet-type');
    } catch (err) {
      console.error('Failed to verify wallet connection:', err);
      localStorage.removeItem('stellar-public-key');
      localStorage.removeItem('stellar-wallet-type');
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Try Freighter first (most popular Stellar wallet)
      if (window.freighter) {
        await connectFreighter();
      } else {
        // Check for other wallet extensions
        throw new Error('No Stellar wallet found. Please install Freighter wallet extension from https://freighter.app/');
      }
    } catch (err: any) {
      console.error('Failed to connect wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectFreighter = async () => {
    if (!window.freighter) {
      throw new Error('Freighter wallet not found');
    }

    // Check if user has granted permission
    const isAllowed = await window.freighter.isAllowed();
    if (!isAllowed) {
      // Request permission
      await window.freighter.setAllowed();
    }

    // Get the public key
    const publicKey = await window.freighter.getPublicKey();
    
    setPublicKey(publicKey);
    setWalletType('freighter');
    setIsConnected(true);
    
    // Save connection info
    localStorage.setItem('stellar-public-key', publicKey);
    localStorage.setItem('stellar-wallet-type', 'freighter');
    
    console.log('Freighter wallet connected:', publicKey);
  };

  const disconnectWallet = async () => {
    setPublicKey(null);
    setWalletType(null);
    setIsConnected(false);
    
    // Clear saved connection info
    localStorage.removeItem('stellar-public-key');
    localStorage.removeItem('stellar-wallet-type');
  };

  const signTransaction = async (transaction: string): Promise<string> => {
    if (!isConnected || !publicKey) {
      throw new Error('No wallet connected');
    }

    try {
      if (walletType === 'freighter' && window.freighter) {
        const result = await window.freighter.signTransaction(transaction, {
          networkPassphrase: Networks.TESTNET // Change to Networks.PUBLIC for mainnet
        });
        return result;
      } else {
        throw new Error(`Wallet type ${walletType} not supported for signing`);
      }
    } catch (err: any) {
      console.error('Failed to sign transaction:', err);
      throw new Error(err.message || 'Failed to sign transaction');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: WalletContextType = {
    publicKey,
    isConnected,
    isConnecting,
    error,
    walletType,
    connectWallet,
    disconnectWallet,
    signTransaction,
    clearError,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}