"use client";

import { useState } from "react";
import { BasePanel } from "./BasePanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API_BASE_URL = "http://127.0.0.1:3000";

export const TransferCertificatePanel = () => {
  const [certId, setCertId] = useState("");
  const [newOwnerAddress, setNewOwnerAddress] = useState("");
  const [currentOwnerSecretKey, setCurrentOwnerSecretKey] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTransferCertificate = async () => {
    if (!certId.trim() || !newOwnerAddress.trim() || !currentOwnerSecretKey.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/certificates/${encodeURIComponent(certId)}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_owner_address: newOwnerAddress,
          current_owner_secret_key: currentOwnerSecretKey,
        }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasePanel
      title="Transfer Certificate"
      description="Transfer ownership of a certificate to a new owner"
      endpoint="/certificates/{id}/transfer"
      method="POST"
      onSubmit={handleTransferCertificate}
      isLoading={isLoading}
      response={response}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="cert-id">Certificate ID</Label>
          <Input
            id="cert-id"
            placeholder="Enter certificate ID to transfer"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            The unique identifier of the certificate to transfer
          </p>
        </div>

        <div>
          <Label htmlFor="new-owner">New Owner Address</Label>
          <Input
            id="new-owner"
            placeholder="Enter new owner's Stellar address"
            value={newOwnerAddress}
            onChange={(e) => setNewOwnerAddress(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Stellar address of the new certificate owner
          </p>
        </div>

        <div>
          <Label htmlFor="secret-key">Current Owner Secret Key</Label>
          <Textarea
            id="secret-key"
            placeholder="Enter current owner's secret key"
            value={currentOwnerSecretKey}
            onChange={(e) => setCurrentOwnerSecretKey(e.target.value)}
            className="mt-1"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            Secret key of the current owner to authorize the transfer
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            ⚠️ Warning: Never share your secret key. This is for testing purposes only.
          </p>
        </div>
      </div>
    </BasePanel>
  );
};