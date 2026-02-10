"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  PiggyBank, 
  Award,
  DollarSign,
  Activity,
  Target,
  Zap
} from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: PiggyBank,
      label: "Total Value Locked",
      value: "1.2M",
      unit: "STX",
      change: "+12.5%",
      changeType: "positive" as const,
      description: "Total STX locked in savings vaults"
    },
    {
      icon: Users,
      label: "Active Savers",
      value: "2,847",
      unit: "users",
      change: "+8.3%",
      changeType: "positive" as const,
      description: "Users actively saving on BitSave"
    },
    {
      icon: Award,
      label: "Badges Earned",
      value: "1,234",
      unit: "NFTs",
      change: "+15.2%",
      changeType: "positive" as const,
      description: "Achievement badges minted"
    },
    {
      icon: TrendingUp,
      label: "Average APY",
      value: "12.5",
      unit: "%",
      change: "+2.1%",
      changeType: "positive" as const,
      description: "Current average annual yield"
    }
  ];

  const additionalMetrics = [
    {
      icon: DollarSign,
      label: "Total Rewards Paid",
      value: "156K STX",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Activity,
      label: "Transactions Today",
      value: "342",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Target,
      label: "Success Rate",
      value: "99.8%",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Zap,
      label: "Avg. Lock Period",
      value: "45 days",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
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
            BitSave by the Numbers
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real-time statistics showcasing the growth and success of our decentralized savings platform
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0">
                <div className="space-y-4">
                  {/* Icon and Change */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform">
                      <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.changeType === 'positive' 
                        ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30' 
                        : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                    }`}>
                      {stat.change}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </span>
                      <span className="text-lg text-slate-500 dark:text-slate-400">
                        {stat.unit}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {additionalMetrics.map((metric, index) => (
            <Card key={metric.label} className="p-4 text-center hover:shadow-lg transition-all duration-300 group bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
              <metric.icon className={`h-8 w-8 mx-auto mb-3 ${metric.color} group-hover:scale-110 transition-transform`} />
              <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {metric.label}
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Live Network Activity
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    23
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Deposits in last hour
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    12
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Withdrawals completed
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    5
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Badges earned today
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Data updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
