"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout";
import { Button, Card, CardHeader, CardBody, Modal, ModalBody } from "@/components/ui";
import {
  SellerCard,
  ContractCard,
  ContractStatus,
  CreateContractForm,
  type ContractAction,
} from "@/components/features/marketplace";
import { mockSellers, mockContracts } from "@/lib/mock-data";
import { Contract } from "@/types/marketplace";

/**
 * Marketplace Components Demo
 * Showcase all marketplace feature components
 */
export default function MarketplaceDemoPage() {
  const [selectedSeller, setSelectedSeller] = useState(mockSellers[0]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedContract, setSelectedContract] = useState(mockContracts[0]);
  
  const handleContractAction = (action: ContractAction, contract: Contract) => {
    console.log(`Action: ${action}`, contract);
    alert(`Action: ${action} on contract: ${contract.title}`);
  };
  
  const handleCreateContract = (data: any) => {
    console.log("Creating contract:", data);
    alert(`Contract created: ${data.title}`);
    setShowCreateForm(false);
  };
  
  return (
    <div className="py-8 sm:py-12">
      <Container size="2xl" padding="md">
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              Marketplace Components
            </h1>
            <p className="text-base sm:text-xl text-slate-300">
              Feature components for Time Marketplace
            </p>
            
            {/* Demo Navigation */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Link href="/demo">
                <Button variant="outline" size="sm">
                  ← UI Components
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="primary" size="sm">
                  🏪 View Live Marketplace
                </Button>
              </Link>
              <Link href="/layout-demo">
                <Button variant="outline" size="sm">
                  → Layout Demo
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Seller Card Demo */}
          <Card variant="glass">
            <CardHeader>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                1. Seller Card
              </h2>
              <p className="text-sm text-slate-400">
                Reusable seller display component
              </p>
            </CardHeader>
            
            <CardBody>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockSellers.slice(0, 3).map((seller) => (
                    <SellerCard
                      key={seller.id}
                      seller={seller}
                      onClick={() => {
                        setSelectedSeller(seller);
                        alert(`Clicked on ${seller.name}`);
                      }}
                    />
                  ))}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Compact Mode:</h3>
                  <SellerCard
                    seller={mockSellers[0]}
                    compact
                    onClick={() => alert("Compact card clicked")}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Contract Status Demo */}
          <Card variant="glass">
            <CardHeader>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Contract Status
              </h2>
              <p className="text-sm text-slate-400">
                Status badges with optional timeline
              </p>
            </CardHeader>
            
            <CardBody>
              <div className="space-y-6">
                {/* Without Timeline */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Status Badges:</h3>
                  <div className="flex flex-wrap gap-3">
                    <ContractStatus status="pending" />
                    <ContractStatus status="active" />
                    <ContractStatus status="completed" />
                    <ContractStatus status="confirmed" />
                    <ContractStatus status="disputed" />
                    <ContractStatus status="cancelled" />
                  </div>
                </div>
                
                {/* With Timeline */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">With Timeline:</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ContractStatus status="pending" withTimeline />
                    <ContractStatus status="active" withTimeline />
                    <ContractStatus status="completed" withTimeline />
                    <ContractStatus status="confirmed" withTimeline />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Contract Card Demo */}
          <Card variant="glass">
            <CardHeader>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                3. Contract Card
              </h2>
              <p className="text-sm text-slate-400">
                Full contract display with actions
              </p>
            </CardHeader>
            
            <CardBody>
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Buyer View:</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {mockContracts.slice(0, 2).map((contract) => (
                      <ContractCard
                        key={contract.id}
                        contract={contract}
                        viewMode="buyer"
                        onAction={handleContractAction}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Seller View:</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {mockContracts.slice(2, 4).map((contract) => (
                      <ContractCard
                        key={contract.id}
                        contract={contract}
                        viewMode="seller"
                        onAction={handleContractAction}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Compact Mode:</h3>
                  <ContractCard
                    contract={mockContracts[0]}
                    viewMode="buyer"
                    compact
                    onAction={handleContractAction}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Create Contract Form Demo */}
          <Card variant="glass">
            <CardHeader>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                4. Create Contract Form
              </h2>
              <p className="text-sm text-slate-400">
                Full form with validation and confirmation
              </p>
            </CardHeader>
            
            <CardBody>
              <div className="space-y-4">
                <Button
                  variant="primary"
                  onClick={() => setShowCreateForm(true)}
                  size="lg"
                >
                  Open Create Contract Form
                </Button>
                
                <p className="text-sm text-slate-400">
                  Click the button to see the full form flow with:
                  <br />• Input validation
                  <br />• Auto-calculation
                  <br />• Balance checking
                  <br />• Confirmation step
                </p>
              </div>
            </CardBody>
          </Card>
          
          {/* Component Info */}
          <Card variant="elevated" padding="md">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Components 🫨
              </h3>
              <div className="space-y-2 text-sm sm:text-base text-slate-300">
                <p>✓ SellerCard - Reusable seller display</p>
                <p>✓ ContractCard - Full contract with actions</p>
                <p>✓ ContractStatus - Badge + timeline</p>
                <p>✓ CreateContractForm - Full form flow</p>
              </div>
              <p className="text-slate-400 pt-2">
                These components are now ready to use in actual pages!
              </p>
            </div>
          </Card>
        </div>
      </Container>
      
      {/* Create Contract Modal */}
      <Modal
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        size="lg"
      >
        <ModalBody>
          <CreateContractForm
            seller={selectedSeller}
            onSubmit={handleCreateContract}
            onCancel={() => setShowCreateForm(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

