"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  PiggyBank, 
  Shield, 
  TrendingUp, 
  Award, 
  Bitcoin,
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted?: () => void;
  isConnected?: boolean;
}

export function HeroSection({ onGetStarted, isConnected }: HeroSectionProps) {
  const stats = [
    { label: "Total Value Locked", value: "1.2M STX", icon: PiggyBank },
    { label: "Active Savers", value: "2,847", icon: Shield },
    { label: "Badges Earned", value: "1,234", icon: Award },
    { label: "Avg. APY", value: "12.5%", icon: TrendingUp }
  ];

  const features = [
    "Bitcoin-secured savings vault",
    "Guaranteed returns on locked STX",
    "Earn reputation & NFT badges",
    "Non-custodial & transparent"
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="container mx-auto px-6 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Powered by Bitcoin Security
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                  Your Bitcoin-Secured
                </span>
                <br />
                <span className="text-primary">
                  Savings Vault
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Lock STX tokens, earn guaranteed returns, and build your on-chain reputation. 
                Experience the future of decentralized savings.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {!isConnected ? (
                <Button
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <div className="flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Wallet Connected
                  </span>
                </div>
              )}
              
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <Card className="p-8 glass-card text-center">
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-20" />
                  <div className="absolute inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <PiggyBank className="h-16 w-16 text-white" />
                  </div>
                  <Bitcoin className="absolute -top-2 -right-2 h-8 w-8 text-orange-500 animate-bounce" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Start Saving Today
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Join thousands of users building wealth on Stacks
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
