"use client";

import { useRouter } from "next/navigation";
import { useGlobalAuthenticationStore } from "@/auth/store/data";
import { useWallet } from "@/auth/hooks/useWallet.hook";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Wallet } from "lucide-react";

export const DashboardHeader = () => {
  const router = useRouter();
  const address = useGlobalAuthenticationStore((state) => state.address);
  const name = useGlobalAuthenticationStore((state) => state.name);
  const { handleDisconnect } = useWallet();

  const shortenAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-yellow-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Management</h2>
          <p className="text-gray-600 text-sm">Manage VeriLuxe certificate operations</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-yellow-600" />
            <div>
              <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                {name}
              </Badge>
              <p className="text-xs text-gray-600 mt-1">{shortenAddress(address)}</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await handleDisconnect();
              router.push("/");
            }}
            className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </div>
    </header>
  );
};