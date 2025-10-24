# 🕐 TimeDAO - Web3 Time Marketplace & Marriage DAO

**Mobile-first decentralized applications built with Next.js, React, and Tailwind CSS**

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

Visit [http://localhost:3000/demo](http://localhost:3000/demo) to see all UI components.

---

## 📱 Mobile-First Design

This project is built with **mobile-first** responsive design:

- ✅ Touch targets: 44px+ minimum
- ✅ Responsive breakpoints: mobile < 640px, tablet 640px+, desktop 768px+
- ✅ Adaptive content (addresses, balances, text)
- ✅ Touch feedback on all interactive elements
- ✅ Smooth animations and transitions

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── demo/
│       └── page.tsx        # Component demo page
│
├── components/
│   └── ui/                 # UI Primitives
│       ├── button.tsx      # Button component
│       ├── card.tsx        # Card component
│       ├── input.tsx       # Input & Textarea
│       ├── badge.tsx       # Badge & StatusBadge
│       └── index.ts        # Exports
│
├── lib/
│   ├── utils.ts            # Utility functions (cn, formatAddress, etc.)
│   └── constants.ts        # Design tokens, breakpoints, routes
│
└── hooks/
    └── use-mobile.ts       # Mobile detection hooks
```

---

## 🎨 UI Components

### Button
```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md">
  Click me
</Button>

// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
// Props: loading, fullWidth, leftIcon, rightIcon
```

### Card
```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui";

<Card variant="glass" hoverable>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardBody>
    Content
  </CardBody>
  <CardFooter>
    Actions
  </CardFooter>
</Card>

// Variants: default, glass, bordered, elevated
// Padding: none, sm, md, lg
```

### Input
```tsx
import { Input, Textarea } from "@/components/ui";

<Input
  label="Email"
  type="email"
  error={errors.email}
  helperText="Helper text"
  leftIcon={<Icon />}
/>

<Textarea
  label="Description"
  rows={4}
/>
```

### Badge
```tsx
import { Badge, StatusBadge } from "@/components/ui";

<Badge variant="success" dot>
  Active
</Badge>

<StatusBadge status="pending" />

// Variants: default, success, warning, error, info, purple
// Sizes: sm, md, lg
// Status: active, pending, completed, failed, cancelled
```

### Modal
```tsx
import { Modal, ModalBody, ModalFooter } from "@/components/ui";

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <ModalBody>
    Content here
  </ModalBody>
  <ModalFooter>
    <Button onClick={handleAction}>Confirm</Button>
  </ModalFooter>
</Modal>

// Sizes: sm, md, lg, full
// Features: backdrop, scroll lock, ESC key, overlay click
```

### Skeleton
```tsx
import { Skeleton, SkeletonGroup, SkeletonCard } from "@/components/ui";

<Skeleton variant="text" />
<Skeleton variant="circular" width={64} height={64} />
<SkeletonGroup count={3} variant="text" />
<SkeletonCard showAvatar lines={3} />

// Variants: default, circular, text, button, card
// Speed: slow, normal, fast
```

### Container
```tsx
import { Container } from "@/components/layout";

<Container size="xl" padding="md">
  <h1>Content</h1>
</Container>

// Sizes: sm, md, lg, xl, 2xl, full
// Padding: none, sm, md, lg
// Auto-centered by default
```

### Navbar
```tsx
import { Navbar } from "@/components/layout";

// Automatically included in layout.tsx
<Navbar showWallet />

// Features:
// - Sticky positioning (z-50)
// - Mobile hamburger menu
// - Desktop horizontal nav
// - Mock wallet with adaptive display
// - Touch-optimized (44px+)
```

### Footer
```tsx
import { Footer } from "@/components/layout";

// Automatically included in layout.tsx
<Footer showSocial />

// Features:
// - Responsive grid (1→2→4 columns)
// - Social media links
// - Quick links and resources
// - Copyright and legal links
```

---

## 🎯 Design System

### Colors
- **Primary:** Purple (#9333ea, #7e22ce, #6b21a8)
- **Background:** Slate (#0f172a, #1e293b, #334155)
- **Status:** Success (green), Warning (amber), Error (red), Info (blue)

### Breakpoints
```typescript
mobile:  < 640px  (default, no prefix)
sm:      640px+
md:      768px+   (main mobile/desktop split)
lg:      1024px+
xl:      1280px+
2xl:     1536px+
```

### Touch Targets
- Minimum: 44px (mobile)
- Comfortable: 48px
- Large: 56px (primary actions)

---

## 🛠️ Utilities

### `cn()` - Class Name Merger
```tsx
import { cn } from "@/lib/utils";

cn("base-class", condition && "conditional-class")
// Merges Tailwind classes intelligently
```

### `useMobile()` - Mobile Detection
```tsx
import { useMobile } from "@/hooks/use-mobile";

const { isMobile, isTablet, isDesktop, width } = useMobile();

if (isMobile) {
  // Mobile-specific logic
}
```

### Format Utilities
```tsx
import { formatAddress, formatBalance, formatNumber } from "@/lib/utils";

formatAddress("0x1234...5678", true)  // "0x12...78" (mobile)
formatBalance(1.23456, false)         // "1.2346 ETH"
formatNumber(1234567)                 // "1.2M"
```

---

## 📐 Development Progress

Check `PROGRESS.md` for detailed implementation checklist.

### ✅ Completed
- [x] Phase 1: Foundations (Tailwind, utils, hooks)
- [x] Phase 2: UI Primitives (Button, Card, Input, Badge, Modal, Skeleton)
- [x] Phase 3: Layout (Navbar, Footer, Container)

### 🚧 Next Steps
- [ ] Phase 4: Mock Data & Store
- [ ] Phase 5: Feature Components - Marketplace
- [ ] Phase 6: Feature Components - Marriage DAO
- [ ] Phase 7: Pages
- [ ] Phase 8: Polish (animations, loading states)

---

## 🔥 Features (Planned)

### Time Marketplace
- Seller registration
- Time contract creation
- Contract status tracking
- Mobile-optimized forms

### Marriage DAO
- Proposal creation
- Balance management
- Voting system
- Emergency exit

---

## 🧪 Testing Components

Visit `/demo` to see all components in action:
- All button variants and sizes
- All card types
- Form inputs with validation
- Badge variations
- Responsive behavior

Try resizing your browser to see mobile/desktop adaptations!

---

## 📚 Tech Stack

- **Framework:** Next.js 15.0.3
- **React:** 19.0.0-rc
- **TypeScript:** 5+
- **Styling:** Tailwind CSS v4
- **State:** Zustand (coming soon)
- **Animations:** Framer Motion (coming soon)
- **Web3:** RainbowKit + Wagmi (coming soon)

---

## 🎯 Design Philosophy

1. **Mobile First:** Start with mobile, enhance for desktop
2. **Touch Optimized:** All interactions designed for touch
3. **Progressive Enhancement:** Core functionality works everywhere
4. **Accessible:** WCAG AAA contrast, keyboard navigation
5. **Performant:** Lazy loading, optimized bundles

---

## 📄 License

MIT

---

Built with 💜 for the Web3 community
