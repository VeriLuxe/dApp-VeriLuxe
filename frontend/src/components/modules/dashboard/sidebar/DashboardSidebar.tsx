"use client";

import { 
  Home, 
  Settings, 
  Shield, 
  FileText, 
  ArrowRightLeft, 
  XCircle, 
  CheckCircle,
  Activity,
  Search,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  selectedEndpoint: string;
  onEndpointSelect: (endpoint: string) => void;
}

const sidebarItems = [
  {
    id: "overview",
    name: "Overview",
    icon: Home,
    description: "Dashboard overview"
  },
  {
    id: "health",
    name: "Health Check",
    icon: Activity,
    description: "API health status"
  },
  {
    id: "init",
    name: "Initialize Contract",
    icon: Settings,
    description: "Initialize smart contract"
  },
  {
    id: "issue",
    name: "Issue Certificate",
    icon: FileText,
    description: "Create new certificates"
  },
  {
    id: "verify",
    name: "Verify Certificate",
    icon: Shield,
    description: "Verify certificate authenticity"
  },
  {
    id: "get",
    name: "Get Certificate",
    icon: Download,
    description: "Retrieve certificate details"
  },
  {
    id: "transfer",
    name: "Transfer Certificate",
    icon: ArrowRightLeft,
    description: "Transfer ownership"
  },
  {
    id: "revoke",
    name: "Revoke Certificate",
    icon: XCircle,
    description: "Revoke certificates"
  },
  {
    id: "exists",
    name: "Check Existence",
    icon: Search,
    description: "Check if certificate exists"
  }
];

export const DashboardSidebar = ({ selectedEndpoint, onEndpointSelect }: DashboardSidebarProps) => {
  return (
    <div className="w-64 bg-white/70 backdrop-blur-sm border-r border-yellow-200 shadow-lg flex flex-col h-screen">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 p-6 border-b border-yellow-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            VeriLuxe
          </h1>
        </div>
        <p className="text-sm text-gray-600 mt-2">API Management Dashboard</p>
      </div>
      
      {/* Navigation Section - Scrollable */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onEndpointSelect(item.id)}
                className={cn(
                  "w-full flex items-start px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  selectedEndpoint === item.id
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"
                )}
              >
                {/* Icon Container - Fixed size and alignment */}
                <div className="flex-shrink-0 w-5 h-5 mr-3 mt-0.5">
                  <Icon 
                    className="w-full h-full" 
                    strokeWidth={2}
                  />
                </div>
                
                {/* Text Content - Flexible */}
                <div className="text-left flex-1 min-w-0">
                  <div className="font-medium leading-tight truncate">
                    {item.name}
                  </div>
                  <div className={cn(
                    "text-xs leading-tight mt-0.5 truncate",
                    selectedEndpoint === item.id ? "text-yellow-100" : "text-gray-500"
                  )}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};