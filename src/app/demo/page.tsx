"use client";

import { useState } from "react";
import { 
  Button, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Input,
  Textarea,
  Badge,
  StatusBadge,
  Modal,
  ModalBody,
  ModalFooter,
  Skeleton,
  SkeletonGroup,
  SkeletonCard,
} from "@/components/ui";
import { useMobile } from "@/hooks/use-mobile";

/**
 * Demo Page
 * Showcase all UI components with mobile-responsive design
 */
export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const { isMobile, width } = useMobile();
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(false);
  
  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length < 3) {
      setInputError("Minimum 3 characters required");
    } else {
      setInputError("");
    }
  };
  
  return (
    <div className="min-h-screen p-3 sm:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            TimeDAO Components
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Mobile-first UI primitives demo
          </p>
          <Badge variant="purple" size="md">
            {isMobile ? "📱 Mobile" : "🖥️ Desktop"} - {width}px
          </Badge>
        </div>
        
        {/* Buttons Section */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Buttons
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Touch-optimized with 44px+ minimum height
            </p>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-6">
              {/* Primary Buttons */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Primary Buttons
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="primary" size="sm">
                    Small
                  </Button>
                  <Button variant="primary" size="md">
                    Medium
                  </Button>
                  <Button variant="primary" size="lg">
                    Large
                  </Button>
                </div>
              </div>
              
              {/* All Variants */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  All Variants
                </h3>
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>
              
              {/* States */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  States
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="primary" loading={loading} onClick={handleLoadingDemo}>
                    {loading ? "Loading..." : "Click to Load"}
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
              
              {/* Full Width */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Full Width
                </h3>
                <Button variant="primary" fullWidth>
                  Full Width Button
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Cards Section */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Cards
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Responsive containers with multiple variants
            </p>
          </CardHeader>
          
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card variant="default" hoverable>
                <CardHeader>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Default Card</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-sm sm:text-base text-slate-300">
                    Hover me! This card has the default variant with hover effect.
                  </p>
                </CardBody>
              </Card>
              
              <Card variant="glass">
                <CardHeader>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Glass Card</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-sm sm:text-base text-slate-300">
                    Glass morphism effect with backdrop blur.
                  </p>
                </CardBody>
              </Card>
              
              <Card variant="bordered" hoverable>
                <CardHeader>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Bordered Card</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-sm sm:text-base text-slate-300">
                    Transparent background with border.
                  </p>
                </CardBody>
              </Card>
              
              <Card variant="elevated">
                <CardHeader>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Elevated Card</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-sm sm:text-base text-slate-300">
                    Elevated with shadow for depth.
                  </p>
                </CardBody>
                <CardFooter>
                  <Button variant="primary" size="sm">Action</Button>
                </CardFooter>
              </Card>
            </div>
          </CardBody>
        </Card>
        
        {/* Inputs Section */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Inputs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Touch-friendly forms with validation
            </p>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                helperText="We'll never share your email"
              />
              
              <Input
                label="Username"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                error={inputError}
                placeholder="Enter username"
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
              />
              
              <Input
                label="Disabled Input"
                type="text"
                value="Cannot edit this"
                disabled
              />
              
              <Textarea
                label="Description"
                placeholder="Enter a description..."
                rows={4}
                helperText="Maximum 500 characters"
              />
            </div>
          </CardBody>
        </Card>
        
        {/* Badges Section */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Badges
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Status indicators with multiple variants
            </p>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-6">
              {/* All Variants */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="purple">Purple</Badge>
                </div>
              </div>
              
              {/* With Dots */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  With Dot Indicators
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" dot>Active</Badge>
                  <Badge variant="warning" dot>Pending</Badge>
                  <Badge variant="error" dot>Failed</Badge>
                  <Badge variant="info" dot>Processing</Badge>
                </div>
              </div>
              
              {/* Sizes */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Sizes
                </h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="purple" size="sm">Small</Badge>
                  <Badge variant="purple" size="md">Medium</Badge>
                  <Badge variant="purple" size="lg">Large</Badge>
                </div>
              </div>
              
              {/* Status Badges */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Status Badges (Pre-configured)
                </h3>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="active" />
                  <StatusBadge status="pending" />
                  <StatusBadge status="completed" />
                  <StatusBadge status="failed" />
                  <StatusBadge status="cancelled" />
                </div>
              </div>
              
              {/* Rounded */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Rounded Styles
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="purple" rounded="default">Default</Badge>
                  <Badge variant="purple" rounded="full">Fully Rounded</Badge>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Modals Section */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Modals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Mobile-optimized dialogs with backdrop
            </p>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
                
                <Button variant="outline" onClick={() => setConfirmModalOpen(true)}>
                  Open Confirm Dialog
                </Button>
              </div>
              
              <div className="text-xs sm:text-sm text-slate-400 space-y-1">
                <p>• Full-screen on mobile, centered on desktop</p>
                <p>• Click outside or press ESC to close</p>
                <p>• Body scroll lock when open</p>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Skeletons Section */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Skeletons
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Loading states with shimmer animation
            </p>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-6">
              {/* Toggle */}
              <div className="flex items-center gap-3">
                <Button 
                  variant={showSkeletons ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => setShowSkeletons(!showSkeletons)}
                >
                  {showSkeletons ? "Hide" : "Show"} Skeletons
                </Button>
                <span className="text-xs sm:text-sm text-slate-400">
                  Toggle to see loading states
                </span>
              </div>
              
              {showSkeletons && (
                <div className="space-y-6">
                  {/* Text Skeletons */}
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      Text Lines
                    </h3>
                    <SkeletonGroup count={3} variant="text" />
                  </div>
                  
                  {/* Different Variants */}
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      Variants
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton variant="circular" width={48} height={48} />
                        <div className="flex-1">
                          <Skeleton variant="text" width="60%" />
                        </div>
                      </div>
                      
                      <Skeleton variant="button" />
                      
                      <Skeleton variant="card" />
                    </div>
                  </div>
                  
                  {/* Card Skeleton */}
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      Card Skeleton
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SkeletonCard showAvatar lines={3} />
                      <SkeletonCard showAvatar={false} lines={2} />
                    </div>
                  </div>
                </div>
              )}
              
              {!showSkeletons && (
                <div className="text-center py-8 text-slate-400">
                  Click "Show Skeletons" to see loading states
                </div>
              )}
            </div>
          </CardBody>
        </Card>
        
        {/* Mobile Info */}
        <Card variant="elevated" padding="md">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              📱 Responsive Design Info
            </h3>
            <div className="space-y-1 text-sm sm:text-base text-slate-300">
              <p>Screen Width: <strong>{width}px</strong></p>
              <p>Device Type: <strong>{isMobile ? "Mobile" : "Desktop"}</strong></p>
              <p>Resize your browser to see responsive changes!</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Modal Examples */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Example Modal"
        description="This is a mobile-optimized modal dialog"
        size="md"
      >
        <ModalBody>
          <div className="space-y-4">
            <p>
              This modal is fully responsive and works great on both mobile and desktop devices.
            </p>
            <p>
              Try resizing your browser window to see how it adapts!
            </p>
            <Input
              label="Your Name"
              placeholder="Enter your name"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
      
      <Modal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm Action"
        size="sm"
      >
        <ModalBody>
          <p>Are you sure you want to proceed with this action?</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setConfirmModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setConfirmModalOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

