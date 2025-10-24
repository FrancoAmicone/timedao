"use client";

import { useEffect, HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// ============================================
// TYPES
// ============================================

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  open: boolean;
  
  /** Callback when modal should close */
  onClose: () => void;
  
  /** Modal title */
  title?: string;
  
  /** Modal description */
  description?: string;
  
  /** Size variant (mobile-first) */
  size?: "sm" | "md" | "lg" | "full";
  
  /** Show close button */
  showClose?: boolean;
  
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  
  /** Close on escape key */
  closeOnEscape?: boolean;
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {}
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

// ============================================
// MODAL COMPONENT
// ============================================

/**
 * Modal Component
 * Mobile-optimized modal with backdrop and animations
 * 
 * Features:
 * - Full-screen on mobile, centered on desktop
 * - Backdrop blur and overlay
 * - Escape key and overlay click to close
 * - Touch-friendly close button
 * - Body scroll lock when open
 * - Smooth animations
 * 
 * @example
 * <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action">
 *   <ModalBody>
 *     Are you sure you want to continue?
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button onClick={handleConfirm}>Confirm</Button>
 *   </ModalFooter>
 * </Modal>
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      size = "md",
      showClose = true,
      closeOnOverlay = true,
      closeOnEscape = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Lock body scroll when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [open]);
    
    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !open) return;
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      
      window.addEventListener("keydown", handleEscape);
      
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }, [closeOnEscape, open, onClose]);
    
    if (!open) return null;
    
    // Size styles (mobile → desktop)
    const sizeStyles = {
      sm: "max-w-sm",
      md: "max-w-md sm:max-w-2xl",
      lg: "max-w-lg sm:max-w-4xl",
      full: "max-w-full",
    };
    
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={closeOnOverlay ? onClose : undefined}
          aria-hidden="true"
        />
        
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-description" : undefined}
            className={cn(
              // Layout
              "relative w-full",
              sizeStyles[size],
              
              // Styling
              "bg-slate-800/95 backdrop-blur-md",
              "border border-white/10",
              "rounded-lg sm:rounded-xl",
              "shadow-2xl shadow-black/50",
              
              // Padding (mobile-first)
              "p-4 sm:p-6",
              
              // Animation
              "animate-in zoom-in-95 fade-in duration-200",
              
              // Max height with scroll
              "max-h-[90vh] overflow-y-auto",
              
              className
            )}
            {...props}
          >
            {/* Header */}
            {(title || description || showClose) && (
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex-1 space-y-1">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-xl sm:text-2xl font-bold text-white"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="text-sm sm:text-base text-slate-400"
                    >
                      {description}
                    </p>
                  )}
                </div>
                
                {/* Close Button */}
                {showClose && (
                  <button
                    onClick={onClose}
                    className={cn(
                      "flex-shrink-0 ml-4",
                      "w-8 h-8 sm:w-10 sm:h-10",
                      "rounded-lg",
                      "flex items-center justify-center",
                      "text-slate-400 hover:text-white",
                      "hover:bg-white/10",
                      "transition-colors duration-150",
                      "active:scale-95"
                    )}
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
            
            {/* Content */}
            <div>{children}</div>
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = "Modal";

// ============================================
// MODAL HEADER
// ============================================

/**
 * Modal Header
 * Optional header section (use if not using title prop)
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5 mb-4 sm:mb-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = "ModalHeader";

// ============================================
// MODAL BODY
// ============================================

/**
 * Modal Body
 * Main content area
 */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-sm sm:text-base text-slate-300", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = "ModalBody";

// ============================================
// MODAL FOOTER
// ============================================

/**
 * Modal Footer
 * Actions section with responsive button layout
 */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col-reverse sm:flex-row sm:justify-end gap-3",
          "mt-6 sm:mt-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = "ModalFooter";

