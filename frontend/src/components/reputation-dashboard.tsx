"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Trophy, Star, Target, TrendingUp, Award } from "lucide-react";

interface ReputationDashboardProps {
  reputation?: number;
  level?: number;
  nextLevelProgress?: number;
  badges?: string[];
  totalSavings?: number;
  savingsGoal?: number;
}

export function ReputationDashboard({
  reputation = 0,
  level = 1,
  nextLevelProgress = 0,
  badges = [],
  totalSavings = 0,
  savingsGoal = 1000,
}: ReputationDashboardProps) {
  const savingsProgress = Math.min((totalSavings / savingsGoal) * 100, 100);

  const getLevelName = (level: number) => {
    const levels = ["Beginner", "Saver", "Investor", "Wealth Builder", "Financial Guru"];
    return levels[Math.min(level - 1, levels.length - 1)];
  };

  const getReputationColor = (rep: number) => {
    if (rep >= 90) return "text-green-400";
    if (rep >= 70) return "text-blue-400";
    if (rep >= 50) return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="h-5 w-5" />
            Reputation Dashboard
          </CardTitle>
          <CardDescription>
            Track your savings journey and achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Level and Reputation */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Level</span>
              </div>
              <div className="text-2xl font-bold">{level}</div>
              <div className="text-sm text-muted-foreground">{getLevelName(level)}</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium">Reputation</span>
              </div>
              <div className={`text-2xl font-bold ${getReputationColor(reputation)}`}>
                {reputation}%
              </div>
              <div className="text-sm text-muted-foreground">Trust Score</div>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress to Level {level + 1}</span>
              <span className="text-sm text-muted-foreground">{nextLevelProgress}%</span>
            </div>
            <Progress value={nextLevelProgress} className="h-2" />
          </div>

          {/* Savings Goal Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Savings Goal
              </span>
              <span className="text-sm text-muted-foreground">
                {totalSavings.toFixed(2)} / {savingsGoal.toFixed(2)} STX
              </span>
            </div>
            <Progress value={savingsProgress} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              {savingsProgress.toFixed(1)}% of goal achieved
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Achievements</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.length > 0 ? (
                badges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge variant="secondary" className="animate-pulse-neon">
                      {badge}
                    </Badge>
                  </motion.div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground italic">
                  No achievements yet. Start saving to earn badges!
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
