"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text */
  label?: string;
  
  /** Error message */
  error?: string;
  
  /** Helper text */
  helperText?: string;
  
  /** Icon on the left */
  leftIcon?: React.ReactNode;
  
  /** Icon on the right */
  rightIcon?: React.ReactNode;
  
  /** Full width */
  fullWidth?: boolean;
}

// ============================================
// COMPONENT
// ============================================

/**
 * Input Component
 * Touch-friendly input with mobile-first design
 * 
 * Features:
 * - 44px+ minimum touch target on mobile
 * - Responsive text size
 * - Label, error, helper text support
 * - Icon support
 * - Focus states with ring
 * 
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   error={errors.email}
 *   helperText="We'll never share your email"
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    
    // Generate ID if not provided
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    
    // Base input styles
    const inputBaseStyles = cn(
      // Layout
      "flex w-full rounded-lg",
      
      // Spacing (mobile → desktop, 44px+ min height)
      "px-3 sm:px-4 py-2 sm:py-3",
      
      // Typography (mobile → desktop)
      "text-sm sm:text-base",
      
      // Colors
      "bg-slate-800/50 text-white",
      "border border-white/10",
      
      // Placeholder
      "placeholder:text-slate-400",
      
      // Focus
      "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
      
      // Transitions
      "transition-all duration-150",
      
      // Disabled
      "disabled:opacity-50 disabled:cursor-not-allowed"
    );
    
    // Error state
    const errorStyles = error
      ? "border-red-500 focus:ring-red-500"
      : "";
    
    // Container wrapper
    const containerStyles = fullWidth ? "w-full" : "";
    
    return (
      <div className={cn(containerStyles, className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block mb-2",
              "text-xs sm:text-sm font-medium",
              "text-slate-300",
              "transition-colors duration-150",
              isFocused && "text-purple-400",
              error && "text-red-400"
            )}
          >
            {label}
          </label>
        )}
        
        {/* Input Wrapper (for icons) */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}
          
          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              inputBaseStyles,
              errorStyles,
              leftIcon && "pl-10 sm:pl-12",
              rightIcon && "pr-10 sm:pr-12"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {/* Helper Text or Error */}
        {(helperText || error) && (
          <p
            className={cn(
              "mt-1.5 text-xs sm:text-sm",
              error ? "text-red-400" : "text-slate-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ============================================
// TEXTAREA COMPONENT
// ============================================

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  
  /** Error message */
  error?: string;
  
  /** Helper text */
  helperText?: string;
  
  /** Rows */
  rows?: number;
  
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Textarea Component
 * Multi-line input with same styling as Input
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      className,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    
    // Generate ID if not provided
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    
    // Base styles
    const textareaBaseStyles = cn(
      // Layout
      "flex w-full rounded-lg resize-y",
      
      // Spacing
      "px-3 sm:px-4 py-2 sm:py-3",
      
      // Typography
      "text-sm sm:text-base",
      
      // Colors
      "bg-slate-800/50 text-white",
      "border border-white/10",
      
      // Placeholder
      "placeholder:text-slate-400",
      
      // Focus
      "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
      
      // Transitions
      "transition-all duration-150",
      
      // Disabled
      "disabled:opacity-50 disabled:cursor-not-allowed"
    );
    
    // Error state
    const errorStyles = error
      ? "border-red-500 focus:ring-red-500"
      : "";
    
    // Container wrapper
    const containerStyles = fullWidth ? "w-full" : "";
    
    return (
      <div className={cn(containerStyles, className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "block mb-2",
              "text-xs sm:text-sm font-medium",
              "text-slate-300",
              "transition-colors duration-150",
              isFocused && "text-purple-400",
              error && "text-red-400"
            )}
          >
            {label}
          </label>
        )}
        
        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(textareaBaseStyles, errorStyles)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* Helper Text or Error */}
        {(helperText || error) && (
          <p
            className={cn(
              "mt-1.5 text-xs sm:text-sm",
              error ? "text-red-400" : "text-slate-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

