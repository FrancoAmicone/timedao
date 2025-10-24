"use client";

import { ContractStatus as ContractStatusType } from "@/types/marketplace";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface ContractStatusProps {
  /** Contract status */
  status: ContractStatusType;
  
  /** Show label text */
  showLabel?: boolean;
  
  /** Size */
  size?: "sm" | "md" | "lg";
  
  /** Show timeline (visual progress) */
  withTimeline?: boolean;
  
  /** Custom className */
  className?: string;
}

// ============================================
// STATUS CONFIG
// ============================================

const statusConfig: Record<
  ContractStatusType,
  {
    label: string;
    icon: string;
    variant: "default" | "warning" | "success" | "error" | "info" | "purple";
    description: string;
  }
> = {
  pending: {
    label: "Pending",
    icon: "⏳",
    variant: "warning",
    description: "Waiting for seller to accept",
  },
  active: {
    label: "Active",
    icon: "🔨",
    variant: "info",
    description: "Work in progress",
  },
  completed: {
    label: "Completed",
    icon: "✅",
    variant: "success",
    description: "Work done, awaiting buyer confirmation",
  },
  confirmed: {
    label: "Confirmed",
    icon: "🎉",
    variant: "purple",
    description: "Completed and paid, NFT minted",
  },
  disputed: {
    label: "Disputed",
    icon: "⚠️",
    variant: "error",
    description: "Dispute raised",
  },
  cancelled: {
    label: "Cancelled",
    icon: "❌",
    variant: "default",
    description: "Contract cancelled",
  },
};

// ============================================
// CONTRACT STATUS COMPONENT
// ============================================

/**
 * Contract Status Component
 * Display contract status with badge and optional timeline
 * 
 * Features:
 * - Badge with color and icon
 * - Optional timeline visualization
 * - Tooltips with descriptions
 * - Responsive sizing
 * 
 * @example
 * <ContractStatus status="active" withTimeline />
 */
export function ContractStatus({
  status,
  showLabel = true,
  size = "md",
  withTimeline = false,
  className,
}: ContractStatusProps) {
  const config = statusConfig[status];
  
  if (withTimeline) {
    return (
      <div className={cn("space-y-3", className)}>
        {/* Badge */}
        <Badge variant={config.variant} size={size} dot>
          {config.icon} {showLabel && config.label}
        </Badge>
        
        {/* Timeline */}
        <div className="flex items-center gap-2">
          {/* Pending */}
          <TimelineStep
            active={status === "pending"}
            completed={["active", "completed", "confirmed"].includes(status)}
            label="1"
            tooltip="Pending"
          />
          
          <TimelineLine completed={["active", "completed", "confirmed"].includes(status)} />
          
          {/* Active */}
          <TimelineStep
            active={status === "active"}
            completed={["completed", "confirmed"].includes(status)}
            label="2"
            tooltip="Active"
          />
          
          <TimelineLine completed={["completed", "confirmed"].includes(status)} />
          
          {/* Completed */}
          <TimelineStep
            active={status === "completed"}
            completed={status === "confirmed"}
            label="3"
            tooltip="Completed"
          />
          
          <TimelineLine completed={status === "confirmed"} />
          
          {/* Confirmed */}
          <TimelineStep
            active={status === "confirmed"}
            completed={status === "confirmed"}
            label="4"
            tooltip="Confirmed"
          />
        </div>
        
        {/* Description */}
        <p className="text-xs text-slate-400">
          {config.description}
        </p>
      </div>
    );
  }
  
  return (
    <Badge 
      variant={config.variant} 
      size={size} 
      dot
      className={className}
      title={config.description}
    >
      {config.icon} {showLabel && config.label}
    </Badge>
  );
}

// ============================================
// TIMELINE HELPERS
// ============================================

interface TimelineStepProps {
  active: boolean;
  completed: boolean;
  label: string;
  tooltip: string;
}

function TimelineStep({ active, completed, label, tooltip }: TimelineStepProps) {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
        completed && "bg-purple-600 text-white",
        active && !completed && "bg-purple-500 text-white ring-2 ring-purple-300 ring-offset-2 ring-offset-slate-900",
        !active && !completed && "bg-slate-700 text-slate-400"
      )}
      title={tooltip}
    >
      {completed ? "✓" : label}
    </div>
  );
}

function TimelineLine({ completed }: { completed: boolean }) {
  return (
    <div
      className={cn(
        "h-0.5 flex-1 transition-all",
        completed ? "bg-purple-600" : "bg-slate-700"
      )}
    />
  );
}

