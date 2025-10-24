"use client";

import { Contract } from "@/types/marketplace";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Badge, 
  Button 
} from "@/components/ui";
import { useMobile } from "@/hooks/use-mobile";
import { formatAddress, getRelativeTime } from "@/lib/utils";
import { ContractStatus } from "./contract-status";

// ============================================
// TYPES
// ============================================

export interface ContractCardProps {
  /** Contract data */
  contract: Contract;
  
  /** View mode (changes available actions) */
  viewMode: "buyer" | "seller";
  
  /** Action handler */
  onAction?: (action: ContractAction, contract: Contract) => void;
  
  /** Compact mode */
  compact?: boolean;
  
  /** Custom className */
  className?: string;
}

export type ContractAction = 
  | "view" 
  | "accept" 
  | "complete" 
  | "confirm" 
  | "cancel";

// ============================================
// CONTRACT CARD COMPONENT
// ============================================

/**
 * Contract Card Component
 * Reusable card for displaying contract information
 * 
 * Features:
 * - Status badge with timeline
 * - Title + description
 * - Hours + rate + total amount
 * - Seller/Buyer info
 * - Action buttons based on status and viewMode
 * - Work proof display
 * - Rating/feedback (if confirmed)
 * 
 * @example
 * <ContractCard 
 *   contract={contract} 
 *   viewMode="buyer"
 *   onAction={(action, contract) => handleAction(action, contract)}
 * />
 */
export function ContractCard({
  contract,
  viewMode,
  onAction,
  compact = false,
  className,
}: ContractCardProps) {
  const { isMobile } = useMobile();
  
  // Determine available actions based on status and viewMode
  const getAvailableActions = (): ContractAction[] => {
    const actions: ContractAction[] = ["view"];
    
    if (viewMode === "seller") {
      if (contract.status === "pending") actions.push("accept");
      if (contract.status === "active") actions.push("complete");
    }
    
    if (viewMode === "buyer") {
      if (contract.status === "completed") actions.push("confirm");
      if (contract.status === "pending") actions.push("cancel");
    }
    
    return actions;
  };
  
  const availableActions = getAvailableActions();
  
  // Action button labels
  const actionLabels: Record<ContractAction, string> = {
    view: "View Details",
    accept: "Accept Contract",
    complete: "Mark Complete",
    confirm: "Confirm & Pay",
    cancel: "Cancel",
  };
  
  // Action button variants
  const actionVariants: Record<ContractAction, "primary" | "secondary" | "danger"> = {
    view: "secondary",
    accept: "primary",
    complete: "primary",
    confirm: "primary",
    cancel: "danger",
  };
  
  return (
    <Card variant="glass" className={className}>
      <CardHeader>
        <div className="space-y-3">
          {/* Status & Date */}
          <div className="flex items-start justify-between gap-2">
            <ContractStatus 
              status={contract.status}
              size={compact ? "sm" : "md"}
            />
            <p className="text-xs text-slate-400">
              {getRelativeTime(contract.createdAt)}
            </p>
          </div>
          
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {contract.title}
          </h3>
          
          {/* Parties */}
          <div className="flex flex-col sm:flex-row gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">
                {viewMode === "buyer" ? "Seller:" : "Buyer:"}
              </span>
              <span className="font-mono text-white">
                {viewMode === "buyer" 
                  ? (contract.sellerName || formatAddress(contract.seller, isMobile))
                  : formatAddress(contract.buyer, isMobile)
                }
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="space-y-4">
          {/* Description */}
          {!compact && (
            <p className="text-sm text-slate-300 line-clamp-2">
              {contract.description}
            </p>
          )}
          
          {/* Contract Details */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-slate-400">Hours</p>
              <p className="text-base sm:text-lg font-semibold text-white">
                {contract.hours}h
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Rate</p>
              <p className="text-base sm:text-lg font-semibold text-white">
                {contract.hourlyRate.toFixed(2)} ETH
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Total</p>
              <p className="text-base sm:text-lg font-semibold text-purple-400">
                {contract.totalAmount.toFixed(2)} ETH
              </p>
            </div>
          </div>
          
          {/* Work Proof (if completed/confirmed) */}
          {contract.workProof && (
            <div className="p-3 bg-slate-800/50 rounded-lg border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Work Proof:</p>
              <p className="text-sm text-slate-300">
                {contract.workProof}
              </p>
            </div>
          )}
          
          {/* Feedback & Rating (if confirmed) */}
          {contract.status === "confirmed" && contract.buyerRating && (
            <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-slate-400">Rating:</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i}
                      className={i < (contract.buyerRating || 0) ? "text-yellow-400" : "text-slate-600"}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              {contract.buyerFeedback && (
                <p className="text-sm text-slate-300">
                  "{contract.buyerFeedback}"
                </p>
              )}
            </div>
          )}
          
          {/* NFT Token (if confirmed) */}
          {contract.tokenId && (
            <div className="flex items-center gap-2">
              <Badge variant="purple" size="sm">
                NFT #{contract.tokenId}
              </Badge>
              <span className="text-xs text-slate-400">Minted on-chain</span>
            </div>
          )}
        </div>
      </CardBody>
      
      {/* Actions */}
      {availableActions.length > 0 && onAction && (
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {availableActions.map((action) => (
              <Button
                key={action}
                variant={actionVariants[action]}
                size={compact ? "sm" : "md"}
                onClick={() => onAction(action, contract)}
                fullWidth={isMobile}
              >
                {actionLabels[action]}
              </Button>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

