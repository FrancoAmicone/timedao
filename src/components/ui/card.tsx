"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: "default" | "glass" | "bordered" | "elevated";
  
  /** Padding size (mobile → desktop responsive) */
  padding?: "none" | "sm" | "md" | "lg";
  
  /** Hover effect */
  hoverable?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

// ============================================
// CARD COMPONENT
// ============================================

/**
 * Card Component
 * Mobile-first container with responsive padding
 * 
 * Features:
 * - Glass morphism effect
 * - Responsive padding
 * - Hover states
 * - Multiple variants
 * 
 * @example
 * <Card variant="glass" hoverable>
 *   <CardHeader>
 *     <h3>Title</h3>
 *   </CardHeader>
 *   <CardBody>
 *     Content here
 *   </CardBody>
 *   <CardFooter>
 *     Footer actions
 *   </CardFooter>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      hoverable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = cn(
      "rounded-lg",
      "transition-all duration-250"
    );
    
    // Variant styles
    const variantStyles = {
      default: cn(
        "bg-slate-800/50",
        "border border-white/10"
      ),
      
      glass: cn(
        "bg-slate-800/30",
        "backdrop-blur-md",
        "border border-white/10"
      ),
      
      bordered: cn(
        "bg-transparent",
        "border-2 border-purple-700/50"
      ),
      
      elevated: cn(
        "bg-slate-800/70",
        "border border-white/5",
        "shadow-xl shadow-slate-900/50"
      ),
    };
    
    // Padding styles (mobile → desktop)
    const paddingStyles = {
      none: "",
      sm: "p-3 sm:p-4",
      md: "p-4 sm:p-8",
      lg: "p-6 sm:p-12",
    };
    
    // Hover styles
    const hoverStyles = hoverable
      ? cn(
          "cursor-pointer",
          "hover:border-purple-700/50",
          "hover:shadow-lg hover:shadow-purple-900/20",
          "hover:scale-[1.02]",
          "active:scale-[0.98]"
        )
      : "";
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// ============================================
// CARD HEADER
// ============================================

/**
 * Card Header
 * Optional header section with bottom border
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5",
          "pb-3 sm:pb-4",
          "border-b border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// ============================================
// CARD BODY
// ============================================

/**
 * Card Body
 * Main content area
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("py-3 sm:py-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = "CardBody";

// ============================================
// CARD FOOTER
// ============================================

/**
 * Card Footer
 * Optional footer section with top border
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          "pt-3 sm:pt-4",
          "border-t border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

