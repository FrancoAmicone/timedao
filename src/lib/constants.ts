/**
 * TimeDAO Constants
 * Mobile-first design system constants
 */

// ============================================
// RESPONSIVE BREAKPOINTS
// ============================================

/**
 * Breakpoint values in pixels
 * Used for JavaScript media queries
 */
export const BREAKPOINTS = {
  /** Mobile: < 640px (default, no prefix needed) */
  mobile: 0,
  
  /** Small devices (sm:): tablets, large phones */
  sm: 640,
  
  /** Medium devices (md:): tablets, small laptops */
  md: 768,
  
  /** Large devices (lg:): desktops */
  lg: 1024,
  
  /** Extra large devices (xl:): large desktops */
  xl: 1280,
  
  /** 2XL devices (2xl:): very large screens */
  "2xl": 1536,
} as const;

/**
 * Check if current width matches a breakpoint
 * @param width - Current window width
 * @param breakpoint - Breakpoint name
 */
export function isBreakpoint(width: number, breakpoint: keyof typeof BREAKPOINTS): boolean {
  return width >= BREAKPOINTS[breakpoint];
}

// ============================================
// DESIGN TOKENS
// ============================================

/**
 * Color palette
 * Based on Tailwind purple + slate
 */
export const COLORS = {
  // Primary brand color
  primary: {
    DEFAULT: "#9333ea", // purple-600
    light: "#a855f7",   // purple-500
    dark: "#7e22ce",    // purple-700
    darker: "#6b21a8",  // purple-800
  },
  
  // Background colors
  background: {
    DEFAULT: "#0f172a", // slate-900
    light: "#1e293b",   // slate-800
    lighter: "#334155", // slate-700
  },
  
  // Text colors
  text: {
    DEFAULT: "#ffffff",
    muted: "#cbd5e1",   // slate-300
    disabled: "#64748b", // slate-500
  },
  
  // Status colors
  status: {
    success: "#10b981", // green-500
    warning: "#f59e0b", // amber-500
    error: "#ef4444",   // red-500
    info: "#3b82f6",    // blue-500
  },
} as const;

// ============================================
// SPACING & SIZING
// ============================================

/**
 * Touch target minimum sizes (Apple HIG)
 */
export const TOUCH_TARGET = {
  /** Minimum recommended touch target */
  min: 44,
  
  /** Comfortable touch target */
  comfortable: 48,
  
  /** Large touch target for primary actions */
  large: 56,
} as const;

/**
 * Container max widths
 */
export const CONTAINER = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Z-index scale
 * Prevents z-index wars
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
  tooltip: 60,
} as const;

// ============================================
// ANIMATION DURATIONS
// ============================================

/**
 * Standard animation durations (ms)
 */
export const DURATION = {
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

/**
 * Font families
 */
export const FONTS = {
  sans: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
  mono: "var(--font-geist-mono), Menlo, Monaco, monospace",
} as const;

// ============================================
// ROUTES
// ============================================

/**
 * Application routes
 */
export const ROUTES = {
  home: "/",
  
  marketplace: {
    home: "/marketplace",
    seller: "/marketplace/seller",
    contracts: "/marketplace/contracts",
    newContract: "/marketplace/contracts/new",
    contract: (id: string) => `/marketplace/contracts/${id}`,
  },
  
  marriage: {
    home: "/marriage",
    create: "/marriage/create",
    proposal: (id: string) => `/marriage/${id}`,
  },
} as const;

// ============================================
// VALIDATION
// ============================================

/**
 * Form validation rules
 */
export const VALIDATION = {
  address: {
    pattern: /^0x[a-fA-F0-9]{40}$/,
    message: "Invalid Ethereum address",
  },
  
  amount: {
    min: 0.001,
    max: 1000000,
    message: "Amount must be between 0.001 and 1,000,000",
  },
  
  username: {
    minLength: 3,
    maxLength: 32,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "Username must be 3-32 characters (alphanumeric and underscore)",
  },
} as const;

// ============================================
// MOCK DATA CONFIG
// ============================================

/**
 * Configuration for mock wallet
 */
export const MOCK_WALLET = {
  defaultAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
  defaultBalance: 10.5,
  chainId: 1, // Ethereum Mainnet
  chainName: "Ethereum",
} as const;

/**
 * Mock delay for async operations (ms)
 * Simulates network latency
 */
export const MOCK_DELAY = {
  fast: 300,
  normal: 800,
  slow: 1500,
} as const;

