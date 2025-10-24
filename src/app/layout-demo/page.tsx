"use client";

import { Container } from "@/components/layout";
import { Card, CardHeader, CardBody, Button } from "@/components/ui";

/**
 * Layout Demo Page
 * Showcase layout components with Navbar and Footer
 */
export default function LayoutDemoPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container size="xl" padding="md">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              Layout Components
            </h1>
            <p className="text-base sm:text-xl text-slate-300">
              Check the Navbar above and Footer below!
            </p>
          </div>
          
          {/* Navbar Info */}
          <Card variant="glass">
            <CardHeader>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                📱 Navbar Features
              </h2>
            </CardHeader>
            <CardBody>
              <ul className="space-y-3 text-sm sm:text-base text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Sticky positioning</strong> - Always visible at the top</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Mobile menu</strong> - Hamburger icon with slide-down navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Mock wallet</strong> - Click to connect/disconnect (shows address)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Adaptive display</strong> - Mobile: 0x12...34, Desktop: 0x1234...5678</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Touch-optimized</strong> - All targets 44px+ minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Backdrop blur</strong> - Semi-transparent with blur effect</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          {/* Container Sizes */}
          <Card variant="glass">
            <CardHeader>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                📦 Container Sizes
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-slate-300">
                  This page uses <code className="bg-slate-700 px-2 py-1 rounded text-purple-400">Container size="xl"</code>
                </p>
                
                <div className="space-y-2 text-sm text-slate-400">
                  <p>• <strong>sm</strong>: 640px max-width</p>
                  <p>• <strong>md</strong>: 768px max-width</p>
                  <p>• <strong>lg</strong>: 1024px max-width</p>
                  <p>• <strong>xl</strong>: 1280px max-width (current)</p>
                  <p>• <strong>2xl</strong>: 1536px max-width</p>
                  <p>• <strong>full</strong>: No max-width constraint</p>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Footer Info */}
          <Card variant="glass">
            <CardHeader>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                🦶 Footer Features
              </h2>
            </CardHeader>
            <CardBody>
              <ul className="space-y-3 text-sm sm:text-base text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Responsive grid</strong> - 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Social links</strong> - GitHub, Twitter, Discord, Telegram</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Quick links</strong> - Navigation to all main sections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Resources</strong> - Docs, FAQ, Support, API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span><strong>Legal</strong> - Privacy, Terms, Cookies</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              <a href="/">Back to Home</a>
            </Button>
            <Button variant="outline" size="lg">
              <a href="/demo">View UI Components</a>
            </Button>
          </div>
          
          {/* Scroll Hint */}
          <div className="text-center text-slate-400 text-sm">
            ⬇️ Scroll down to see the Footer ⬇️
          </div>
        </div>
      </Container>
    </div>
  );
}

