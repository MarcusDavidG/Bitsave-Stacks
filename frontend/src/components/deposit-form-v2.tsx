"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { DollarSign, Loader2, TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react";
import { depositSTX } from "@/lib/stacks";
import { EXPLORER_URLS } from "@/lib/contracts";
import { useToast } from "@/hooks/use-toast";
import { celebrateSuccess } from "@/lib/confetti";

const depositSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Amount must be greater than 0"
  ),
  lockPeriod: z.string().min(1, "Lock period is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 10,
    "Lock period must be at least 10 blocks"
  ),
});

type DepositFormData = z.infer<typeof depositSchema>;

interface DepositFormV2Props {
  userAddress?: string;
  isConnected?: boolean;
  onSuccess?: () => void;
}

export function DepositFormV2({ userAddress, isConnected, onSuccess }: DepositFormV2Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txId, setTxId] = useState<string>("");
  const [txStatus, setTxStatus] = useState<"pending" | "success" | "error" | null>(null);
  const { toast } = useToast();

  const form = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "0.1",
      lockPeriod: "100",
    },
  });

  const onSubmit = async (data: DepositFormData) => {
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
      await depositSTX(
        userAddress,
        Number(data.amount),
        Number(data.lockPeriod),
        (finishedTxData) => {
          setTxId(finishedTxData.txId);
          setTxStatus("success");
          setIsSubmitting(false);
          
          // Celebrate with confetti!
          celebrateSuccess();
          
          toast({
            title: "Deposit successful!",
            description: `Your STX has been deposited. Transaction ID: ${finishedTxData.txId.slice(0, 10)}...`,
          });

          onSuccess?.();
          form.reset();
        },
        () => {
          setTxStatus("error");
          setIsSubmitting(false);
          
          toast({
            title: "Transaction cancelled",
            description: "You cancelled the deposit transaction",
            variant: "destructive",
          });
        }
      );
    } catch (error) {
      console.error("Deposit failed:", error);
      setTxStatus("error");
      setIsSubmitting(false);
      
      toast({
        title: "Deposit failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const resetTx = () => {
    setTxId("");
    setTxStatus(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Deposit Funds
          </CardTitle>
          <CardDescription>
            Deposit STX to start earning reputation points
          </CardDescription>
        </CardHeader>
        <CardContent>
          {txStatus === "success" && txId ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-950 rounded-lg">
                <CheckCircle2 className="h-12 w-12 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Deposit Successful!</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Your STX has been deposited into BitSave
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
                Make Another Deposit
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (STX)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="number"
                            step="0.000001"
                            min="0.000001"
                            placeholder="0.1"
                            className="pl-10"
                            disabled={!isConnected || isSubmitting}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Amount of STX to deposit (minimum 0.000001 STX)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lockPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lock Period (blocks)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="number"
                            min="10"
                            placeholder="100"
                            className="pl-10"
                            disabled={!isConnected || isSubmitting}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Minimum 10 blocks. ~10 minutes per block on testnet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 <strong>Tip:</strong> Longer lock periods earn more reputation points!
                  </p>
                </div>

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
                  type="submit"
                  className="w-full animate-glow"
                  disabled={!isConnected || isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : !isConnected ? (
                    "Connect Wallet First"
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Deposit STX
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
