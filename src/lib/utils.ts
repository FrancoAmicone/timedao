import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Uses clsx to handle conditional classes and tailwind-merge to resolve conflicts
 * 
 * @example
 * cn("bg-red-500", "bg-blue-500") // "bg-blue-500" (last one wins)
 * cn("px-4", condition && "px-8") // "px-8" if condition is true
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Ethereum address for display
 * Adaptable based on screen size
 * 
 * @param address - Full Ethereum address
 * @param isMobile - Whether to format for mobile (shorter)
 * @returns Formatted address
 * 
 * @example
 * formatAddress("0x1234567890abcdef", true)  // "0x12...ef"
 * formatAddress("0x1234567890abcdef", false) // "0x1234...cdef"
 */
export function formatAddress(address: string, isMobile: boolean = false): string {
  if (!address) return "";
  
  if (isMobile) {
    return `${address.slice(0, 4)}...${address.slice(-2)}`;
  }
  
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format ETH balance for display
 * Shows fewer decimals on mobile for cleaner UI
 * 
 * @param balance - Balance in ETH
 * @param isMobile - Whether to format for mobile (fewer decimals)
 * @returns Formatted balance string
 * 
 * @example
 * formatBalance(1.23456789, true)  // "1.234 ETH"
 * formatBalance(1.23456789, false) // "1.2346 ETH"
 */
export function formatBalance(balance: number, isMobile: boolean = false): string {
  const decimals = isMobile ? 3 : 4;
  return `${balance.toFixed(decimals)} ETH`;
}

/**
 * Format large numbers with K, M, B suffixes
 * Useful for displaying token amounts
 * 
 * @param num - Number to format
 * @returns Formatted string with suffix
 * 
 * @example
 * formatNumber(1234)     // "1.2K"
 * formatNumber(1234567)  // "1.2M"
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Truncate text with ellipsis
 * Mobile-adaptive text truncation
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 * 
 * @example
 * truncateText("Long description here", 10) // "Long desc..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * 
 * @param date - Date to compare
 * @returns Relative time string
 * 
 * @example
 * getRelativeTime(new Date(Date.now() - 3600000)) // "1 hour ago"
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString();
}

/**
 * Sleep utility for async operations
 * Useful for demo loading states
 * 
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

