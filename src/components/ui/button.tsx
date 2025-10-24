"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  
  /** Size variant (mobile-first responsive) */
  size?: "sm" | "md" | "lg";
  
  /** Full width button */
  fullWidth?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Icon on the left */
  leftIcon?: React.ReactNode;
  
  /** Icon on the right */
  rightIcon?: React.ReactNode;
}

// ============================================
// COMPONENT
// ============================================

/**
 * Button Component
 * Mobile-first touch-optimized button with multiple variants
 * 
 * Features:
 * - 44px+ minimum touch target on mobile
 * - Active state with scale feedback
 * - Responsive padding and text sizes
 * - Loading state
 * - Icon support
 * 
 * @example
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * 
 * @example
 * <Button variant="outline" leftIcon={<Icon />} loading>
 *   Processing...
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles - always applied
    const baseStyles = cn(
      // Layout
      "inline-flex items-center justify-center gap-2",
      "rounded-lg font-medium",
      "transition-all duration-150",
      
      // Touch feedback
      "active:scale-95",
      
      // Disabled state
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
      
      // Focus styles (keyboard navigation)
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
    );
    
    // Variant styles
    const variantStyles = {
      primary: cn(
        "bg-purple-700 text-white",
        "hover:bg-purple-800",
        "active:bg-purple-900",
        "shadow-lg shadow-purple-900/50"
      ),
      
      secondary: cn(
        "bg-slate-700 text-white",
        "hover:bg-slate-600",
        "active:bg-slate-800",
        "shadow-md shadow-slate-900/50"
      ),
      
      outline: cn(
        "border-2 border-purple-700 text-purple-300",
        "hover:bg-purple-700/10 hover:border-purple-600",
        "active:bg-purple-700/20"
      ),
      
      ghost: cn(
        "text-white",
        "hover:bg-white/10",
        "active:bg-white/20"
      ),
      
      danger: cn(
        "bg-red-600 text-white",
        "hover:bg-red-700",
        "active:bg-red-800",
        "shadow-lg shadow-red-900/50"
      ),
    };
    
    // Size styles (mobile → desktop responsive)
    const sizeStyles = {
      sm: cn(
        // Mobile: 36-40px height
        "px-3 sm:px-6 py-1.5 sm:py-2",
        "text-xs sm:text-sm"
      ),
      
      md: cn(
        // Mobile: 44-48px height (minimum touch target)
        "px-6 sm:px-8 py-3 sm:py-4",
        "text-sm sm:text-base"
      ),
      
      lg: cn(
        // Mobile: 52-56px height
        "px-8 sm:px-12 py-4 sm:py-6",
        "text-base sm:text-lg"
      ),
    };
    
    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";
    
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        {...props}
      >
        {/* Left Icon */}
        {leftIcon && !loading && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}
        
        {/* Loading Spinner */}
        {loading && (
          <svg
            className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {/* Children */}
        {children}
        
        {/* Right Icon */}
        {rightIcon && !loading && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

