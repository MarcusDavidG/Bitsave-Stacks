"use client";

import { useState } from "react";
import { WalletConnectV2 } from "@/components/wallet-connect-v2";
import { DepositFormV2 } from "@/components/deposit-form-v2";
import { WithdrawFormV2 } from "@/components/withdraw-form-v2";
import { ReputationDashboardV2 } from "@/components/reputation-dashboard-v2";
import { BadgeDisplay } from "@/components/badge-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import { FeaturesShowcase } from "@/components/features-showcase";
import { StatsSection } from "@/components/stats-section";
import { motion } from "framer-motion";
import { 
  PiggyBank, 
  ExternalLink,
  Bitcoin,
  Github,
  Twitter,
  MessageCircle
} from "lucide-react";
import { EXPLORER_URLS } from "@/lib/contracts";

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
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
    }, 2000);
  };

  const scrollToWallet = () => {
    const walletSection = document.getElementById('wallet-section');
    walletSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <PiggyBank className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <Bitcoin className="h-4 w-4 text-orange-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BitSave
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Bitcoin-Powered Savings</p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-4">
              {userAddress && (
                <a
                  href={EXPLORER_URLS.address(userAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                  Explorer
                </a>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection onGetStarted={scrollToWallet} isConnected={isConnected} />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Showcase */}
      <FeaturesShowcase />

      {/* Wallet Connection Section */}
      <section id="wallet-section" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              {isConnected ? "Your Savings Dashboard" : "Connect Your Wallet"}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {isConnected 
                ? "Manage your deposits, track rewards, and monitor your reputation" 
                : "Connect your Stacks wallet to start saving and earning rewards"
              }
            </p>
          </motion.div>

          {/* Wallet Connection */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <WalletConnectV2 onConnect={handleConnect} onDisconnect={handleDisconnect} />
          </motion.div>

          {/* Dashboard - Only show when connected */}
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-8"
            >
              {/* Forms Column */}
              <div className="xl:col-span-2 space-y-8">
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

              {/* Reputation Column */}
              <div key={refreshKey} className="xl:col-span-1">
                <ReputationDashboardV2
                  userAddress={userAddress}
                  isConnected={isConnected}
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Badge Showcase */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BadgeDisplay />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-semibold text-slate-900 dark:text-white">BitSave</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Secure, decentralized savings powered by Bitcoin's security through the Stacks blockchain.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Security</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Roadmap</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Blockchain</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://explorer.hiro.so/?chain=testnet" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Testnet Explorer
                  </a>
                </li>
                <li>
                  <a 
                    href={EXPLORER_URLS.contract("ST2QR5BT57BTVQM69ZFQBMW3BH7KDN3FX56H02TEW.bitsave")}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Smart Contract
                  </a>
                </li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Audit Report</a></li>
                <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Bug Bounty</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                © 2024 BitSave. Built with ❤️ on Stacks • Secured by Bitcoin
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
