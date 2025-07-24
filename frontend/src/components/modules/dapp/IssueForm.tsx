"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle } from "lucide-react";

interface IssueFormProps {
  onIssue: (
    certId: string,
    metadataHash: string,
    owner: string,
    productType: string
  ) => void;
}

export function IssueForm({ onIssue }: IssueFormProps) {
  const [certId, setCertId] = useState("");
  const [metadataHash, setMetadataHash] = useState("");
  const [owner, setOwner] = useState("");
  const [productType, setProductType] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onIssue(certId, metadataHash, owner, productType);
    setSuccess(true);
    setCertId("");
    setMetadataHash("");
    setOwner("");
    setProductType("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="new-cert-id"
              className="text-sm font-medium text-gray-700"
            >
              Certificate ID
            </label>
            <input
              id="new-cert-id"
              className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              placeholder="CERT003"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="product-type"
              className="text-sm font-medium text-gray-700"
            >
              Product Type
            </label>
            <input
              id="product-type"
              className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              placeholder="Luxury Handbag"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="new-metadata-hash"
            className="text-sm font-medium text-gray-700"
          >
            Metadata Hash (IPFS)
          </label>
          <input
            id="new-metadata-hash"
            className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            placeholder="QmYwAPJzv5CZsnA5wGZ8roIbHKbDmzqGwjGbeHdGpbFiVzv"
            value={metadataHash}
            onChange={(e) => setMetadataHash(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="owner-address"
            className="text-sm font-medium text-gray-700"
          >
            Owner Address
          </label>
          <input
            id="owner-address"
            className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            placeholder="GCKFBEIYTKQTNTQUFQXILQABXQBQ..."
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-rose-300 hover:bg-rose-400 text-gray-800 border-0"
        >
          <Award className="h-4 w-4 mr-2" />
          Issue Certificate
        </Button>
      </form>
      {success && (
        <div className="border border-emerald-200 bg-emerald-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
            <span className="text-emerald-800">
              Certificate issued successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
