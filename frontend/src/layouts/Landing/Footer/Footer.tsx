"use client";

import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-rose-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-rose-400" />
            <span className="text-gray-900 font-semibold">VeriLuxe</span>
            <Badge variant="outline" className="border-rose-200 text-rose-500">
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
  );
}
