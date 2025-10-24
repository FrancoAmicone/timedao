import { Seller, Contract, MarketplaceStats } from "@/types/marketplace";

/**
 * Mock Data for TimeDAO
 * Realistic sample data for development and demos
 */

// ============================================
// MOCK SELLERS
// ============================================

export const mockSellers: Seller[] = [
  {
    id: "1",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    name: "Alice Chen",
    avatar: "👩‍💻",
    bio: "Full-stack developer with 8+ years experience in Web3. Specialized in smart contracts and dApp development.",
    hourlyRate: 0.08,
    skills: ["Solidity", "React", "TypeScript", "Web3.js"],
    rating: 4.9,
    totalContracts: 47,
    completedContracts: 45,
    joinedAt: new Date("2024-01-15"),
    verified: true,
    availability: "available",
  },
  {
    id: "2",
    address: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    name: "Bob Martinez",
    avatar: "👨‍🎨",
    bio: "UI/UX designer focused on Web3 interfaces. Creating beautiful and intuitive blockchain experiences.",
    hourlyRate: 0.05,
    skills: ["UI Design", "Figma", "Web3 UX", "Branding"],
    rating: 4.7,
    totalContracts: 32,
    completedContracts: 30,
    joinedAt: new Date("2024-02-20"),
    verified: true,
    availability: "busy",
  },
  {
    id: "3",
    address: "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    name: "Carol Kim",
    avatar: "👩‍🔬",
    bio: "Smart contract auditor and security researcher. Ensuring your contracts are secure and gas-optimized.",
    hourlyRate: 0.12,
    skills: ["Security Audit", "Solidity", "Gas Optimization", "Testing"],
    rating: 5.0,
    totalContracts: 23,
    completedContracts: 23,
    joinedAt: new Date("2023-11-10"),
    verified: true,
    availability: "available",
  },
  {
    id: "4",
    address: "0x9876543210AbCdEf1234567890AbCdEf12345678",
    name: "David Park",
    avatar: "👨‍💼",
    bio: "Blockchain consultant and tokenomics expert. Helping projects design sustainable token economies.",
    hourlyRate: 0.10,
    skills: ["Tokenomics", "DeFi", "Strategy", "Economics"],
    rating: 4.8,
    totalContracts: 18,
    completedContracts: 17,
    joinedAt: new Date("2024-03-05"),
    verified: true,
    availability: "available",
  },
  {
    id: "5",
    address: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
    name: "Emma Wilson",
    avatar: "👩‍🚀",
    bio: "Community manager with passion for Web3. Building engaged communities around blockchain projects.",
    hourlyRate: 0.04,
    skills: ["Community", "Social Media", "Discord", "Marketing"],
    rating: 4.6,
    totalContracts: 41,
    completedContracts: 39,
    joinedAt: new Date("2024-01-28"),
    verified: false,
    availability: "available",
  },
  {
    id: "6",
    address: "0x1234567890AbCdEf1234567890AbCdEf12345679",
    name: "Frank Zhang",
    avatar: "👨‍🏫",
    bio: "Technical writer and educator. Creating clear documentation and tutorials for blockchain developers.",
    hourlyRate: 0.06,
    skills: ["Technical Writing", "Documentation", "Education", "Content"],
    rating: 4.9,
    totalContracts: 28,
    completedContracts: 28,
    joinedAt: new Date("2023-12-12"),
    verified: true,
    availability: "unavailable",
  },
  {
    id: "7",
    address: "0xFeDcBa0987654321FeDcBa0987654321FeDcBa09",
    name: "Grace Lee",
    avatar: "👩‍⚖️",
    bio: "Legal advisor specializing in crypto regulations and compliance. Navigating the legal landscape of Web3.",
    hourlyRate: 0.15,
    skills: ["Legal", "Compliance", "Regulations", "Contracts"],
    rating: 4.8,
    totalContracts: 12,
    completedContracts: 12,
    joinedAt: new Date("2024-04-01"),
    verified: true,
    availability: "busy",
  },
  {
    id: "8",
    address: "0x0123456789AbCdEf0123456789AbCdEf01234567",
    name: "Henry Tanaka",
    avatar: "👨‍🔧",
    bio: "DevOps engineer with blockchain infrastructure expertise. Building scalable Web3 applications.",
    hourlyRate: 0.09,
    skills: ["DevOps", "AWS", "Kubernetes", "Infrastructure"],
    rating: 4.7,
    totalContracts: 15,
    completedContracts: 14,
    joinedAt: new Date("2024-02-14"),
    verified: true,
    availability: "available",
  },
];

