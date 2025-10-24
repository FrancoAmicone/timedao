"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: "default" | "success" | "warning" | "error" | "info" | "purple";
  
  /** Size variant (mobile responsive) */
  size?: "sm" | "md" | "lg";
  
  /** Rounded style */
  rounded?: "default" | "full";
  
  /** Icon on the left */
  leftIcon?: React.ReactNode;
  
  /** Icon on the right */
  rightIcon?: React.ReactNode;
  
  /** Dot indicator */
  dot?: boolean;
}

// ============================================
// COMPONENT
// ============================================

/**
 * Badge Component
 * Status indicator with multiple variants
 * 
 * Features:
 * - Status colors (success, warning, error, etc.)
 * - Responsive sizing
 * - Icon support
 * - Dot indicator option
 * 
 * @example
 * <Badge variant="success">Active</Badge>
 * 
 * @example
 * <Badge variant="warning" dot>
 *   Pending
 * </Badge>
 * 
 * @example
 * <Badge variant="error" leftIcon={<AlertIcon />}>
 *   Failed
 * </Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      rounded = "default",
      leftIcon,
      rightIcon,
      dot = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-1.5",
      "font-medium whitespace-nowrap",
      "transition-colors duration-150"
    );
    
    // Variant styles
    const variantStyles = {
      default: cn(
        "bg-slate-700/50 text-slate-200",
        "border border-slate-600/50"
      ),
      
      success: cn(
        "bg-green-500/10 text-green-400",
        "border border-green-500/30"
      ),
      
      warning: cn(
        "bg-amber-500/10 text-amber-400",
        "border border-amber-500/30"
      ),
      
      error: cn(
        "bg-red-500/10 text-red-400",
        "border border-red-500/30"
      ),
      
      info: cn(
        "bg-blue-500/10 text-blue-400",
        "border border-blue-500/30"
      ),
      
      purple: cn(
        "bg-purple-500/10 text-purple-400",
        "border border-purple-500/30"
      ),
    };
    
    // Size styles (mobile → desktop)
    const sizeStyles = {
      sm: cn(
        "px-2 sm:px-2.5 py-0.5 sm:py-1",
        "text-[10px] sm:text-xs"
      ),
      
      md: cn(
        "px-2.5 sm:px-3 py-1 sm:py-1.5",
        "text-xs sm:text-sm"
      ),
      
      lg: cn(
        "px-3 sm:px-4 py-1.5 sm:py-2",
        "text-sm sm:text-base"
      ),
    };
    
    // Rounded styles
    const roundedStyles = {
      default: "rounded-md",
      full: "rounded-full",
    };
    
    // Dot color based on variant
    const dotColorStyles = {
      default: "bg-slate-400",
      success: "bg-green-400",
      warning: "bg-amber-400",
      error: "bg-red-400",
      info: "bg-blue-400",
      purple: "bg-purple-400",
    };
    
    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          roundedStyles[rounded],
          className
        )}
        {...props}
      >
        {/* Dot Indicator */}
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full",
              dotColorStyles[variant]
            )}
          />
        )}
        
        {/* Left Icon */}
        {leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}
        
        {/* Children */}
        {children}
        
        {/* Right Icon */}
        {rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// ============================================
// STATUS BADGE (Helper Component)
// ============================================

export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  /** Status type */
  status: "active" | "pending" | "completed" | "failed" | "cancelled";
}

/**
 * Status Badge
 * Pre-configured badge for common statuses
 * 
 * @example
 * <StatusBadge status="active" />
 * <StatusBadge status="pending" />
 */
export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const statusConfig = {
      active: {
        variant: "success" as const,
        label: "Active",
      },
      pending: {
        variant: "warning" as const,
        label: "Pending",
      },
      completed: {
        variant: "info" as const,
        label: "Completed",
      },
      failed: {
        variant: "error" as const,
        label: "Failed",
      },
      cancelled: {
        variant: "default" as const,
        label: "Cancelled",
      },
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        dot
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

