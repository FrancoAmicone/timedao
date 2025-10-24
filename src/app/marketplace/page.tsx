"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout";
import { 
  Card, 
  CardHeader, 
  CardBody,
  Button, 
  Input,
  Badge,
  StatusBadge,
  Modal,
  ModalBody,
  ModalFooter,
} from "@/components/ui";
import { useMobile } from "@/hooks/use-mobile";
import { mockSellers, mockMarketplaceStats, allSkills } from "@/lib/mock-data";
import { Seller } from "@/types/marketplace";
import { formatAddress } from "@/lib/utils";

/**
 * Marketplace Page
 * Browse sellers and create time contracts
 */
import Link from "next/link";

export default function MarketplacePage() {
  const { isMobile } = useMobile();
  
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "rate" | "recent">("rating");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Filtered and sorted sellers
  const filteredSellers = useMemo(() => {
    let filtered = mockSellers;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s => 
          s.name.toLowerCase().includes(query) ||
          s.bio.toLowerCase().includes(query) ||
          s.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(s =>
        selectedSkills.every(skill => s.skills.includes(skill))
      );
    }
    
    // Verified filter
    if (showVerifiedOnly) {
      filtered = filtered.filter(s => s.verified);
    }
    
    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "rate":
          return a.hourlyRate - b.hourlyRate;
        case "recent":
          return b.joinedAt.getTime() - a.joinedAt.getTime();
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [searchQuery, selectedSkills, sortBy, showVerifiedOnly]);
  
  // Toggle skill filter
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };
  
  // Open seller modal
  const handleSellerClick = (seller: Seller) => {
    setSelectedSeller(seller);
    setModalOpen(true);
  };
  
  return (
    <div className="py-8 sm:py-12">
      <Container size="2xl" padding="md">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl">🏪</span>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-bold text-white">
                    Time Marketplace
                  </h1>
                  <p className="text-sm sm:text-base text-slate-400 mt-1">
                    Find talented professionals and tokenize their time
                  </p>
                </div>
              </div>
              
              {/* Link to components demo */}
              <Link href="/marketplace-demo">
                <Button variant="outline" size="sm">
                  🎨 View Components
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">Sellers</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {mockMarketplaceStats.totalSellers}
                </p>
              </div>
            </Card>
            
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">Contracts</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {mockMarketplaceStats.totalContracts}
                </p>
              </div>
            </Card>
            
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">Volume</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                  {mockMarketplaceStats.totalVolume.toFixed(1)} ETH
                </p>
              </div>
            </Card>
            
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">Avg Rate</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                  {mockMarketplaceStats.averageRate.toFixed(2)} ETH
                </p>
              </div>
            </Card>
          </div>
          
          {/* Filters */}
          <Card variant="glass">
            <CardBody>
              <div className="space-y-4">
                {/* Search */}
                <Input
                  placeholder="Search by name, skills, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<span>🔍</span>}
                />
                
                {/* Sort & Filter Options */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSortBy("rating")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        sortBy === "rating"
                          ? "bg-purple-700 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      ⭐ Top Rated
                    </button>
                    <button
                      onClick={() => setSortBy("rate")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        sortBy === "rate"
                          ? "bg-purple-700 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      💰 Lowest Rate
                    </button>
                    <button
                      onClick={() => setSortBy("recent")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        sortBy === "recent"
                          ? "bg-purple-700 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      🆕 Recent
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      showVerifiedOnly
                        ? "bg-green-700 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    ✓ Verified Only
                  </button>
                </div>
                
                {/* Skills Filter */}
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-slate-400">
                    Filter by Skills:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.slice(0, isMobile ? 6 : 12).map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "purple" : "default"}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Active Filters */}
                {(searchQuery || selectedSkills.length > 0 || showVerifiedOnly) && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <span>Active filters:</span>
                    {searchQuery && <Badge size="sm">Search: {searchQuery}</Badge>}
                    {selectedSkills.map(skill => (
                      <Badge key={skill} size="sm" variant="purple">
                        {skill}
                      </Badge>
                    ))}
                    {showVerifiedOnly && <Badge size="sm" variant="success">Verified</Badge>}
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedSkills([]);
                        setShowVerifiedOnly(false);
                      }}
                      className="text-purple-400 hover:text-purple-300 underline ml-2"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
          
          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-base text-slate-400">
              Found <strong className="text-white">{filteredSellers.length}</strong> seller{filteredSellers.length !== 1 ? "s" : ""}
            </p>
          </div>
          
          {/* Sellers Grid */}
          {filteredSellers.length === 0 ? (
            <Card variant="glass" padding="lg">
              <div className="text-center space-y-3 py-8">
                <p className="text-4xl">😔</p>
                <p className="text-lg sm:text-xl font-semibold text-white">
                  No sellers found
                </p>
                <p className="text-sm sm:text-base text-slate-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredSellers.map((seller) => (
                <Card
                  key={seller.id}
                  variant="glass"
                  hoverable
                  className="cursor-pointer"
                  onClick={() => handleSellerClick(seller)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="text-4xl sm:text-5xl">{seller.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                            {seller.name}
                          </h3>
                          {seller.verified && (
                            <span className="text-green-400 flex-shrink-0" title="Verified">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-slate-400 truncate">
                          {formatAddress(seller.address, isMobile)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardBody>
                    <div className="space-y-4">
                      {/* Bio */}
                      <p className="text-sm text-slate-300 line-clamp-2">
                        {seller.bio}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span className="font-semibold text-white">{seller.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <span>📝</span>
                          <span>{seller.completedContracts} contracts</span>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {seller.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} size="sm" variant="purple">
                            {skill}
                          </Badge>
                        ))}
                        {seller.skills.length > 3 && (
                          <Badge size="sm" variant="default">
                            +{seller.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Rate & Availability */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div>
                          <p className="text-xs text-slate-400">Hourly Rate</p>
                          <p className="text-lg font-bold text-purple-400">
                            {seller.hourlyRate.toFixed(2)} ETH
                          </p>
                        </div>
                        <StatusBadge
                          status={
                            seller.availability === "available" ? "active" :
                            seller.availability === "busy" ? "pending" :
                            "cancelled"
                          }
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
      
      {/* Seller Detail Modal */}
      {selectedSeller && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedSeller.name}
          description={formatAddress(selectedSeller.address, false)}
          size="lg"
        >
          <ModalBody>
            <div className="space-y-6">
              {/* Avatar & Stats */}
              <div className="flex items-center gap-4">
                <div className="text-6xl">{selectedSeller.avatar}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">{selectedSeller.name}</h3>
                    {selectedSeller.verified && (
                      <Badge variant="success" size="sm">✓ Verified</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <span>⭐</span>
                      <span className="font-semibold">{selectedSeller.rating.toFixed(1)}</span>
                      <span className="text-slate-400">rating</span>
                    </span>
                    <span className="text-slate-400">
                      {selectedSeller.completedContracts}/{selectedSeller.totalContracts} completed
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Bio */}
              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2">About</h4>
                <p className="text-base text-slate-300">{selectedSeller.bio}</p>
              </div>
              
              {/* Skills */}
              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSeller.skills.map((skill) => (
                    <Badge key={skill} variant="purple">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              {/* Rate & Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-2">Hourly Rate</h4>
                  <p className="text-2xl font-bold text-purple-400">
                    {selectedSeller.hourlyRate.toFixed(2)} ETH
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    ~${(selectedSeller.hourlyRate * 2000).toFixed(0)} USD
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-2">Availability</h4>
                  <StatusBadge
                    status={
                      selectedSeller.availability === "available" ? "active" :
                      selectedSeller.availability === "busy" ? "pending" :
                      "cancelled"
                    }
                  />
                </div>
              </div>
              
              {/* Joined Date */}
              <div>
                <h4 className="text-sm font-semibold text-slate-400 mb-1">Member Since</h4>
                <p className="text-sm text-slate-300">
                  {selectedSeller.joinedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              disabled={selectedSeller.availability !== "available"}
            >
              Create Contract
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

