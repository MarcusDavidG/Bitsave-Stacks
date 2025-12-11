"use client";

import { useState } from "react";
import { WalletConnectV2 } from "@/components/wallet-connect-v2";
import { DepositFormV2 } from "@/components/deposit-form-v2";
import { WithdrawFormV2 } from "@/components/withdraw-form-v2";
import { ReputationDashboardV2 } from "@/components/reputation-dashboard-v2";
import { BadgeDisplay } from "@/components/badge-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { PiggyBank, Sparkles, ExternalLink } from "lucide-react";
import { EXPLORER_URLS } from "@/lib/contracts";

// Force dynamic rendering (disable static generation)
export const dynamic = 'force-dynamic';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>("");
  const [balance, setBalance] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleConnect = (address: string, bal: number) => {
    setUserAddress(address);
    setIsConnected(true);
    setBalance(bal);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setUserAddress("");
    setBalance(0);
  };

  const handleTransactionSuccess = () => {
    // Trigger refresh of reputation dashboard after a short delay
    // to allow blockchain to process the transaction
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
      console.log('🔄 Refreshing dashboard data...');
    }, 2000); // 2 second delay for blockchain confirmation
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
              BitSave
            </h1>
          </motion.div>
          <div className="flex items-center gap-4">
            {userAddress && (
              <a
                href={EXPLORER_URLS.address(userAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                View on Explorer
              </a>
            )}
            <ThemeToggle />
          </div>
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Decentralized savings on Stacks blockchain. Earn reputation, unlock achievements,
            and grow your wealth with confidence.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 rounded-full text-sm">
            <span className="text-yellow-800 dark:text-yellow-200">🎯 Live on Stacks Testnet</span>
          </div>
        </motion.section>

        {/* Wallet Connection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <WalletConnectV2 onConnect={handleConnect} onDisconnect={handleDisconnect} />
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 px-4">
          {/* Deposit/Withdraw Forms */}
          <div className="space-y-6">
            <DepositFormV2 
              userAddress={userAddress}
              isConnected={isConnected}
              onSuccess={handleTransactionSuccess}
            />
            <WithdrawFormV2
              userAddress={userAddress}
              isConnected={isConnected}
              onSuccess={handleTransactionSuccess}
            />
          </div>

          {/* Reputation Dashboard */}
          <div key={refreshKey}>
            <ReputationDashboardV2
              userAddress={userAddress}
              isConnected={isConnected}
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
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Built on Stacks • Secure • Decentralized • Transparent
            </p>
            <div className="text-xs text-muted-foreground">
              <a 
                href="https://explorer.hiro.so/?chain=testnet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Testnet Explorer
              </a>
              {" • "}
              <a 
                href={EXPLORER_URLS.contract("ST2QR5BT57BTVQM69ZFQBMW3BH7KDN3FX56H02TEW.bitsave")}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                View Contract
              </a>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
