"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, XCircle } from "lucide-react";

interface Certificate {
  id: string;
  owner: string;
  metadataHash: string;
  isValid: boolean;
  issueDate: string;
  productType: string;
}

interface VerifyFormProps {
  onVerify: (
    certId: string,
    metadataHash: string
  ) => Promise<{ valid: boolean; certificate: Certificate | null }>;
}

export function VerifyForm({ onVerify }: VerifyFormProps) {
  const [certId, setCertId] = useState("");
  const [metadataHash, setMetadataHash] = useState("");
  const [result, setResult] = useState<{ valid: boolean; certificate: Certificate | null } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const verification = await onVerify(certId, metadataHash);
      setResult(verification);
    } catch (error) {
      console.error('Verification error:', error);
      setResult({ valid: false, certificate: null });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="cert-id"
              className="text-sm font-medium text-gray-700"
            >
              Certificate ID
            </label>
            <input
              id="cert-id"
              className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              placeholder="CERT001"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="metadata-hash"
              className="text-sm font-medium text-gray-700"
            >
              Metadata Hash
            </label>
            <input
              id="metadata-hash"
              className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              placeholder="QmYwAPJzv5CZsnA5wGZ8roIbHKbDmzqGwjGbeHdGpbFiVzv"
              value={metadataHash}
              onChange={(e) => setMetadataHash(e.target.value)}
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-rose-300 hover:bg-rose-400 text-gray-800 border-0 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-800 mr-2"></div>
              Verifying...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Verify Certificate
            </>
          )}
        </Button>
      </form>
      {result && (
        <div
          className={`p-4 rounded-lg border ${
            result.valid
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <div className="flex items-center">
            {result.valid ? (
              <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600 mr-2" />
            )}
            <div className={result.valid ? "text-emerald-800" : "text-red-800"}>
              {result.valid && result.certificate ? (
                <div>
                  <p className="font-semibold">
                    {"✓ Certificate is AUTHENTIC"}
                  </p>
                  <p className="text-sm mt-1">
                    Product: {result.certificate.productType}
                  </p>
                  <p className="text-sm">
                    Owner: {result.certificate.owner.slice(0, 20)}...
                  </p>
                </div>
              ) : (
                <p className="font-semibold">
                  {"✗ Certificate is INVALID or NOT FOUND"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
