"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import { Container } from "./container";
import { useMobile } from "@/hooks/use-mobile";
import { useWalletMock } from "@/hooks/use-wallet-mock";
import { formatAddress } from "@/lib/utils";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface NavbarProps {
  /** Show wallet button */
  showWallet?: boolean;
  
  /** Custom nav links */
  navLinks?: Array<{
    label: string;
    href: string;
    badge?: string;
  }>;
}

// ============================================
// NAVBAR COMPONENT
// ============================================

/**
 * Navbar Component
 * Sticky navigation with mobile-first design
 * 
 * Features:
 * - Sticky positioning (z-50)
 * - Mobile hamburger menu
 * - Desktop horizontal nav
 * - Mock wallet button (adaptive display)
 * - Touch-optimized (44px+ targets)
 * - Backdrop blur
 * 
 * @example
 * <Navbar showWallet />
 */
export function Navbar({ showWallet = true, navLinks }: NavbarProps) {
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected, address, balance, connectWallet, disconnectWallet } = useWalletMock();
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Default nav links
  const defaultNavLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace", badge: "Live" },
    { label: "Marriage DAO", href: "/marriage", badge: "Soon" },
    { label: "Demo", href: "/demo" },
  ];
  
  const links = navLinks || defaultNavLinks;
  
  // Wallet connection handler
  const handleWalletClick = async () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      setIsConnecting(true);
      try {
        await connectWallet();
      } finally {
        setIsConnecting(false);
      }
    }
  };
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-white/10">
      <Container size="2xl" padding="md">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-xl sm:text-2xl">🕐</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">
              Time<span className="text-purple-400">DAO</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                {link.badge && (
                  <Badge
                    variant={link.badge === "Live" ? "success" : "warning"}
                    size="sm"
                    className="ml-2"
                  >
                    {link.badge}
                  </Badge>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
          
          {/* Wallet Button (Desktop) */}
          {showWallet && !isMobile && (
            <Button
              variant={isConnected ? "secondary" : "primary"}
              size="md"
              onClick={handleWalletClick}
              loading={isConnecting}
              disabled={isConnecting}
              className="hidden md:flex"
            >
              {isConnected && address ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-mono text-sm">
                    {formatAddress(address, false)}
                  </span>
                  <span className="text-xs text-slate-400">
                    {balance.toFixed(2)} ETH
                  </span>
                </div>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          )}
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Wallet Button (Mobile - Icon only) */}
            {showWallet && (
              <Button
                variant={isConnected ? "secondary" : "outline"}
                size="sm"
                onClick={handleWalletClick}
                loading={isConnecting}
                disabled={isConnecting}
                className="md:hidden"
              >
                {isConnected && address ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="font-mono text-xs">
                      {formatAddress(address, true)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg">👛</span>
                )}
              </Button>
            )}
            
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "w-10 h-10 flex flex-col items-center justify-center gap-1.5",
                "rounded-lg hover:bg-white/10 transition-colors",
                "active:scale-95"
              )}
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "w-5 h-0.5 bg-white transition-all duration-300",
                  mobileMenuOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-white transition-all duration-300",
                  mobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-white transition-all duration-300",
                  mobileMenuOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between",
                    "px-4 py-3 rounded-lg",
                    "text-base font-medium text-slate-300",
                    "hover:bg-white/10 hover:text-white",
                    "transition-colors",
                    "active:scale-95"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <Badge
                      variant={link.badge === "Live" ? "success" : "warning"}
                      size="sm"
                    >
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}

