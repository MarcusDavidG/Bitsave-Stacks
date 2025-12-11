"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, LogOut, Loader2 } from "lucide-react";

interface WalletConnectProps {
  onConnect?: (address: string, balance: number) => void;
  onDisconnect?: () => void;
}

export function WalletConnectV2({ onConnect, onDisconnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    try {
      const stored = localStorage.getItem('stacks-connect-address');
      if (stored) {
        setAddress(stored);
        setIsConnected(true);
        onConnect?.(stored, 0);
      }
    } catch (error) {
      console.log('No existing connection');
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    
    try {
      const { connect } = await import('@stacks/connect');
      
      const result = await connect({
        // Note: connect() returns a promise, no callbacks needed
      });
      
      console.log('Connect result:', result);
      console.log('Addresses array:', result?.addresses);
      console.log('First address:', result?.addresses?.[0]);
      
      let userAddress = null;
      
      // Find Stacks address in the addresses array by checking for ST prefix
      if (Array.isArray(result?.addresses)) {
        for (const addr of result.addresses) {
          if (addr.address && addr.address.startsWith('ST')) {
            userAddress = addr.address;
            console.log('✅ Found ST address in array:', userAddress);
            break;
          }
        }
      }
      
      // Fallback: Use first address if it's a Stacks address
      if (!userAddress && result?.addresses?.[0]?.address) {
        const firstAddr = result.addresses[0].address;
        if (firstAddr.startsWith('ST') || firstAddr.startsWith('SP')) {
          userAddress = firstAddr;
          console.log('✅ Using first address:', userAddress);
        }
      }
      
      if (userAddress) {
        setAddress(userAddress);
        setIsConnected(true);
        localStorage.setItem('stacks-connect-address', userAddress);
        onConnect?.(userAddress, 0);
        console.log('✅ Connected with address:', userAddress);
      } else {
        console.error('Could not find Stacks address in result');
        alert('Could not find Stacks address. Please make sure your wallet is set to testnet mode.');
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Connection error:', error);
      alert(`Failed to connect: ${error.message || 'Unknown error'}`);
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      const { disconnect } = await import('@stacks/connect');
      await disconnect();
      localStorage.removeItem('stacks-connect-address');
      setIsConnected(false);
      setAddress("");
      onDisconnect?.();
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <Card className="border-2 border-primary/20">
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              ● Connected
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              {truncateAddress(address)}
            </Badge>
          </div>
          <Button
            onClick={handleDisconnect}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Button
          onClick={handleConnect}
          disabled={isLoading}
          size="lg"
          className="w-full transition-smooth glow-on-hover"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </>
          )}
        </Button>
        <CardDescription className="text-center mt-3 text-xs">
          Supports Xverse, Leather & other Stacks wallets
        </CardDescription>
      </CardContent>
    </Card>
  );
}
