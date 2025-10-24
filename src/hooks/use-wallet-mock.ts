"use client";

import { useWalletStore } from "@/store/wallet-store";
import { sleep } from "@/lib/utils";

/**
 * Wallet Hook (Mock)
 * Simulates wallet connection with delays
 */
export function useWalletMock() {
  const { isConnected, address, balance, connect, disconnect, updateBalance } =
    useWalletStore();
  
  /**
   * Connect wallet (with simulated delay)
   */
  const connectWallet = async () => {
    await sleep(800); // Simulate wallet popup delay
    connect();
  };
  
  /**
   * Disconnect wallet
   */
  const disconnectWallet = () => {
    disconnect();
  };
  
  /**
   * Send transaction (mock)
   */
  const sendTransaction = async (to: string, amount: number) => {
    if (!isConnected) {
      throw new Error("Wallet not connected");
    }
    
    if (balance < amount) {
      throw new Error("Insufficient balance");
    }
    
    // Simulate transaction delay
    await sleep(2000);
    
    // Update balance
    updateBalance(balance - amount);
    
    // Return mock transaction hash
    return {
      hash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
      from: address,
      to,
      value: amount,
    };
  };
  
  /**
   * Get balance (mock)
   */
  const refreshBalance = async () => {
    if (!isConnected) return 0;
    
    await sleep(500);
    
    // Simulate small balance changes
    const newBalance = balance + (Math.random() - 0.5) * 0.1;
    updateBalance(Math.max(0, newBalance));
    
    return newBalance;
  };
  
  return {
    // State
    isConnected,
    address,
    balance,
    
    // Actions
    connectWallet,
    disconnectWallet,
    sendTransaction,
    refreshBalance,
  };
}

