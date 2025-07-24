"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface RevokeFormProps {
  onRevoke: (certId: string) => void;
}

export function RevokeForm({ onRevoke }: RevokeFormProps) {
  const [certId, setCertId] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRevoke(certId);
    setSuccess(true);
    setCertId("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="revoke-cert-id"
            className="text-sm font-medium text-gray-700"
          >
            Certificate ID
          </label>
          <input
            id="revoke-cert-id"
            className="w-full px-3 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            placeholder="CERT001"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-red-400 hover:bg-red-500 text-white border-0"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Revoke Certificate
        </Button>
      </form>
      {success && (
        <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
          <div className="flex items-center">
            <XCircle className="h-4 w-4 text-red-600 mr-2" />
            <span className="text-red-800">
              Certificate revoked successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
