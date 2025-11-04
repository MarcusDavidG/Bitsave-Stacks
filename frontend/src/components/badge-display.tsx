"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Award, Medal, Crown, Star, Zap, Shield } from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface BadgeDisplayProps {
  badges?: BadgeItem[];
}

const defaultBadges: BadgeItem[] = [
  {
    id: "first-deposit",
    name: "First Steps",
    description: "Made your first deposit",
    icon: "Star",
    earned: false,
  },
  {
    id: "consistent-saver",
    name: "Consistent Saver",
    description: "Deposited for 7 consecutive days",
    icon: "Zap",
    earned: false,
  },
  {
    id: "wealth-builder",
    name: "Wealth Builder",
    description: "Accumulated 100 STX in savings",
    icon: "Crown",
    earned: false,
  },
  {
    id: "early-adopter",
    name: "Early Adopter",
    description: "Joined Bitsave in the first month",
    icon: "Medal",
    earned: false,
  },
  {
    id: "trusted-user",
    name: "Trusted User",
    description: "Maintained 95%+ reputation score",
    icon: "Shield",
    earned: false,
  },
  {
    id: "community-helper",
    name: "Community Helper",
    description: "Helped 10 other users",
    icon: "Award",
    earned: false,
  },
];

const getIcon = (iconName: string) => {
  const icons = {
    Star,
    Zap,
    Crown,
    Medal,
    Shield,
    Award,
  };
  return icons[iconName as keyof typeof icons] || Star;
};

export function BadgeDisplay({ badges = defaultBadges }: BadgeDisplayProps) {
  const earnedBadges = badges.filter(badge => badge.earned);
  const unearnedBadges = badges.filter(badge => !badge.earned);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Award className="h-5 w-5" />
            Achievement Badges
          </CardTitle>
          <CardDescription>
            Unlock badges by achieving savings milestones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Earned Badges */}
          {earnedBadges.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-green-400 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Earned ({earnedBadges.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {earnedBadges.map((badge, index) => {
                  const IconComponent = getIcon(badge.icon);
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border border-primary/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/20 rounded-full">
                          <IconComponent className="h-5 w-5 text-primary animate-pulse-neon" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{badge.name}</h4>
                            <Badge variant="default" className="text-xs">
                              Earned
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {badge.description}
                          </p>
                          {badge.earnedDate && (
                            <p className="text-xs text-muted-foreground">
                              Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Unearned Badges */}
          {unearnedBadges.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4" />
                Available ({unearnedBadges.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unearnedBadges.map((badge, index) => {
                  const IconComponent = getIcon(badge.icon);
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-muted/50 rounded-lg border border-muted"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-full opacity-50">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            {badge.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {badges.length === 0 && (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No badges available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
