"use client";

import { useState } from "react";
import { connect, disconnect, getStacksProvider } from "@stacks/connect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Wallet, LogOut, Loader2 } from "lucide-react";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

export function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connect({
        appDetails: {
          name: "Bitsave",
          icon: window.location.origin + "/favicon.ico",
        },
        redirectTo: "/",
        onFinish: (payload) => {
          const userAddress = payload.authResponsePayload.addresses.mainnet;
          setAddress(userAddress);
          setIsConnected(true);
          onConnect?.(userAddress);
        },
        userSession: {
          loadUserData: () => {
            const provider = getStacksProvider();
            if (provider) {
              const userData = provider.getUserData();
              if (userData) {
                const userAddress = userData.profile.stxAddress.mainnet;
                setAddress(userAddress);
                setIsConnected(true);
                onConnect?.(userAddress);
              }
            }
          },
        },
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsConnected(false);
      setAddress("");
      onDisconnect?.();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connection
          </CardTitle>
          <CardDescription>
            Connect your Stacks wallet to access Bitsave features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <Button
              onClick={handleConnect}
              disabled={isLoading}
              className="w-full animate-glow"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse-neon"></div>
                  <span className="text-sm font-medium">Connected</span>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {truncateAddress(address)}
                </Badge>
              </div>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
