"use client";

import { useState } from "react";
import { WalletConnect } from "@/components/wallet-connect";
import { DepositForm } from "@/components/deposit-form";
import { WithdrawForm } from "@/components/withdraw-form";
import { ReputationDashboard } from "@/components/reputation-dashboard";
import { BadgeDisplay } from "@/components/badge-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { PiggyBank, Sparkles } from "lucide-react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>("");
  const [balance, setBalance] = useState(0);

  const handleConnect = (address: string) => {
    setUserAddress(address);
    setIsConnected(true);
    // In a real app, fetch balance from blockchain
    setBalance(25.5); // Mock balance
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setUserAddress("");
    setBalance(0);
  };

  const handleDeposit = async (amount: number) => {
    // In a real app, this would interact with the smart contract
    console.log(`Depositing ${amount} STX`);
    setBalance(prev => prev + amount);
  };

  const handleWithdraw = async (amount: number) => {
    // In a real app, this would interact with the smart contract
    console.log(`Withdrawing ${amount} STX`);
    setBalance(prev => prev - amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <PiggyBank className="h-8 w-8 text-primary animate-pulse-neon" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Bitsave
            </h1>
          </motion.div>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Web3 Savings Platform</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Secure Your Future
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Decentralized savings on Stacks blockchain. Earn reputation, unlock achievements,
            and grow your wealth with confidence.
          </p>
        </motion.section>

        {/* Wallet Connection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <WalletConnect onConnect={handleConnect} onDisconnect={handleDisconnect} />
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Deposit/Withdraw Forms */}
          <div className="space-y-6">
            <DepositForm onDeposit={handleDeposit} isConnected={isConnected} />
            <WithdrawForm
              onWithdraw={handleWithdraw}
              isConnected={isConnected}
              balance={balance}
            />
          </div>

          {/* Reputation Dashboard */}
          <div>
            <ReputationDashboard
              reputation={85}
              level={3}
              nextLevelProgress={65}
              badges={["First Steps", "Consistent Saver"]}
              totalSavings={balance}
              savingsGoal={100}
            />
          </div>
        </div>

        {/* Badge Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <BadgeDisplay />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8 border-t"
        >
          <p className="text-muted-foreground">
            Built on Stacks • Secure • Decentralized • Transparent
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
