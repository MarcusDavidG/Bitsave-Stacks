"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowDown, Loader2, TrendingDown } from "lucide-react";

const withdrawSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Amount must be a positive number"
  ),
});

type WithdrawFormData = z.infer<typeof withdrawSchema>;

interface WithdrawFormProps {
  onWithdraw?: (amount: number) => void;
  isConnected?: boolean;
  balance?: number;
}

export function WithdrawForm({ onWithdraw, isConnected, balance = 0 }: WithdrawFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = async (data: WithdrawFormData) => {
    if (!isConnected) return;

    const amount = Number(data.amount);
    if (amount > balance) {
      form.setError("amount", {
        type: "manual",
        message: "Insufficient balance",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onWithdraw?.(amount);
      form.reset();
    } catch (error) {
      console.error("Withdrawal failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Withdraw Funds
          </CardTitle>
          <CardDescription>
            Withdraw STX from your Bitsave account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Available Balance:</span>
              <span className="font-mono font-medium">{balance.toFixed(2)} STX</span>
            </div>
          </div>
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
                        <ArrowDown className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="pl-10"
                          disabled={!isConnected || isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="outline"
                className="w-full"
                disabled={!isConnected || isSubmitting || balance === 0}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : !isConnected ? (
                  "Connect Wallet First"
                ) : balance === 0 ? (
                  "No Balance Available"
                ) : (
                  <>
                    <TrendingDown className="mr-2 h-4 w-4" />
                    Withdraw
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