// ============================================
// MOCK CONTRACTS
// ============================================

export const mockContracts: Contract[] = [
  {
    id: "c1",
    tokenId: 1001,
    buyer: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    seller: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    sellerName: "Bob Martinez",
    title: "Landing Page Design for DeFi Protocol",
    description: "Design a modern, user-friendly landing page for our new DeFi protocol. Should include hero section, features, and call-to-action.",
    hours: 40,
    hourlyRate: 0.05,
    totalAmount: 2.0,
    status: "confirmed",
    createdAt: new Date("2024-10-01"),
    startedAt: new Date("2024-10-02"),
    completedAt: new Date("2024-10-15"),
    confirmedAt: new Date("2024-10-16"),
    workProof: "Delivered full Figma designs with responsive layouts for mobile and desktop.",
    buyerFeedback: "Excellent work! Very professional and responsive to feedback.",
    buyerRating: 5,
  },
  {
    id: "c2",
    buyer: "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    sellerName: "Alice Chen",
    title: "Smart Contract Development for NFT Marketplace",
    description: "Develop ERC-721 compliant smart contracts for an NFT marketplace with royalty support.",
    hours: 80,
    hourlyRate: 0.08,
    totalAmount: 6.4,
    status: "active",
    createdAt: new Date("2024-10-10"),
    startedAt: new Date("2024-10-11"),
  },
  {
    id: "c3",
    buyer: "0x9876543210AbCdEf1234567890AbCdEf12345678",
    seller: "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
    sellerName: "Carol Kim",
    title: "Security Audit for DEX Protocol",
    description: "Comprehensive security audit of our decentralized exchange smart contracts.",
    hours: 60,
    hourlyRate: 0.12,
    totalAmount: 7.2,
    status: "completed",
    createdAt: new Date("2024-10-05"),
    startedAt: new Date("2024-10-06"),
    completedAt: new Date("2024-10-20"),
    workProof: "Full audit report with 15 findings, including 2 critical and 5 high severity issues. All issues have been addressed.",
  },
  {
    id: "c4",
    buyer: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
    seller: "0x9876543210AbCdEf1234567890AbCdEf12345678",
    sellerName: "David Park",
    title: "Tokenomics Design for GameFi Project",
    description: "Design sustainable tokenomics model for our play-to-earn gaming platform.",
    hours: 30,
    hourlyRate: 0.10,
    totalAmount: 3.0,
    status: "pending",
    createdAt: new Date("2024-10-22"),
  },
  {
    id: "c5",
    tokenId: 1002,
    buyer: "0x1234567890AbCdEf1234567890AbCdEf12345679",
    seller: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
    sellerName: "Emma Wilson",
    title: "Community Management - 3 Months",
    description: "Manage Discord and Twitter communities, engage with users, and organize events.",
    hours: 120,
    hourlyRate: 0.04,
    totalAmount: 4.8,
    status: "confirmed",
    createdAt: new Date("2024-07-01"),
    startedAt: new Date("2024-07-02"),
    completedAt: new Date("2024-09-30"),
    confirmedAt: new Date("2024-10-01"),
    workProof: "Successfully grew Discord from 500 to 2,500 members. Twitter engagement up 300%.",
    buyerFeedback: "Amazing community builder! Highly recommended.",
    buyerRating: 5,
  },
];

// ============================================
// MOCK STATS
// ============================================

export const mockMarketplaceStats: MarketplaceStats = {
  totalSellers: mockSellers.length,
  totalContracts: mockContracts.length,
  totalVolume: mockContracts.reduce((sum, c) => sum + c.totalAmount, 0),
  averageRate: mockSellers.reduce((sum, s) => sum + s.hourlyRate, 0) / mockSellers.length,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getSellerById(id: string): Seller | undefined {
  return mockSellers.find(s => s.id === id);
}

export function getSellerByAddress(address: string): Seller | undefined {
  return mockSellers.find(s => s.address.toLowerCase() === address.toLowerCase());
}

export function getContractById(id: string): Contract | undefined {
  return mockContracts.find(c => c.id === id);
}

export function getContractsBySeller(sellerAddress: string): Contract[] {
  return mockContracts.filter(c => c.seller.toLowerCase() === sellerAddress.toLowerCase());
}

export function getContractsByBuyer(buyerAddress: string): Contract[] {
  return mockContracts.filter(c => c.buyer.toLowerCase() === buyerAddress.toLowerCase());
}

// All available skills (extracted from sellers)
export const allSkills = Array.from(
  new Set(mockSellers.flatMap(s => s.skills))
).sort();

