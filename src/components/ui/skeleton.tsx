"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of skeleton */
  width?: string | number;
  
  /** Height of skeleton */
  height?: string | number;
  
  /** Variant style */
  variant?: "default" | "circular" | "text" | "button" | "card";
  
  /** Animation speed */
  speed?: "slow" | "normal" | "fast";
}

// ============================================
// SKELETON COMPONENT
// ============================================

/**
 * Skeleton Component
 * Loading placeholder with shimmer animation
 * 
 * Features:
 * - Multiple variants for different content types
 * - Customizable width and height
 * - Smooth shimmer animation
 * - Mobile-responsive
 * 
 * @example
 * <Skeleton variant="text" />
 * <Skeleton variant="circular" width={64} height={64} />
 * <Skeleton variant="card" />
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      variant = "default",
      speed = "normal",
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Base animation
    const baseStyles = cn(
      "bg-slate-700/50",
      "relative overflow-hidden",
      "before:absolute before:inset-0",
      "before:-translate-x-full",
      "before:bg-gradient-to-r",
      "before:from-transparent before:via-slate-600/30 before:to-transparent",
      "before:animate-shimmer"
    );
    
    // Speed animation duration
    const speedStyles = {
      slow: "before:duration-[2s]",
      normal: "before:duration-[1.5s]",
      fast: "before:duration-[1s]",
    };
    
    // Variant styles
    const variantStyles = {
      default: "rounded-md",
      
      circular: "rounded-full",
      
      text: cn(
        "rounded h-4 sm:h-5",
        "w-full"
      ),
      
      button: cn(
        "rounded-lg",
        "h-11 sm:h-12",
        "w-full sm:w-32"
      ),
      
      card: cn(
        "rounded-lg",
        "h-32 sm:h-48",
        "w-full"
      ),
    };
    
    // Custom dimensions
    const customStyle = {
      width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
      height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
      ...style,
    };
    
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading..."
        className={cn(
          baseStyles,
          speedStyles[speed],
          variantStyles[variant],
          className
        )}
        style={customStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// ============================================
// SKELETON GROUP (Helper Component)
// ============================================

export interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of skeleton items */
  count?: number;
  
  /** Spacing between items */
  spacing?: "sm" | "md" | "lg";
  
  /** Skeleton variant */
  variant?: SkeletonProps["variant"];
}

/**
 * Skeleton Group
 * Render multiple skeletons with spacing
 * 
 * @example
 * <SkeletonGroup count={3} variant="text" spacing="md" />
 */
export const SkeletonGroup = forwardRef<HTMLDivElement, SkeletonGroupProps>(
  (
    {
      count = 3,
      spacing = "md",
      variant = "text",
      className,
      ...props
    },
    ref
  ) => {
    const spacingStyles = {
      sm: "space-y-2",
      md: "space-y-3 sm:space-y-4",
      lg: "space-y-4 sm:space-y-6",
    };
    
    return (
      <div
        ref={ref}
        className={cn(spacingStyles[spacing], className)}
        {...props}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton key={index} variant={variant} />
        ))}
      </div>
    );
  }
);

SkeletonGroup.displayName = "SkeletonGroup";

// ============================================
// SKELETON CARD (Pre-configured)
// ============================================

export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Show avatar */
  showAvatar?: boolean;
  
  /** Number of text lines */
  lines?: number;
}

/**
 * Skeleton Card
 * Pre-configured skeleton for card loading state
 * 
 * @example
 * <SkeletonCard showAvatar lines={3} />
 */
export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      showAvatar = true,
      lines = 2,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-4 sm:p-6",
          "bg-slate-800/50 border border-white/10 rounded-lg",
          className
        )}
        {...props}
      >
        <div className="space-y-4">
          {/* Header with avatar */}
          {showAvatar && (
            <div className="flex items-center gap-3 sm:gap-4">
              <Skeleton variant="circular" width={48} height={48} className="sm:w-16 sm:h-16" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </div>
            </div>
          )}
          
          {/* Body lines */}
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                width={index === lines - 1 ? "80%" : "100%"}
              />
            ))}
          </div>
          
          {/* Footer button */}
          <Skeleton variant="button" />
        </div>
      </div>
    );
  }
);

SkeletonCard.displayName = "SkeletonCard";

