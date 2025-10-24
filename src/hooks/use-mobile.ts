"use client";

import { useEffect, useState } from "react";
import { BREAKPOINTS } from "@/lib/constants";

/**
 * Hook to detect mobile devices
 * Based on screen width and breakpoints
 * 
 * @returns Object with mobile state and current breakpoint info
 * 
 * @example
 * const { isMobile, isTablet, isDesktop, width } = useMobile();
 * 
 * if (isMobile) {
 *   return <MobileView />;
 * }
 */
export function useMobile() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Handle resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const isMobile = windowWidth < BREAKPOINTS.md; // < 768px
  const isTablet = windowWidth >= BREAKPOINTS.sm && windowWidth < BREAKPOINTS.lg; // 640px - 1024px
  const isDesktop = windowWidth >= BREAKPOINTS.lg; // >= 1024px
  
  return {
    /** True if viewport width < 768px */
    isMobile,
    
    /** True if viewport width between 640px and 1024px */
    isTablet,
    
    /** True if viewport width >= 1024px */
    isDesktop,
    
    /** Current window width in pixels */
    width: windowWidth,
    
    /** Check if width is above a specific breakpoint */
    isAbove: (breakpoint: keyof typeof BREAKPOINTS) => windowWidth >= BREAKPOINTS[breakpoint],
    
    /** Check if width is below a specific breakpoint */
    isBelow: (breakpoint: keyof typeof BREAKPOINTS) => windowWidth < BREAKPOINTS[breakpoint],
  };
}

/**
 * Hook to detect touch device
 * Based on pointer type and touch support
 * 
 * @returns True if device supports touch
 * 
 * @example
 * const isTouch = useTouch();
 * 
 * if (isTouch) {
 *   // Show touch-optimized UI
 * }
 */
export function useTouch() {
  const [isTouch, setIsTouch] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if device has touch support
    const hasTouch = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0;
    
    setIsTouch(hasTouch);
  }, []);
  
  return isTouch;
}

/**
 * Hook to get current breakpoint name
 * 
 * @returns Current breakpoint name ("mobile", "sm", "md", etc.)
 * 
 * @example
 * const breakpoint = useBreakpoint();
 * 
 * if (breakpoint === "mobile") {
 *   // Mobile-specific logic
 * }
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof BREAKPOINTS>("mobile");
  
  useEffect(() => {
    function updateBreakpoint() {
      const width = window.innerWidth;
      
      if (width >= BREAKPOINTS["2xl"]) {
        setBreakpoint("2xl");
      } else if (width >= BREAKPOINTS.xl) {
        setBreakpoint("xl");
      } else if (width >= BREAKPOINTS.lg) {
        setBreakpoint("lg");
      } else if (width >= BREAKPOINTS.md) {
        setBreakpoint("md");
      } else if (width >= BREAKPOINTS.sm) {
        setBreakpoint("sm");
      } else {
        setBreakpoint("mobile");
      }
    }
    
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);
  
  return breakpoint;
}

