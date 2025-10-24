"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max width variant */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  
  /** Padding (mobile → desktop responsive) */
  padding?: "none" | "sm" | "md" | "lg";
  
  /** Center content */
  center?: boolean;
}

// ============================================
// CONTAINER COMPONENT
// ============================================

/**
 * Container Component
 * Responsive container with max-width and padding
 * 
 * Features:
 * - Max-width constraints for different screen sizes
 * - Responsive padding (mobile → desktop)
 * - Automatic centering
 * - Full-width option
 * 
 * @example
 * <Container size="lg" padding="md">
 *   <h1>Content</h1>
 * </Container>
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = "xl",
      padding = "md",
      center = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Max-width styles
    const sizeStyles = {
      sm: "max-w-screen-sm",     // 640px
      md: "max-w-screen-md",     // 768px
      lg: "max-w-screen-lg",     // 1024px
      xl: "max-w-screen-xl",     // 1280px
      "2xl": "max-w-screen-2xl", // 1536px
      full: "max-w-full",
    };
    
    // Padding styles (mobile → desktop)
    const paddingStyles = {
      none: "",
      sm: "px-3 sm:px-4",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    };
    
    // Center styles
    const centerStyles = center ? "mx-auto" : "";
    
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          sizeStyles[size],
          paddingStyles[padding],
          centerStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

