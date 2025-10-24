"use client";

import Link from "next/link";
import { Container } from "./container";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface FooterProps {
  /** Show social links */
  showSocial?: boolean;
  
  /** Custom links */
  links?: Array<{
    label: string;
    href: string;
  }>;
}

// ============================================
// FOOTER COMPONENT
// ============================================

/**
 * Footer Component
 * Responsive footer with links and copyright
 * 
 * Features:
 * - Responsive grid layout
 * - Social media links
 * - Navigation links
 * - Copyright info
 * - Touch-optimized links
 * 
 * @example
 * <Footer showSocial />
 */
export function Footer({ showSocial = true, links }: FooterProps) {
  const defaultLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Marriage DAO", href: "/marriage" },
    { label: "Demo", href: "/demo" },
    { label: "Docs", href: "#docs" },
  ];
  
  const footerLinks = links || defaultLinks;
  
  const socialLinks = [
    { label: "GitHub", href: "https://github.com", icon: "📦" },
    { label: "Twitter", href: "https://twitter.com", icon: "🐦" },
    { label: "Discord", href: "https://discord.com", icon: "💬" },
    { label: "Telegram", href: "https://telegram.org", icon: "✈️" },
  ];
  
  return (
    <footer className="w-full border-t border-white/10 bg-slate-900/50">
      <Container size="2xl" padding="md">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
                  <span className="text-xl">🕐</span>
                </div>
                <span className="text-lg font-bold text-white">
                  Time<span className="text-purple-400">DAO</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-xs">
                Decentralized time marketplace and on-chain relationship management platform.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {footerLinks.slice(0, 5).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-slate-400 hover:text-purple-400",
                        "transition-colors duration-150",
                        "inline-block py-1"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/demo" className="text-sm text-slate-400 hover:text-purple-400 transition-colors inline-block py-1">
                    UI Components
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace-demo" className="text-sm text-slate-400 hover:text-purple-400 transition-colors inline-block py-1">
                    Marketplace Components
                  </Link>
                </li>
                <li>
                  <Link href="/layout-demo" className="text-sm text-slate-400 hover:text-purple-400 transition-colors inline-block py-1">
                    Layout Demo
                  </Link>
                </li>
                <li>
                  <Link href="#docs" className="text-sm text-slate-400 hover:text-purple-400 transition-colors inline-block py-1">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-sm text-slate-400 hover:text-purple-400 transition-colors inline-block py-1">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Community */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Community
              </h3>
              {showSocial && (
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-10 h-10 rounded-lg",
                        "bg-slate-800 hover:bg-purple-700",
                        "flex items-center justify-center",
                        "text-xl",
                        "transition-all duration-150",
                        "hover:scale-110 active:scale-95"
                      )}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
              <p className="text-xs text-slate-500 pt-2">
                Join our community to stay updated with the latest news and features.
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-500">
              © {new Date().getFullYear()} TimeDAO. Built with 💜 for the decentralized future.
            </p>
            
            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <Link href="#privacy" className="text-slate-500 hover:text-slate-400 transition-colors">
                Privacy
              </Link>
              <span className="text-slate-700">•</span>
              <Link href="#terms" className="text-slate-500 hover:text-slate-400 transition-colors">
                Terms
              </Link>
              <span className="text-slate-700">•</span>
              <Link href="#cookies" className="text-slate-500 hover:text-slate-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

