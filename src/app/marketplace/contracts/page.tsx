"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/layout";
import { 
  Card, 
  CardBody,
  Button, 
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@/components/ui";
import { useMobile } from "@/hooks/use-mobile";
import { useContractMock } from "@/hooks/use-contract-mock";
import { useWalletMock } from "@/hooks/use-wallet-mock";
import { ContractStatus, Contract } from "@/types/marketplace";
import { ContractCard, type ContractAction } from "@/components/features/marketplace";

/**
 * My Contracts Page (Buyer View)
 * Manage contracts as a buyer
 */
export default function MyContractsPage() {
  const { isMobile } = useMobile();
  const { isConnected } = useWalletMock();
  const { 
    getMyBuyerContracts,
    confirmContract,
    cancelContract,
  } = useContractMock();
  
  // State
  const [contractStatusFilter, setContractStatusFilter] = useState<ContractStatus | "all">("all");
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  
  // Get buyer contracts
  const buyerContracts = getMyBuyerContracts();
  
  // Filter contracts
  const filteredContracts = useMemo(() => {
    if (contractStatusFilter === "all") return buyerContracts;
    return buyerContracts.filter(c => c.status === contractStatusFilter);
  }, [buyerContracts, contractStatusFilter]);
  
  // Calculate buyer stats
  const buyerStats = useMemo(() => {
    const totalSpent = buyerContracts
      .filter(c => c.status === "confirmed")
      .reduce((sum, c) => sum + c.totalAmount, 0);
    
    const pendingCount = buyerContracts.filter(c => c.status === "pending").length;
    const activeCount = buyerContracts.filter(c => c.status === "active").length;
    const completedCount = buyerContracts.filter(c => c.status === "completed").length;
    const confirmedCount = buyerContracts.filter(c => c.status === "confirmed").length;
    
    return {
      totalSpent,
      pendingCount,
      activeCount,
      completedCount,
      confirmedCount,
      totalContracts: buyerContracts.length,
    };
  }, [buyerContracts]);
  
  // Handle contract actions (buyer)
  const handleContractAction = async (action: ContractAction, contract: Contract) => {
    switch (action) {
      case "confirm":
        // Open confirmation modal
        setSelectedContract(contract);
        setConfirmModalOpen(true);
        break;
      case "cancel":
        if (confirm(`Are you sure you want to cancel the contract "${contract.title}"?`)) {
          setIsActionLoading(true);
          try {
            await cancelContract(contract.id);
            alert(`Contract "${contract.title}" cancelled!`);
          } catch (error) {
            console.error("Cancel error:", error);
            alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
          } finally {
            setIsActionLoading(false);
          }
        }
        break;
      case "view":
        alert(`Viewing contract: ${contract.title}\n\nThis would navigate to /marketplace/contracts/${contract.id}`);
        break;
      default:
        alert(`Action ${action} not implemented yet`);
    }
  };
  
  // Handle confirm contract with rating
  const handleConfirmSubmit = async () => {
    if (!selectedContract) return;
    
    if (rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5");
      return;
    }
    
    setIsActionLoading(true);
    try {
      const result = await confirmContract(selectedContract.id, rating, feedback);
      alert(`Contract confirmed! 🎉\n\nNFT Token ID: ${result.tokenId}\n\nPayment released to seller.`);
      setConfirmModalOpen(false);
      setSelectedContract(null);
      setRating(5);
      setFeedback("");
    } catch (error) {
      console.error("Confirm error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsActionLoading(false);
    }
  };
  
  // Not connected state
  if (!isConnected) {
    return (
      <div className="py-12 sm:py-16">
        <Container size="lg" padding="md">
          <Card variant="glass" padding="lg">
            <div className="text-center space-y-4 py-8">
              <div className="text-6xl">🔒</div>
              <h2 className="text-2xl font-bold text-white">
                Connect Your Wallet
              </h2>
              <p className="text-slate-400">
                Please connect your wallet to view your contracts
              </p>
              <Button variant="primary" size="lg">
                Connect Wallet
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
  
  return (
    <div className="py-8 sm:py-12">
      <Container size="2xl" padding="md">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl">📝</span>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-bold text-white">
                    My Contracts
                  </h1>
                  <p className="text-sm sm:text-base text-slate-400 mt-1">
                    Manage your time contracts as a buyer
                  </p>
                </div>
              </div>
              
              {/* Back to Marketplace */}
              <Link href="/marketplace">
                <Button variant="outline" size="sm">
                  ← Back to Marketplace
                </Button>
              </Link>
            </div>
            
            {/* Buyer Badge */}
            <Badge variant="info" size="md">
              🛒 Buyer View
            </Badge>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">Total Spent</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-400">
                  {buyerStats.totalSpent.toFixed(2)} ETH
                </p>
              </div>
            </Card>
            
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-amber-400">
                  {buyerStats.pendingCount}
                </p>
              </div>
            </Card>
            
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">Active</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-400">
                  {buyerStats.activeCount}
                </p>
              </div>
            </Card>
            
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">To Confirm</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-400">
                  {buyerStats.completedCount}
                </p>
              </div>
            </Card>
            
            <Card variant="glass" padding="sm">
              <div className="text-center space-y-1">
                <p className="text-xs sm:text-sm text-slate-400">Confirmed</p>
                <p className="text-xl sm:text-2xl font-bold text-green-400">
                  {buyerStats.confirmedCount}
                </p>
              </div>
            </Card>
          </div>
          
          {/* Filters */}
          <Card variant="glass">
            <CardBody>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Filter Contracts
                  </h3>
                  <p className="text-sm text-slate-400">
                    {filteredContracts.length} contract{filteredContracts.length !== 1 ? "s" : ""}
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
                    All ({buyerContracts.length})
                  </button>
                  <button
                    onClick={() => setContractStatusFilter("pending")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      contractStatusFilter === "pending"
                        ? "bg-amber-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    Pending ({buyerStats.pendingCount})
                  </button>
                  <button
                    onClick={() => setContractStatusFilter("active")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      contractStatusFilter === "active"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    Active ({buyerStats.activeCount})
                  </button>
                  <button
                    onClick={() => setContractStatusFilter("completed")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      contractStatusFilter === "completed"
                        ? "bg-orange-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    To Confirm ({buyerStats.completedCount})
                  </button>
                  <button
                    onClick={() => setContractStatusFilter("confirmed")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      contractStatusFilter === "confirmed"
                        ? "bg-green-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    Confirmed ({buyerStats.confirmedCount})
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Contracts List */}
          {filteredContracts.length === 0 ? (
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
                    ? "Browse the marketplace and hire talented sellers"
                    : "Try selecting a different filter"
                  }
                </p>
                {contractStatusFilter === "all" ? (
                  <Link href="/marketplace">
                    <Button variant="primary" size="lg">
                      Browse Marketplace
                    </Button>
                  </Link>
                ) : (
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
              {filteredContracts.map((contract) => (
                <ContractCard
                  key={contract.id}
                  contract={contract}
                  viewMode="buyer"
                  onAction={handleContractAction}
                />
              ))}
            </div>
          )}
          
          {/* Quick Actions */}
          {buyerContracts.length > 0 && (
            <Card variant="elevated" padding="md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Need more help?
                  </h3>
                  <p className="text-sm text-slate-400">
                    Browse more sellers or view completed contracts
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href="/marketplace">
                    <Button variant="primary" size="md">
                      Browse Sellers
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="md"
                    onClick={() => setContractStatusFilter("confirmed")}
                  >
                    View History
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Container>
      
      {/* Confirm Contract Modal */}
      {selectedContract && (
        <Modal
          open={confirmModalOpen}
          onClose={() => {
            setConfirmModalOpen(false);
            setSelectedContract(null);
            setRating(5);
            setFeedback("");
          }}
          size="md"
        >
          <ModalHeader>
            <h2 className="text-2xl font-bold text-white">
              Confirm Contract
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Rate the work and release payment
            </p>
          </ModalHeader>
          
          <ModalBody>
            <div className="space-y-6">
              {/* Contract Info */}
              <Card variant="glass" padding="sm">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {selectedContract.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {selectedContract.hours} hours × {selectedContract.hourlyRate.toFixed(2)} ETH
                  </p>
                  <p className="text-xl font-bold text-purple-400">
                    Total: {selectedContract.totalAmount.toFixed(2)} ETH
                  </p>
                </div>
              </Card>
              
              {/* Work Proof */}
              {selectedContract.workProof && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-400">
                    Work Proof
                  </h4>
                  <a 
                    href={selectedContract.workProof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 underline break-all"
                  >
                    {selectedContract.workProof}
                  </a>
                </div>
              )}
              
              {/* Rating */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">
                  Rating (1-5 stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-all hover:scale-110 ${
                        star <= rating ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="text-lg font-semibold text-white ml-2">
                    {rating} / 5
                  </span>
                </div>
              </div>
              
              {/* Feedback */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400">
                  Feedback (optional)
                </label>
                <Input
                  as="textarea"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience working with this seller..."
                />
              </div>
              
              {/* Info Box */}
              <Card variant="glass" padding="sm">
                <div className="space-y-2 text-xs text-slate-400">
                  <p className="flex items-start gap-2">
                    <span>💡</span>
                    <span>Confirming will release payment to the seller and mint an NFT proof of work.</span>
                  </p>
                </div>
              </Card>
            </div>
          </ModalBody>
          
          <ModalFooter>
            <Button 
              variant="secondary" 
              onClick={() => {
                setConfirmModalOpen(false);
                setSelectedContract(null);
                setRating(5);
                setFeedback("");
              }}
              disabled={isActionLoading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmSubmit}
              loading={isActionLoading}
              disabled={isActionLoading}
            >
              {isActionLoading ? "Confirming..." : "Confirm & Release Payment"}
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

