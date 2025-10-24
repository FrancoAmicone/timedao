import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_WALLET } from "@/lib/constants";

/**
 * Wallet Store
 * Global state management for wallet connection (mock)
 */

interface WalletState {
  // State
  isConnected: boolean;
  address: string | null;
  balance: number; // in ETH
  chainId: number;
  chainName: string;
  
  // Actions
  connect: () => void;
  disconnect: () => void;
  updateBalance: (balance: number) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      // Initial state
      isConnected: false,
      address: null,
      balance: 0,
      chainId: MOCK_WALLET.chainId,
      chainName: MOCK_WALLET.chainName,
      
      // Actions
      connect: () => {
        set({
          isConnected: true,
          address: MOCK_WALLET.defaultAddress,
          balance: MOCK_WALLET.defaultBalance,
        });
      },
      
      disconnect: () => {
        set({
          isConnected: false,
          address: null,
          balance: 0,
        });
      },
      
      updateBalance: (balance: number) => {
        set({ balance });
      },
    }),
    {
      name: "timedao-wallet-storage", // localStorage key
      partialize: (state) => ({
        isConnected: state.isConnected,
        address: state.address,
        balance: state.balance,
      }),
    }
  )
);

