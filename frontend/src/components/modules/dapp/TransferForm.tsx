"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, CheckCircle } from "lucide-react";

interface TransferFormProps {
  onTransfer: (certId: string, newOwner: string) => void;
}

export function TransferForm({ onTransfer }: TransferFormProps) {
  const [certId, setCertId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTransfer(certId, newOwner);
    setSuccess(true);
    setCertId("");
    setNewOwner("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="transfer-cert-id"
            className="text-sm font-medium text-gray-700"
          >
            Certificate ID
          </label>
          <input
            id="transfer-cert-id"
            className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            placeholder="CERT001"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="new-owner-address"
            className="text-sm font-medium text-gray-700"
          >
            New Owner Address
          </label>
          <input
            id="new-owner-address"
            className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            placeholder="GCKFBEIYTKQTNTQUFQXILQABXQBQ..."
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-rose-300 hover:bg-rose-400 text-gray-800 border-0"
        >
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Transfer Certificate
        </Button>
      </form>
      {success && (
        <div className="border border-emerald-200 bg-emerald-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
            <span className="text-emerald-800">
              Certificate transferred successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
