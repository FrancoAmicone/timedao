"use client";

import { useState } from "react";
import { Seller } from "@/types/marketplace";
import { 
  Input, 
  Textarea, 
  Button, 
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
} from "@/components/ui";
import { useWalletMock } from "@/hooks/use-wallet-mock";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

export interface CreateContractFormProps {
  /** Seller to create contract with */
  seller: Seller;
  
  /** Submit handler */
  onSubmit: (data: ContractFormData) => void | Promise<void>;
  
  /** Cancel handler */
  onCancel: () => void;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom className */
  className?: string;
}

export interface ContractFormData {
  title: string;
  description: string;
  hours: number;
}

// ============================================
// CREATE CONTRACT FORM COMPONENT
// ============================================

/**
 * Create Contract Form Component
 * Form for creating a new time contract
 * 
 * Features:
 * - Title, description, hours inputs
 * - Auto-calculates total amount
 * - Shows available balance
 * - Validation with error messages
 * - Loading states
 * - Confirmation step
 * - Mobile responsive
 * 
 * @example
 * <CreateContractForm 
 *   seller={seller}
 *   onSubmit={handleSubmit}
 *   onCancel={() => setModalOpen(false)}
 * />
 */
export function CreateContractForm({
  seller,
  onSubmit,
  onCancel,
  loading = false,
  className,
}: CreateContractFormProps) {
  const { balance } = useWalletMock();
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState<number>(1);
  
  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Confirmation step
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Calculate total
  const totalAmount = hours * seller.hourlyRate;
  const hasEnoughBalance = balance >= totalAmount;
  
  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }
    
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }
    
    if (hours < 1) {
      newErrors.hours = "Hours must be at least 1";
    } else if (hours > 1000) {
      newErrors.hours = "Hours cannot exceed 1000";
    }
    
    if (!hasEnoughBalance) {
      newErrors.balance = "Insufficient balance";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle submit
  const handleSubmit = async () => {
    if (!validate()) return;
    
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }
    
    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      hours,
    });
  };
  
  // Reset confirmation
  const handleEdit = () => {
    setShowConfirmation(false);
  };
  
  if (showConfirmation) {
    return (
      <Card variant="glass" className={className}>
        <CardHeader>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Confirm Contract
          </h3>
          <p className="text-sm text-slate-400">
            Please review the details before creating the contract
          </p>
        </CardHeader>
        
        <CardBody>
          <div className="space-y-4">
            {/* Seller Info */}
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
              <span className="text-3xl">{seller.avatar}</span>
              <div>
                <p className="font-semibold text-white">{seller.name}</p>
                <p className="text-xs text-slate-400">Seller</p>
              </div>
            </div>
            
            {/* Contract Details */}
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400">Title</p>
                <p className="text-base font-semibold text-white">{title}</p>
              </div>
              
              <div>
                <p className="text-xs text-slate-400">Description</p>
                <p className="text-sm text-slate-300">{description}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <div>
                  <p className="text-xs text-slate-400">Hours</p>
                  <p className="text-lg font-semibold text-white">{hours}h</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Rate</p>
                  <p className="text-lg font-semibold text-white">
                    {seller.hourlyRate.toFixed(2)} ETH
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Total</p>
                  <p className="text-lg font-semibold text-purple-400">
                    {totalAmount.toFixed(2)} ETH
                  </p>
                </div>
              </div>
            </div>
            
            {/* Balance Warning */}
            <div className={cn(
              "p-3 rounded-lg border",
              hasEnoughBalance 
                ? "bg-green-900/20 border-green-500/30"
                : "bg-red-900/20 border-red-500/30"
            )}>
              <p className="text-xs text-slate-400">Your Balance</p>
              <p className={cn(
                "text-lg font-semibold",
                hasEnoughBalance ? "text-green-400" : "text-red-400"
              )}>
                {balance.toFixed(2)} ETH
              </p>
              {hasEnoughBalance && (
                <p className="text-xs text-green-400 mt-1">
                  ✓ Sufficient balance
                </p>
              )}
            </div>
          </div>
        </CardBody>
        
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              variant="secondary"
              onClick={handleEdit}
              disabled={loading}
              fullWidth
            >
              Edit
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading || !hasEnoughBalance}
              fullWidth
            >
              Confirm & Create
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card variant="glass" className={className}>
      <CardHeader>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Create Contract
        </h3>
        <p className="text-sm text-slate-400">
          with {seller.name} ({seller.hourlyRate.toFixed(2)} ETH/hr)
        </p>
      </CardHeader>
      
      <CardBody>
        <div className="space-y-4">
          {/* Title */}
          <Input
            label="Contract Title"
            placeholder="e.g., Landing Page Design for DeFi Protocol"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            helperText="Clear, descriptive title for the work"
          />
          
          {/* Description */}
          <Textarea
            label="Description"
            placeholder="Describe the work to be done in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            helperText="Include requirements, deliverables, and expectations"
            rows={4}
          />
          
          {/* Hours */}
          <Input
            label="Estimated Hours"
            type="number"
            min={1}
            max={1000}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            error={errors.hours}
            helperText="How many hours will this take?"
          />
          
          {/* Total Calculation */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Hourly Rate:</span>
              <span className="text-base font-semibold text-white">
                {seller.hourlyRate.toFixed(2)} ETH
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Hours:</span>
              <span className="text-base font-semibold text-white">
                {hours}
              </span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-white">Total Amount:</span>
              <span className="text-xl font-bold text-purple-400">
                {totalAmount.toFixed(2)} ETH
              </span>
            </div>
          </div>
          
          {/* Balance Display */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Your Balance:</span>
            <Badge variant={hasEnoughBalance ? "success" : "error"}>
              {balance.toFixed(2)} ETH
            </Badge>
          </div>
          
          {/* Balance Error */}
          {errors.balance && (
            <p className="text-sm text-red-400">
              ⚠️ {errors.balance}. Please add funds to your wallet.
            </p>
          )}
        </div>
      </CardBody>
      
      <CardFooter>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            Review Contract
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

