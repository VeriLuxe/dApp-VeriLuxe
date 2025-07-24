"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, CheckCircle, XCircle, Award } from "lucide-react";

interface AdminPanelProps {
  isAdmin: boolean;
  adminAddress: string;
  userPublicKey?: string;
  contractAddress?: string;
  certificates: Certificate[];
  onInit: (adminAddr: string) => void;
}

interface Certificate {
  id: string;
  owner: string;
  metadataHash: string;
  isValid: boolean;
  issueDate: string;
  productType: string;
}

export function AdminPanel({ isAdmin, adminAddress, userPublicKey, contractAddress, certificates, onInit }: AdminPanelProps) {
  const [newAdminAddress, setNewAdminAddress] = useState(userPublicKey || "");
  const [success, setSuccess] = useState(false);

  const handleInit = (e: React.FormEvent) => {
    e.preventDefault();
    onInit(newAdminAddress);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  // Calculate stats from actual certificates
  const totalCertificates = certificates.length;
  const validCertificates = certificates.filter(cert => cert.isValid).length;
  const revokedCertificates = certificates.filter(cert => !cert.isValid).length;

  return (
    <div className="space-y-6">
      {/* Contract Connection Status */}
      <div className="space-y-2">
        <div className={`border p-4 rounded-lg ${contractAddress ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
          <div className="flex items-center">
            {contractAddress ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <div className="text-green-800">
                  <p className="font-semibold">Contract Connected</p>
                  <p className="text-sm mt-1">Address: {contractAddress.slice(0, 20)}...</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-amber-600 mr-2" />
                <div className="text-amber-800">
                  <p className="font-semibold">Contract Not Configured</p>
                  <p className="text-sm mt-1">Please set NEXT_PUBLIC_CONTRACT_ADDRESS in environment variables</p>
                </div>
              </>
            )}
          </div>
        </div>
        {userPublicKey && (
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Settings className="h-4 w-4 text-blue-600 mr-2" />
              <div className="text-blue-800">
                <p className="font-semibold">Your Public Key</p>
                <p className="text-sm mt-1 font-mono">{userPublicKey}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isAdmin ? (
        <div className="space-y-4">
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Settings className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-800">
                Initialize the contract by setting an admin address
              </span>
            </div>
          </div>
          <form onSubmit={handleInit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="admin-address"
                className="text-sm font-medium text-gray-700"
              >
                Admin Address
              </label>
              <input
                id="admin-address"
                className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
                placeholder="GCKFBEIYTKQTNTQUFQXILQABXQBQ..."
                value={newAdminAddress}
                onChange={(e) => setNewAdminAddress(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-rose-300 hover:bg-rose-400 text-gray-800 border-0"
            >
              <Settings className="h-4 w-4 mr-2" />
              Initialize Contract
            </Button>
          </form>
          {success && (
            <div className="border border-emerald-200 bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                <span className="text-emerald-800">
                  Contract initialized successfully!
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border border-emerald-200 bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
              <div className="text-emerald-800">
                <p className="font-semibold">Contract is initialized</p>
                <p className="text-sm mt-1">
                  Admin: {adminAddress.slice(0, 20)}...
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border-rose-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto text-rose-400 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {totalCertificates}
                  </p>
                  <p className="text-sm text-gray-600">Total Certificates</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-emerald-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto text-emerald-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {validCertificates}
                  </p>
                  <p className="text-sm text-gray-600">Valid Certificates</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-red-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <XCircle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {revokedCertificates}
                  </p>
                  <p className="text-sm text-gray-600">Revoked Certificates</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
