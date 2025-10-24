"use client";

import Link from "next/link";
import { Button, Card, CardBody, Badge } from "@/components/ui";
import { useMobile } from "@/hooks/use-mobile";

export default function Home() {
  const { isMobile } = useMobile();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto text-center space-y-8 sm:space-y-12 py-20">
          {/* Logo & Title */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-xl shadow-purple-900/50">
                <span className="text-3xl sm:text-5xl">🕐</span>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight">
              Time<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">DAO</span>
            </h1>
            
            <p className="text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto px-4">
              Decentralized time marketplace and on-chain relationship management
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Badge variant="purple" size={isMobile ? "sm" : "md"}>Decentralized</Badge>
              <Badge variant="info" size={isMobile ? "sm" : "md"}>Transparent</Badge>
              <Badge variant="success" size={isMobile ? "sm" : "md"}>Trustless</Badge>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 max-w-2xl mx-auto">
            <Button variant="primary" size="lg" fullWidth={isMobile}>
              <Link href="/marketplace" className="flex items-center gap-2 w-full justify-center">
                🏪 Time Marketplace
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" fullWidth={isMobile}>
              <Link href="/marriage" className="flex items-center gap-2 w-full justify-center">
                💍 Marriage DAO
              </Link>
            </Button>
          </div>
          
          <div className="pt-4">
            <Link href="/demo">
              <Button variant="ghost" size={isMobile ? "sm" : "md"}>
                View Components Demo →
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Two Powerful dApps
            </h2>
            <p className="text-base sm:text-xl text-slate-300">
              Built with mobile-first design for the Web3 future
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Time Marketplace */}
            <Card variant="glass" hoverable padding="lg">
              <CardBody>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
                      <span className="text-2xl sm:text-3xl">🏪</span>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        Time Marketplace
                      </h3>
                      <Badge variant="success" size="sm" dot>Live</Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Tokenize and trade time commitments on the blockchain. Create contracts, verify work completion, and build trust through transparent on-chain records.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm sm:text-base font-semibold text-purple-400">Key Features:</h4>
                    <ul className="space-y-2 text-sm sm:text-base text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>Register as a seller and showcase your services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>Create time-based contracts with NFT proof</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>Buyer confirmation system for completed work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>On-chain reputation and track record</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button variant="primary" size="md" fullWidth>
                    <Link href="/marketplace" className="w-full text-center">
                      Explore Marketplace
                    </Link>
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            {/* Marriage DAO */}
            <Card variant="glass" hoverable padding="lg">
              <CardBody>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-700 flex items-center justify-center shadow-lg">
                      <span className="text-2xl sm:text-3xl">💍</span>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        Marriage DAO
                      </h3>
                      <Badge variant="warning" size="sm" dot>Coming Soon</Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    On-chain relationship management with shared treasury and democratic decision-making. A modern take on commitment in the Web3 era.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm sm:text-base font-semibold text-purple-400">Key Features:</h4>
                    <ul className="space-y-2 text-sm sm:text-base text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>Create partnership proposals on-chain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>Shared treasury with joint control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>Democratic voting on financial decisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>Transparent withdrawal and exit mechanisms</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button variant="outline" size="md" fullWidth>
                    <Link href="/marriage" className="w-full text-center">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <Card variant="glass" padding="lg">
            <div className="text-center space-y-6 sm:space-y-8">
              <div className="text-6xl sm:text-8xl">⏳</div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white">
                Your Time is Your Most Valuable Asset
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
                <p className="leading-relaxed">
                  Every hour you dedicate to a project, every minute you invest in a relationship, every second of your expertise... it all has value.
                </p>
                <p className="leading-relaxed">
                  TimeDAO enables you to <span className="text-purple-400 font-semibold">tokenize that value</span>, create <span className="text-purple-400 font-semibold">verifiable commitments</span>, and build an <span className="text-purple-400 font-semibold">immutable reputation</span> that reflects your true impact.
                </p>
                <p className="leading-relaxed text-purple-300 font-medium pt-4">
                  Time is the only thing you can't get back. Let's make it count.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-sm sm:text-base text-slate-400">
            Built with 💜 for the Web3 community
          </p>
          <div className="flex justify-center gap-4 text-xs sm:text-sm">
            <Link href="/demo" className="text-purple-400 hover:text-purple-300 transition-colors">
              Components
            </Link>
            <span className="text-slate-600">•</span>
            <a href="https://github.com" className="text-purple-400 hover:text-purple-300 transition-colors">
              GitHub
            </a>
            <span className="text-slate-600">•</span>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
