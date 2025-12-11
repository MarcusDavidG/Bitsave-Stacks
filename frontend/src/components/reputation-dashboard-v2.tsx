"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Target, Award, Loader2 } from "lucide-react";
import { getUserReputation, getUserBadges, getUserSavings } from "@/lib/stacks";

interface ReputationDashboardV2Props {
  userAddress?: string;
  isConnected?: boolean;
}

export function ReputationDashboardV2({ userAddress, isConnected }: ReputationDashboardV2Props) {
  const [reputation, setReputation] = useState(0);
  const [badges, setBadges] = useState<any[]>([]);
  const [savings, setSavings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && userAddress) {
      console.log('📊 ReputationDashboard: Fetching user data...');
      fetchUserData();
    }
  }, [isConnected, userAddress]);

  const fetchUserData = async () => {
    if (!userAddress) return;
    
    setIsLoading(true);
    try {
      // Fetch all data in parallel
      const [rep, badgeData, savingsData] = await Promise.all([
        getUserReputation(userAddress),
        getUserBadges(userAddress),
        getUserSavings(userAddress),
      ]);

      console.log('📊 Dashboard data fetched:', { rep, badgeData, savingsData });
      setReputation(rep);
      setBadges(badgeData);
      setSavings(savingsData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate level and progress
  const getLevel = (rep: number) => {
    if (rep >= 5000) return 5;
    if (rep >= 3000) return 4;
    if (rep >= 1000) return 3;
    if (rep >= 500) return 2;
    return 1;
  };

  const getNextLevelThreshold = (currentLevel: number) => {
    const thresholds = [0, 500, 1000, 3000, 5000, 10000];
    return thresholds[currentLevel] || 10000;
  };

  const level = getLevel(reputation);
  const nextThreshold = getNextLevelThreshold(level);
  const prevThreshold = getNextLevelThreshold(level - 1);
  const progressPercentage = level === 5 
    ? 100 
    : ((reputation - prevThreshold) / (nextThreshold - prevThreshold)) * 100;

  const getLevelBadge = (lvl: number) => {
    const variants: Record<number, "default" | "secondary" | "destructive" | "outline"> = {
      1: "secondary",
      2: "outline",
      3: "default",
      4: "default",
      5: "destructive",
    };
    return variants[lvl] || "secondary";
  };

  const savingsAmount = savings?.amount 
    ? savings.amount / 1000000 
    : 0;

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Reputation Dashboard
          </CardTitle>
          <CardDescription>Connect your wallet to view your stats</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Please connect your wallet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className="w-full lift-on-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Reputation Dashboard
          </CardTitle>
          <CardDescription>Track your BitSave reputation and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Level and Reputation */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Level {level}</span>
                    <Badge variant={getLevelBadge(level)}>
                      {level === 5 ? "Master Saver" : 
                       level === 4 ? "Expert" :
                       level === 3 ? "Advanced" :
                       level === 2 ? "Intermediate" : "Beginner"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{reputation}</div>
                    <div className="text-xs text-muted-foreground">reputation points</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress to Level {level + 1}</span>
                    <span className="font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{prevThreshold} pts</span>
                    <span>{nextThreshold} pts</span>
                  </div>
                </div>
              </div>

              {/* Savings Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Total Locked</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {savingsAmount.toFixed(2)} STX
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Badges Earned</span>
                  </div>
                  <div className="text-2xl font-bold">{badges.length}</div>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span className="text-sm font-medium">Recent Achievements</span>
                </div>
                
                {badges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {badges.map((badge, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted rounded-lg border border-primary/20"
                      >
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            Badge #{badge.value?.repr || index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : reputation >= 1000 ? (
                  <p className="text-sm text-muted-foreground">
                    You've earned 1000+ reputation! Badge minting coming soon.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Earn 1000 reputation points to unlock your first badge!
                  </p>
                )}
              </div>

              {/* Next Milestone */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium mb-1">Next Milestone</div>
                    <div className="text-xs text-muted-foreground">
                      {reputation < 1000 
                        ? "Earn your first Loyalty Badge at 1000 pts"
                        : level < 5 
                        ? `Reach Level ${level + 1} at ${nextThreshold} pts`
                        : "You've reached the maximum level!"}
                    </div>
                  </div>
                  <Trophy className="h-8 w-8 text-primary/50" />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
