"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface LandingHeroProps {
  address: string | null;
  handleConnect: () => void;
}

export function LandingHero({ address, handleConnect }: LandingHeroProps) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-red-100 text-red-700 border-red-200">
              $500B+ Counterfeit Market Problem
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Authenticity Certification in{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                Luxury Fashion
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              VeriLuxe issues certified NFTs as digital twins of physical luxury
              fashion items using Stellar blockchain. Verify authenticity, track
              ownership, and combat counterfeits with transparent,
              cost-effective solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleConnect}
              size="lg"
              disabled={!!address}
              className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold text-lg px-8 py-3 border-0"
            >
              {address ? "Entering DApp..." : "Get Started"}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-yellow-200 text-gray-700 hover:bg-yellow-50 text-lg px-8 py-3 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
