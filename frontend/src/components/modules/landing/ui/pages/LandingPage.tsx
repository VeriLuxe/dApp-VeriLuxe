"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalAuthenticationStore } from "@/auth/store/data";
import { useWallet } from "@/auth/hooks/useWallet.hook";
import { LandingHeader } from "../../../../../layouts/Landing/Header/Header";
import { LandingHero } from "../hero/LandingHero";
import { LandingFooter } from "../../../../../layouts/Landing/Footer/Footer";

const LandingPage = () => {
  const { handleConnect, handleDisconnect } = useWallet();
  const address = useGlobalAuthenticationStore((state) => state.address);
  const [hasConnected, setHasConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (address) {
      setHasConnected(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  }, [address, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <LandingHeader
        address={address}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      />
      <div className="flex-1">
        <LandingHero address={address} handleConnect={handleConnect} />
      </div>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
