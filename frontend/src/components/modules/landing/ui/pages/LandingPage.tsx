"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowRight } from "lucide-react";
import { WalletButton } from "@/components/ui/WalletButton";

export function LandingPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-rose-400" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">VeriLuxe</h1>
                <p className="text-xs text-rose-400">Powered by Stellar</p>
              </div>
            </div>
            <WalletButton />
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-red-100 text-red-700 border-red-200">
                $500B+ Counterfeit Market Problem
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Authenticity Certification in{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-transparent">
                  Luxury Fashion
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                VeriLuxe issues certified NFTs as digital twins of physical
                luxury fashion items using Stellar blockchain. Verify
                authenticity, track ownership, and combat counterfeits with
                transparent, cost-effective solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleEnter}
                size="lg"
                className="bg-rose-300 hover:bg-rose-400 text-gray-800 font-semibold text-lg px-8 py-3 border-0"
              >
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-rose-200 text-gray-700 hover:bg-rose-50 text-lg px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-rose-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-rose-400" />
              <span className="text-gray-900 font-semibold">VeriLuxe</span>
              <Badge
                variant="outline"
                className="border-rose-200 text-rose-500"
              >
                Powered by Stellar
              </Badge>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} VeriLuxe. Revolutionizing luxury
              fashion authenticity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
