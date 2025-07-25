'use client'

import { create } from 'zustand';
import type { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit';

interface WalletState {
  kit: StellarWalletsKit | null;
  address: string | null;
  loggedIn: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string) => Promise<string>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  kit: null,
  address: null,
  loggedIn: false,
  connecting: false,
  async connect() {
    set({ connecting: true });
    try {
      let kit = get().kit;
      if (!kit) {
        kit = new (require('@creit.tech/stellar-wallets-kit').StellarWalletsKit)();
        set({ kit });
      }
      const wallet: any = await (kit as any).openModalAndConnect();
      if (wallet && wallet.publicKey) {
        set({ address: wallet.publicKey, loggedIn: true });
      }
    } finally {
      set({ connecting: false });
    }
  },
  disconnect() {
    const kit = get().kit as any;
    if (kit && kit.disconnect) {
      kit.disconnect();
    }
    set({ address: null, loggedIn: false });
  },
  async signTransaction(xdr: string) {
    const kit = get().kit as any;
    if (!kit || !get().loggedIn) {
      throw new Error('Wallet not connected');
    }
    return kit.signTransaction(xdr);
  },
}));
