"use client";

import { Card } from "@/components/ui/card";
import { Shield, FileText, CheckCircle, ArrowRightLeft, XCircle, Activity, Settings } from "lucide-react";

const apiEndpoints = [
  {
    name: "Health Check",
    description: "Check API health status",
    endpoint: "GET /health",
    icon: Activity,
    color: "text-green-600 bg-green-100"
  },
  {
    name: "Initialize Contract",
    description: "Initialize smart contract with admin",
    endpoint: "POST /init",
    icon: Settings,
    color: "text-blue-600 bg-blue-100"
  },
  {
    name: "Issue Certificate",
    description: "Create new authenticity certificates",
    endpoint: "POST /certificates",
    icon: FileText,
    color: "text-purple-600 bg-purple-100"
  },
  {
    name: "Get Certificate",
    description: "Retrieve certificate details by ID",
    endpoint: "GET /certificates/{id}",
    icon: Shield,
    color: "text-yellow-600 bg-yellow-100"
  },
  {
    name: "Verify Certificate",
    description: "Verify certificate authenticity",
    endpoint: "POST /certificates/{id}/verify",
    icon: CheckCircle,
    color: "text-emerald-600 bg-emerald-100"
  },
  {
    name: "Transfer Certificate",
    description: "Transfer certificate ownership",
    endpoint: "POST /certificates/{id}/transfer",
    icon: ArrowRightLeft,
    color: "text-orange-600 bg-orange-100"
  },
  {
    name: "Revoke Certificate",
    description: "Revoke existing certificates",
    endpoint: "POST /certificates/{id}/revoke",
    icon: XCircle,
    color: "text-red-600 bg-red-100"
  },
  {
    name: "Check Existence",
    description: "Check if certificate exists",
    endpoint: "GET /certificates/{id}/exists",
    icon: CheckCircle,
    color: "text-indigo-600 bg-indigo-100"
  }
];

export const OverviewPanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">VeriLuxe API Dashboard</h2>
        <p className="text-gray-600">
          Manage luxury fashion authenticity certificates on the Stellar blockchain. 
          Select an endpoint from the sidebar to interact with the VeriLuxe API.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiEndpoints.map((endpoint, index) => {
          const Icon = endpoint.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 border-yellow-100">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${endpoint.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{endpoint.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-800">
                    {endpoint.endpoint}
                  </code>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">About VeriLuxe</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          VeriLuxe is a blockchain-powered authentication system for luxury fashion items. 
          Using the Stellar network, it provides immutable certificates of authenticity 
          that can be issued, verified, transferred, and revoked securely. Each certificate 
          contains metadata hashes that link to detailed product information while maintaining 
          privacy and security on the blockchain.
        </p>
      </Card>
    </div>
  );
};