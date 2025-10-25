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
import { useContractMock } from "@/hooks/use-contract-mock";
import { mockSellers, mockMarketplaceStats, allSkills } from "@/lib/mock-data";
import { Seller, ContractStatus, Contract } from "@/types/marketplace";
import { formatAddress } from "@/lib/utils";
import { SellerCard, ContractCard, type ContractAction } from "@/components/features/marketplace";

/**
 * Marketplace Page
 * Browse sellers and create time contracts
 */
import Link from "next/link";

export default function MarketplacePage() {
  const { isMobile } = useMobile();
  const { 
    getMySellerContracts, 
    getMySellerProfile,
    acceptContract,
    completeContract,
  } = useContractMock();
  
  // User role state (for demo purposes)
  const [userRole, setUserRole] = useState<"buyer" | "seller">("buyer");
  const [showRoleModal, setShowRoleModal] = useState(true);
  
  // State for buyers
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "rate" | "recent">("rating");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // State for sellers
  const [contractStatusFilter, setContractStatusFilter] = useState<ContractStatus | "all">("all");
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  // Get seller data
  const sellerProfile = getMySellerProfile();
  const sellerContracts = getMySellerContracts();
  
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
  
  // Filter seller contracts
  const filteredSellerContracts = useMemo(() => {
    if (contractStatusFilter === "all") return sellerContracts;
    return sellerContracts.filter(c => c.status === contractStatusFilter);
  }, [sellerContracts, contractStatusFilter]);
  
  // Calculate seller stats
  const sellerStats = useMemo(() => {
    const totalEarnings = sellerContracts
      .filter(c => c.status === "confirmed")
      .reduce((sum, c) => sum + c.totalAmount, 0);
    
    const pendingCount = sellerContracts.filter(c => c.status === "pending").length;
    const activeCount = sellerContracts.filter(c => c.status === "active").length;
    const completedCount = sellerContracts.filter(c => c.status === "confirmed").length;
    
    return {
      totalEarnings,
      pendingCount,
      activeCount,
      completedCount,
      totalContracts: sellerContracts.length,
    };
  }, [sellerContracts]);
  
  // Handle contract actions (seller)
  const handleContractAction = async (action: ContractAction, contract: Contract) => {
    setIsActionLoading(true);
    try {
      switch (action) {
        case "accept":
          await acceptContract(contract.id);
          alert(`Contract "${contract.title}" accepted!`);
          break;
        case "complete":
          // In real app, would open modal for work proof
          const workProof = prompt("Enter work proof URL (e.g., GitHub repo, figma link):");
          if (workProof) {
            await completeContract(contract.id, workProof);
            alert(`Contract "${contract.title}" marked as complete!`);
          }
          break;
        case "view":
          alert(`Viewing contract: ${contract.title}`);
          break;
        default:
          alert(`Action ${action} not implemented yet`);
      }
    } catch (error) {
      console.error("Contract action error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsActionLoading(false);
    }
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
                    {userRole === "buyer" 
                      ? "Find talented professionals and tokenize their time"
                      : "Manage your contracts and showcase your skills"
                    }
                  </p>
                </div>
              </div>
              
              {/* Role Switcher & Links */}
              <div className="flex items-center gap-2">
                {/* Role Toggle */}
                <div className="flex items-center gap-1 bg-slate-800/50 backdrop-blur rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setUserRole("buyer")}
                    className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                      userRole === "buyer"
                        ? "bg-purple-700 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    🛒 Buyer
                  </button>
                  <button
                    onClick={() => setUserRole("seller")}
                    className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                      userRole === "seller"
                        ? "bg-purple-700 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    💼 Seller
                  </button>
                </div>
                
                {/* Link to components demo */}
                <Link href="/marketplace-demo">
                  <Button variant="outline" size="sm">
                    🎨
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Role Badge */}
            <div className="flex items-center gap-2">
              <Badge 
                variant={userRole === "buyer" ? "info" : "purple"}
                size="md"
              >
                {userRole === "buyer" ? "👤 Viewing as Buyer" : "💼 Viewing as Seller"}
              </Badge>
              <button
                onClick={() => setShowRoleModal(true)}
                className="text-xs text-purple-400 hover:text-purple-300 underline"
              >
                Switch role
              </button>
            </div>
          </div>
          
          {/* Quick Actions for Buyer */}
          {userRole === "buyer" && (
            <Card variant="glass">
              <CardBody>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Welcome Back, Buyer
                    </h3>
                    <p className="text-sm text-slate-400">
                      Find sellers or manage your active contracts
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Link href="/marketplace/contracts">
                      <Button variant="primary" size="md" fullWidth>
                        📝 My Contracts
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
          
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
          
          {/* Seller View: Profile & Stats */}
          {userRole === "seller" && sellerProfile && (
            <Card variant="glass">
              <CardBody>
                <div className="space-y-6">
                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="text-6xl">👤</div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                        <h3 className="text-2xl font-bold text-white">{sellerProfile.name}</h3>
                        {sellerProfile.verified && (
                          <Badge variant="success" size="sm">✓ Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{sellerProfile.bio}</p>
                      <div className="flex items-center gap-4 justify-center sm:justify-start text-sm">
                        <span className="flex items-center gap-1">
                          <span>⭐</span>
                          <span className="font-semibold text-white">{sellerProfile.rating.toFixed(1)}</span>
                        </span>
                        <span className="text-slate-400">
                          {sellerProfile.completedContracts}/{sellerProfile.totalContracts} completed
                        </span>
                        <Badge 
                          variant={
                            sellerProfile.availability === "available" ? "success" :
                            sellerProfile.availability === "busy" ? "warning" : "default"
                          }
                          size="sm"
                        >
                          {sellerProfile.availability}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      📝 Edit Profile
                    </Button>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="text-center space-y-1 p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400">Total Earnings</p>
                      <p className="text-xl font-bold text-purple-400">
                        {sellerStats.totalEarnings.toFixed(2)} ETH
                      </p>
                    </div>
                    <div className="text-center space-y-1 p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400">Pending</p>
                      <p className="text-xl font-bold text-amber-400">
                        {sellerStats.pendingCount}
                      </p>
                    </div>
                    <div className="text-center space-y-1 p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400">Active</p>
                      <p className="text-xl font-bold text-blue-400">
                        {sellerStats.activeCount}
                      </p>
                    </div>
                    <div className="text-center space-y-1 p-3 bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-400">Completed</p>
                      <p className="text-xl font-bold text-green-400">
                        {sellerStats.completedCount}
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
          
          {/* Seller View: Contract Filters */}
          {userRole === "seller" && (
            <Card variant="glass">
              <CardBody>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      My Contracts
                    </h3>
                    <p className="text-sm text-slate-400">
                      {filteredSellerContracts.length} contract{filteredSellerContracts.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  
                  {/* Status Filters */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setContractStatusFilter("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        contractStatusFilter === "all"
                          ? "bg-purple-700 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      All ({sellerContracts.length})
                    </button>
                    <button
                      onClick={() => setContractStatusFilter("pending")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        contractStatusFilter === "pending"
                          ? "bg-amber-600 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      Pending ({sellerStats.pendingCount})
                    </button>
                    <button
                      onClick={() => setContractStatusFilter("active")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        contractStatusFilter === "active"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      Active ({sellerStats.activeCount})
                    </button>
                    <button
                      onClick={() => setContractStatusFilter("completed")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        contractStatusFilter === "completed"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      Awaiting Confirmation
                    </button>
                    <button
                      onClick={() => setContractStatusFilter("confirmed")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        contractStatusFilter === "confirmed"
                          ? "bg-green-600 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      Confirmed ({sellerStats.completedCount})
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
          
          {/* Filters (only show for buyers) */}
          {userRole === "buyer" && (
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
          )}
          
          {/* Results Count (only for buyers) */}
          {userRole === "buyer" && (
          <div className="flex items-center justify-between">
            <p className="text-sm sm:text-base text-slate-400">
              Found <strong className="text-white">{filteredSellers.length}</strong> seller{filteredSellers.length !== 1 ? "s" : ""}
            </p>
          </div>
          )}
          
          {/* Sellers Grid (only for buyers) */}
          {userRole === "buyer" && filteredSellers.length === 0 ? (
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
          ) : userRole === "buyer" ? (
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
          ) : null}
          
          {/* Seller View: Contracts List */}
          {userRole === "seller" && (
            <>
              {filteredSellerContracts.length === 0 ? (
                <Card variant="glass" padding="lg">
                  <div className="text-center space-y-3 py-8">
                    <p className="text-4xl">
                      {contractStatusFilter === "all" ? "📭" : "🔍"}
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-white">
                      {contractStatusFilter === "all" 
                        ? "No contracts yet"
                        : `No ${contractStatusFilter} contracts`
                      }
                    </p>
                    <p className="text-sm sm:text-base text-slate-400">
                      {contractStatusFilter === "all"
                        ? "Start by creating your profile and sharing your skills"
                        : "Try selecting a different filter"
                      }
                    </p>
                    {contractStatusFilter !== "all" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setContractStatusFilter("all")}
                      >
                        View All Contracts
                      </Button>
                    )}
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredSellerContracts.map((contract) => (
                    <ContractCard
                      key={contract.id}
                      contract={contract}
                      viewMode="seller"
                      onAction={handleContractAction}
                    />
                  ))}
                </div>
              )}
              
              {/* Quick Actions */}
              {sellerContracts.length === 0 && (
                <Card variant="elevated" padding="md">
                  <div className="text-center space-y-4">
                    <div className="text-5xl">🚀</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">
                        Get Started as a Seller
                      </h3>
                      <p className="text-sm text-slate-400 max-w-md mx-auto">
                        Complete your profile and start receiving contract requests from buyers
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <Button variant="primary" size="lg">
                        Complete Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => setUserRole("buyer")}
                      >
                        Browse as Buyer
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </Container>
      
      {/* Role Selection Modal */}
      <Modal
        open={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        size="md"
      >
        <ModalBody>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Choose Your Role
              </h2>
              <p className="text-sm text-slate-400">
                Select how you want to use the marketplace
              </p>
            </div>
            
            {/* Role Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Buyer Card */}
              <Card
                variant={userRole === "buyer" ? "elevated" : "glass"}
                hoverable
                className="cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all"
                onClick={() => {
                  setUserRole("buyer");
                  setShowRoleModal(false);
                }}
              >
                <CardBody>
                  <div className="text-center space-y-3">
                    <div className="text-5xl">🛒</div>
                    <h3 className="text-xl font-bold text-white">Buyer</h3>
                    <p className="text-sm text-slate-400">
                      Browse sellers and hire talent
                    </p>
                    <ul className="text-xs text-slate-500 space-y-1">
                      <li>• Search for sellers</li>
                      <li>• Create contracts</li>
                      <li>• Track your purchases</li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
              
              {/* Seller Card */}
              <Card
                variant={userRole === "seller" ? "elevated" : "glass"}
                hoverable
                className="cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all"
                onClick={() => {
                  setUserRole("seller");
                  setShowRoleModal(false);
                }}
              >
                <CardBody>
                  <div className="text-center space-y-3">
                    <div className="text-5xl">💼</div>
                    <h3 className="text-xl font-bold text-white">Seller</h3>
                    <p className="text-sm text-slate-400">
                      Offer your time and skills
                    </p>
                    <ul className="text-xs text-slate-500 space-y-1">
                      <li>• Create your profile</li>
                      <li>• Set your rate</li>
                      <li>• Manage contracts</li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-slate-500">
                You can switch roles anytime using the toggle in the header
              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>
      
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

