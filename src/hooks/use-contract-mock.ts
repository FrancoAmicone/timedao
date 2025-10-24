"use client";

import { useState } from "react";
import { Contract, Seller } from "@/types/marketplace";
import { 
  mockContracts, 
  mockSellers,
  getContractById, 
  getContractsBySeller, 
  getContractsByBuyer,
  getSellerById,
} from "@/lib/mock-data";
import { sleep } from "@/lib/utils";
import { useWalletMock } from "./use-wallet-mock";

/**
 * Contract Hook (Mock)
 * Simulates contract operations with delays
 */
export function useContractMock() {
  const { isConnected, address, sendTransaction } = useWalletMock();
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  
  /**
   * Create a new contract
   */
  const createContract = async (data: {
    seller: string;
    title: string;
    description: string;
    hours: number;
    hourlyRate: number;
  }) => {
    if (!isConnected || !address) {
      throw new Error("Wallet not connected");
    }
    
    const totalAmount = data.hours * data.hourlyRate;
    
    // Send transaction
    const tx = await sendTransaction(data.seller, totalAmount);
    
    // Simulate contract creation delay
    await sleep(1000);
    
    const seller = getSellerById(data.seller);
    
    const newContract: Contract = {
      id: `c${contracts.length + 1}`,
      buyer: address,
      seller: data.seller,
      sellerName: seller?.name,
      title: data.title,
      description: data.description,
      hours: data.hours,
      hourlyRate: data.hourlyRate,
      totalAmount,
      status: "pending",
      createdAt: new Date(),
    };
    
    setContracts([...contracts, newContract]);
    
    return {
      contract: newContract,
      transaction: tx,
    };
  };
  
  /**
   * Accept a contract (seller action)
   */
  const acceptContract = async (contractId: string) => {
    if (!isConnected) {
      throw new Error("Wallet not connected");
    }
    
    await sleep(1500);
    
    setContracts(
      contracts.map((c) =>
        c.id === contractId
          ? { ...c, status: "active" as const, startedAt: new Date() }
          : c
      )
    );
  };
  
  /**
   * Complete a contract (seller action)
   */
  const completeContract = async (contractId: string, workProof: string) => {
    if (!isConnected) {
      throw new Error("Wallet not connected");
    }
    
    await sleep(1500);
    
    setContracts(
      contracts.map((c) =>
        c.id === contractId
          ? { 
              ...c, 
              status: "completed" as const, 
              completedAt: new Date(),
              workProof,
            }
          : c
      )
    );
  };
  
  /**
   * Confirm a contract (buyer action)
   * Mints NFT and releases payment
   */
  const confirmContract = async (
    contractId: string, 
    rating: number, 
    feedback: string
  ) => {
    if (!isConnected) {
      throw new Error("Wallet not connected");
    }
    
    await sleep(2000); // Simulate NFT minting
    
    const tokenId = 1000 + Math.floor(Math.random() * 9000);
    
    setContracts(
      contracts.map((c) =>
        c.id === contractId
          ? {
              ...c,
              status: "confirmed" as const,
              confirmedAt: new Date(),
              tokenId,
              buyerRating: rating,
              buyerFeedback: feedback,
            }
          : c
      )
    );
    
    return { tokenId };
  };
  
  /**
   * Cancel a contract
   */
  const cancelContract = async (contractId: string) => {
    if (!isConnected) {
      throw new Error("Wallet not connected");
    }
    
    await sleep(1000);
    
    setContracts(
      contracts.map((c) =>
        c.id === contractId
          ? { ...c, status: "cancelled" as const }
          : c
      )
    );
  };
  
  /**
   * Register as seller
   */
  const registerSeller = async (data: {
    name: string;
    bio: string;
    hourlyRate: number;
    skills: string[];
  }) => {
    if (!isConnected || !address) {
      throw new Error("Wallet not connected");
    }
    
    await sleep(1500);
    
    const newSeller: Seller = {
      id: `${sellers.length + 1}`,
      address,
      name: data.name,
      bio: data.bio,
      hourlyRate: data.hourlyRate,
      skills: data.skills,
      rating: 0,
      totalContracts: 0,
      completedContracts: 0,
      joinedAt: new Date(),
      verified: false,
      availability: "available",
    };
    
    setSellers([...sellers, newSeller]);
    
    return newSeller;
  };
  
  /**
   * Get contracts for current user
   */
  const getMyContracts = () => {
    if (!address) return [];
    
    return contracts.filter(
      (c) =>
        c.buyer.toLowerCase() === address.toLowerCase() ||
        c.seller.toLowerCase() === address.toLowerCase()
    );
  };
  
  /**
   * Get contracts as buyer
   */
  const getMyBuyerContracts = () => {
    if (!address) return [];
    return getContractsByBuyer(address);
  };
  
  /**
   * Get contracts as seller
   */
  const getMySellerContracts = () => {
    if (!address) return [];
    return getContractsBySeller(address);
  };
  
  /**
   * Check if current user is a seller
   */
  const isSeller = () => {
    if (!address) return false;
    return sellers.some((s) => s.address.toLowerCase() === address.toLowerCase());
  };
  
  /**
   * Get seller profile for current user
   */
  const getMySellerProfile = () => {
    if (!address) return null;
    return sellers.find((s) => s.address.toLowerCase() === address.toLowerCase());
  };
  
  return {
    // State
    contracts,
    sellers,
    
    // Contract actions
    createContract,
    acceptContract,
    completeContract,
    confirmContract,
    cancelContract,
    
    // Seller actions
    registerSeller,
    
    // Queries
    getContractById,
    getMyContracts,
    getMyBuyerContracts,
    getMySellerContracts,
    isSeller,
    getMySellerProfile,
  };
}

