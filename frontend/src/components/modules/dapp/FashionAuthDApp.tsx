"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Award,
  Search,
  ArrowRightLeft,
  XCircle,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { VerifyForm } from "./VerifyForm";
import { IssueForm } from "./IssueForm";
import { TransferForm } from "./TransferForm";
import { RevokeForm } from "./RevokeForm";
import { CertificatesList } from "./CertificatesList";
import { AdminPanel } from "./AdminPanel";
import { useFashionAuth } from "../landing/hooks/useFashionAuth";
import { WalletButton } from "@/components/ui/WalletButton";

export function FashionAuthDApp() {
  const [activeTab, setActiveTab] = useState("verify");
  const {
    isAdmin,
    adminAddress,
    certificates,
    isLoading,
    error,
    isWalletConnected,
    userPublicKey,
    contractAddress,
    handleInitContract,
    handleIssueCertificate,
    handleVerifyCertificate,
    handleTransferCertificate,
    handleRevokeCertificate,
    clearError,
  } = useFashionAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-400"></div>
            <span className="text-gray-700">Processing transaction...</span>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-rose-400" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">VeriLuxe</h1>
                <p className="text-xs text-rose-400">
                  Luxury Authentication Platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {error && (
                <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                  <button
                    onClick={clearError}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              )}
              <WalletButton />
              {contractAddress && (
                <Badge variant="outline" className="border-green-200 text-green-600">
                  Contract Connected
                </Badge>
              )}
              {isAdmin && (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  <Settings className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
              )}
              <Badge
                variant="outline"
                className="border-rose-200 text-rose-500"
              >
                Stellar Network
              </Badge>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isWalletConnected ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Shield className="h-16 w-16 text-rose-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                Please connect your Stellar wallet to interact with the VeriLuxe Fashion Authenticity platform.
              </p>
              <WalletButton />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 bg-white rounded-lg p-1 shadow-sm border border-rose-100">
            <Button
              variant={activeTab === "verify" ? "default" : "ghost"}
              onClick={() => setActiveTab("verify")}
              className={`flex items-center gap-2 ${
                activeTab === "verify"
                  ? "bg-rose-300 text-gray-800 hover:bg-rose-400"
                  : "text-gray-600 hover:text-gray-900 hover:bg-rose-50"
              }`}
            >
              <Search className="h-4 w-4" />
              Verify
            </Button>
            <Button
              variant={activeTab === "issue" ? "default" : "ghost"}
              onClick={() => setActiveTab("issue")}
              className={`flex items-center gap-2 ${
                activeTab === "issue"
                  ? "bg-rose-300 text-gray-800 hover:bg-rose-400"
                  : "text-gray-600 hover:text-gray-900 hover:bg-rose-50"
              }`}
            >
              <Award className="h-4 w-4" />
              Issue
            </Button>
            <Button
              variant={activeTab === "transfer" ? "default" : "ghost"}
              onClick={() => setActiveTab("transfer")}
              className={`flex items-center gap-2 ${
                activeTab === "transfer"
                  ? "bg-rose-300 text-gray-800 hover:bg-rose-400"
                  : "text-gray-600 hover:text-gray-900 hover:bg-rose-50"
              }`}
            >
              <ArrowRightLeft className="h-4 w-4" />
              Transfer
            </Button>
            <Button
              variant={activeTab === "revoke" ? "default" : "ghost"}
              onClick={() => setActiveTab("revoke")}
              className={`flex items-center gap-2 ${
                activeTab === "revoke"
                  ? "bg-rose-300 text-gray-800 hover:bg-rose-400"
                  : "text-gray-600 hover:text-gray-900 hover:bg-rose-50"
              }`}
            >
              <XCircle className="h-4 w-4" />
              Revoke
            </Button>
            <Button
              variant={activeTab === "certificates" ? "default" : "ghost"}
              onClick={() => setActiveTab("certificates")}
              className={`flex items-center gap-2 ${
                activeTab === "certificates"
                  ? "bg-rose-300 text-gray-800 hover:bg-rose-400"
                  : "text-gray-600 hover:text-gray-900 hover:bg-rose-50"
              }`}
            >
              <Shield className="h-4 w-4" />
              Certificates
            </Button>
            <Button
              variant={activeTab === "admin" ? "default" : "ghost"}
              onClick={() => setActiveTab("admin")}
              className={`flex items-center gap-2 ${
                activeTab === "admin"
                  ? "bg-rose-300 text-gray-800 hover:bg-rose-400"
                  : "text-gray-600 hover:text-gray-900 hover:bg-rose-50"
              }`}
            >
              <Settings className="h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
        {/* Tab Content */}
        {activeTab === "verify" && (
          <Card className="bg-white border-rose-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Search className="h-5 w-5 text-rose-400" />
                Verify Product Authenticity
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter the certificate ID and metadata hash to verify a fashion
                items authenticity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VerifyForm onVerify={handleVerifyCertificate} />
            </CardContent>
          </Card>
        )}
        {activeTab === "issue" && (
          <Card className="bg-white border-rose-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Award className="h-5 w-5 text-rose-400" />
                Issue New Certificate
              </CardTitle>
              <CardDescription className="text-gray-600">
                Create a new authenticity certificate for a fashion item (Admin
                only)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAdmin ? (
                <IssueForm onIssue={handleIssueCertificate} />
              ) : (
                <div className="border border-amber-200 bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
                    <span className="text-amber-800">
                      Admin privileges required to issue certificates
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {activeTab === "transfer" && (
          <Card className="bg-white border-rose-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <ArrowRightLeft className="h-5 w-5 text-rose-400" />
                Transfer Ownership
              </CardTitle>
              <CardDescription className="text-gray-600">
                Transfer certificate ownership to another address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TransferForm onTransfer={handleTransferCertificate} />
            </CardContent>
          </Card>
        )}
        {activeTab === "revoke" && (
          <Card className="bg-white border-rose-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <XCircle className="h-5 w-5 text-rose-400" />
                Revoke Certificate
              </CardTitle>
              <CardDescription className="text-gray-600">
                Revoke a certificates validity (Admin only)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAdmin ? (
                <RevokeForm onRevoke={handleRevokeCertificate} />
              ) : (
                <div className="border border-amber-200 bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
                    <span className="text-amber-800">
                      Admin privileges required to revoke certificates
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {activeTab === "certificates" && (
          <Card className="bg-white border-rose-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Shield className="h-5 w-5 text-rose-400" />
                All Certificates
              </CardTitle>
              <CardDescription className="text-gray-600">
                View all issued certificates and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CertificatesList certificates={certificates} />
            </CardContent>
          </Card>
        )}
        {activeTab === "admin" && (
          <Card className="bg-white border-rose-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Settings className="h-5 w-5 text-rose-400" />
                Contract Administration
              </CardTitle>
              <CardDescription className="text-gray-600">
                Initialize contract and manage admin settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminPanel
                isAdmin={isAdmin}
                adminAddress={adminAddress}
                userPublicKey={userPublicKey}
                contractAddress={contractAddress}
                certificates={certificates}
                onInit={handleInitContract}
              />
            </CardContent>
          </Card>
        )}
            </>
        )}
      </div>
    </div>
  );
}
