/**
 * Marketplace Types
 * TypeScript interfaces for Time Marketplace
 */

// ============================================
// SELLER
// ============================================

export interface Seller {
  id: string;
  address: string;
  name: string;
  avatar?: string;
  bio: string;
  hourlyRate: number; // in ETH
  skills: string[];
  rating: number; // 0-5
  totalContracts: number;
  completedContracts: number;
  joinedAt: Date;
  verified: boolean;
  availability: "available" | "busy" | "unavailable";
}

// ============================================
// CONTRACT
// ============================================

export type ContractStatus = 
  | "pending"      // Created, waiting for acceptance
  | "active"       // Accepted, work in progress
  | "completed"    // Work done, waiting for buyer confirmation
  | "confirmed"    // Buyer confirmed, NFT minted
  | "disputed"     // Dispute raised
  | "cancelled";   // Cancelled

export interface Contract {
  id: string;
  tokenId?: number; // NFT token ID (only if confirmed)
  
  // Parties
  buyer: string;
  seller: string;
  sellerName?: string;
  
  // Details
  title: string;
  description: string;
  hours: number;
  hourlyRate: number; // in ETH
  totalAmount: number; // hours * hourlyRate
  
  // Status
  status: ContractStatus;
  
  // Timestamps
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  confirmedAt?: Date;
  
  // Work proof
  workProof?: string; // IPFS hash or description
  buyerFeedback?: string;
  buyerRating?: number; // 1-5
}

// ============================================
// FILTERS
// ============================================

export interface MarketplaceFilters {
  search: string;
  skills: string[];
  minRate?: number;
  maxRate?: number;
  availability?: Seller["availability"];
  verified?: boolean;
  sortBy: "rating" | "rate" | "contracts" | "recent";
}

// ============================================
// STATS
// ============================================

export interface MarketplaceStats {
  totalSellers: number;
  totalContracts: number;
  totalVolume: number; // in ETH
  averageRate: number; // in ETH
}

