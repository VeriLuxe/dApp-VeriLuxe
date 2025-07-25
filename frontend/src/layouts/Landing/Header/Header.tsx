"use client";

import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Wallet } from "lucide-react";

interface LandingHeaderProps {
  address: string | null;
  handleConnect: () => void;
  handleDisconnect: () => void;
}

export function LandingHeader({
  address,
  handleConnect,
  handleDisconnect,
}: LandingHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-yellow-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">VeriLuxe</h1>
              <p className="text-xs text-yellow-400">Powered by Stellar</p>
            </div>
          </div>
          <Button
            onClick={address ? handleDisconnect : handleConnect}
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold border-0"
          >
            {address ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                {address.slice(0, 6)}...{address.slice(-4)}
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
