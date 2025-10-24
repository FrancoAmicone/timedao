"use client";

import { Seller } from "@/types/marketplace";
import { Card, CardHeader, CardBody, Badge, StatusBadge } from "@/components/ui";
import { useMobile } from "@/hooks/use-mobile";
import { formatAddress } from "@/lib/utils";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface SellerCardProps {
  /** Seller data */
  seller: Seller;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Compact mode (smaller, less info) */
  compact?: boolean;
  
  /** Custom className */
  className?: string;
}

// ============================================
// SELLER CARD COMPONENT
// ============================================

/**
 * Seller Card Component
 * Reusable card for displaying seller information
 * 
 * Features:
 * - Avatar + name + verified badge
 * - Bio with truncate
 * - Rating + completed contracts
 * - Skills badges (top 3)
 * - Hourly rate + availability
 * - Hover effect
 * - Mobile responsive
 * 
 * @example
 * <SellerCard 
 *   seller={seller} 
 *   onClick={() => handleClick(seller)}
 * />
 */
export function SellerCard({
  seller,
  onClick,
  compact = false,
  className,
}: SellerCardProps) {
  const { isMobile } = useMobile();
  
  return (
    <Card
      variant="glass"
      hoverable={!!onClick}
      className={cn(
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className={cn(
            "flex-shrink-0",
            compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
          )}>
            {seller.avatar || "👤"}
          </div>
          
          {/* Name & Address */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "font-bold text-white truncate",
                compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
              )}>
                {seller.name}
              </h3>
              {seller.verified && (
                <span className="text-green-400 flex-shrink-0" title="Verified Seller">
                  ✓
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-slate-400 truncate">
              {formatAddress(seller.address, isMobile)}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="space-y-4">
          {/* Bio */}
          {!compact && (
            <p className="text-sm text-slate-300 line-clamp-2">
              {seller.bio}
            </p>
          )}
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="font-semibold text-white">
                {seller.rating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <span>📝</span>
              <span>{seller.completedContracts} contracts</span>
            </div>
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {seller.skills.slice(0, compact ? 2 : 3).map((skill) => (
              <Badge key={skill} size="sm" variant="purple">
                {skill}
              </Badge>
            ))}
            {seller.skills.length > (compact ? 2 : 3) && (
              <Badge size="sm" variant="default">
                +{seller.skills.length - (compact ? 2 : 3)}
              </Badge>
            )}
          </div>
          
          {/* Rate & Availability */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div>
              <p className="text-xs text-slate-400">Hourly Rate</p>
              <p className={cn(
                "font-bold text-purple-400",
                compact ? "text-base" : "text-lg"
              )}>
                {seller.hourlyRate.toFixed(2)} ETH
              </p>
            </div>
            <StatusBadge
              status={
                seller.availability === "available" ? "active" :
                seller.availability === "busy" ? "pending" :
                "cancelled"
              }
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

