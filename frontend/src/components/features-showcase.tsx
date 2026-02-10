"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Lock, 
  TrendingUp, 
  Award, 
  Shield, 
  Coins,
  Users,
  Zap,
  Globe,
  ArrowRight
} from "lucide-react";

export function FeaturesShowcase() {
  const mainFeatures = [
    {
      icon: Lock,
      title: "Secure Time-Locked Savings",
      description: "Lock your STX tokens for predetermined periods and earn guaranteed returns. Smart contracts ensure your funds are secure and accessible only after maturity.",
      benefits: ["Guaranteed returns", "Smart contract security", "Flexible lock periods"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Reputation-Based Rewards",
      description: "Build your on-chain reputation with every successful savings cycle. Higher reputation unlocks better rates and exclusive opportunities.",
      benefits: ["Progressive rewards", "On-chain identity", "Exclusive access"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Achievement NFT Badges",
      description: "Earn unique NFT badges as proof of your commitment. These collectible achievements showcase your savings milestones and dedication.",
      benefits: ["Collectible NFTs", "Milestone tracking", "Social proof"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Bitcoin-Level Security",
      description: "Built on Stacks blockchain, inheriting Bitcoin's unmatched security. Your savings are protected by the world's most secure network.",
      benefits: ["Bitcoin security", "Decentralized", "Transparent"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const additionalFeatures = [
    {
      icon: Coins,
      title: "Competitive Yields",
      description: "Earn attractive returns on your locked STX tokens"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a growing community of Bitcoin savers"
    },
    {
      icon: Zap,
      title: "Instant Transactions",
      description: "Fast and efficient blockchain transactions"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Available worldwide, no restrictions"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Why Choose BitSave?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of decentralized savings with our innovative features designed 
            to maximize your returns while building your on-chain reputation.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <div className="pt-4">
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group/link">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {additionalFeatures.map((feature, index) => (
            <Card key={feature.title} className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-0">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Ready to Start Saving?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Join thousands of users who are already building wealth and reputation on the Stacks blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                Connect Wallet
              </button>
              <button className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
