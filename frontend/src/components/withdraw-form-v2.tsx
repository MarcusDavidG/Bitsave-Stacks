"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingDown, Loader2, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { withdrawSTX, getUserSavings } from "@/lib/stacks";
import { EXPLORER_URLS } from "@/lib/contracts";
import { useToast } from "@/hooks/use-toast";
import { fireworks } from "@/lib/confetti";

interface WithdrawFormV2Props {
  userAddress?: string;
  isConnected?: boolean;
  onSuccess?: () => void;
}

export function WithdrawFormV2({ userAddress, isConnected, onSuccess }: WithdrawFormV2Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txId, setTxId] = useState<string>("");
  const [txStatus, setTxStatus] = useState<"pending" | "success" | "error" | null>(null);
  const [savings, setSavings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [blocksRemaining, setBlocksRemaining] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (isConnected && userAddress) {
      fetchSavings();
    }
  }, [isConnected, userAddress]);

  const fetchSavings = async () => {
    if (!userAddress) return;
    
    setIsLoading(true);
    try {
      const data = await getUserSavings(userAddress);
      setSavings(data);
      
      // Check if user can withdraw
      if (data && data.amount > 0) {
        const unlockHeight = data.unlockHeight;
        const claimed = data.claimed;
        
        // For testnet, we'd need to fetch current block height
        // For now, assume we can check unlock height
        setCanWithdraw(!claimed && unlockHeight > 0);
      }
    } catch (error) {
      console.error("Error fetching savings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected || !userAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTxStatus("pending");

    try {
      await withdrawSTX(
        userAddress,
        (finishedTxData) => {
          setTxId(finishedTxData.txId);
          setTxStatus("success");
          setIsSubmitting(false);
          
          // Celebrate with fireworks!
          fireworks();
          
          toast({
            title: "Withdrawal successful!",
            description: `Your STX has been withdrawn. Transaction ID: ${finishedTxData.txId.slice(0, 10)}...`,
          });

          onSuccess?.();
          fetchSavings(); // Refresh savings data
        },
        () => {
          setTxStatus("error");
          setIsSubmitting(false);
          
          toast({
            title: "Transaction cancelled",
            description: "You cancelled the withdrawal transaction",
            variant: "destructive",
          });
        }
      );
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setTxStatus("error");
      setIsSubmitting(false);
      
      toast({
        title: "Withdrawal failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const resetTx = () => {
    setTxId("");
    setTxStatus(null);
  };

  const hasSavings = savings && savings.amount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -2 }}
    >
      <Card className="w-full max-w-md mx-auto lift-on-hover">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Withdraw Funds
          </CardTitle>
          <CardDescription>
            Withdraw your locked STX and earn reputation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : txStatus === "success" && txId ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-950 rounded-lg">
                <CheckCircle2 className="h-12 w-12 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Withdrawal Successful!</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Your STX has been withdrawn and reputation points earned
                </p>
                <a
                  href={EXPLORER_URLS.transaction(txId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View on Explorer →
                </a>
              </div>
              <Button onClick={resetTx} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          ) : !hasSavings ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                No active deposits found. Make a deposit first to withdraw later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savings && (
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Locked Amount</div>
                    <div className="text-2xl font-bold">
                      {(savings.amount / 1000000).toFixed(6)} STX
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Unlock Block</div>
                    <div className="text-lg font-semibold">
                      {savings.unlockHeight?.toString() || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="flex items-center gap-2">
                      {savings.claimed ? (
                        <span className="text-sm text-red-600">Already Withdrawn</span>
                      ) : (
                        <span className="text-sm text-green-600">Ready to Withdraw</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {isSubmitting && txStatus === "pending" && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">
                      Waiting for wallet confirmation...
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleWithdraw}
                className="w-full"
                disabled={
                  !isConnected || 
                  isSubmitting || 
                  !canWithdraw || 
                  savings?.claimed
                }
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : !isConnected ? (
                  "Connect Wallet First"
                ) : savings?.claimed ? (
                  "Already Withdrawn"
                ) : (
                  <>
                    <TrendingDown className="mr-2 h-4 w-4" />
                    Withdraw STX
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                ⚠️ Note: Withdrawal before unlock height will fail. 
                Check current block on explorer.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
