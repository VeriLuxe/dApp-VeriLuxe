"use client";

import { useState } from "react";
import { BasePanel } from "./BasePanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API_BASE_URL = "http://127.0.0.1:3000";

export const IssueCertificatePanel = () => {
  const [certId, setCertId] = useState("");
  const [metadataHash, setMetadataHash] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIssueCertificate = async () => {
    if (!certId.trim() || !metadataHash.trim() || !ownerAddress.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/certificates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cert_id: certId,
          metadata_hash: metadataHash,
          owner_address: ownerAddress,
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
      title="Issue Certificate"
      description="Create a new authenticity certificate for a luxury item"
      endpoint="/certificates"
      method="POST"
      onSubmit={handleIssueCertificate}
      isLoading={isLoading}
      response={response}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="cert-id">Certificate ID</Label>
          <Input
            id="cert-id"
            placeholder="Enter unique certificate ID"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Unique identifier for the certificate
          </p>
        </div>

        <div>
          <Label htmlFor="metadata-hash">Metadata Hash</Label>
          <Textarea
            id="metadata-hash"
            placeholder="Enter metadata hash (SHA-256 recommended)"
            value={metadataHash}
            onChange={(e) => setMetadataHash(e.target.value)}
            className="mt-1"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            Hash of the item's metadata (authenticity details, photos, etc.)
          </p>
        </div>

        <div>
          <Label htmlFor="owner-address">Owner Address</Label>
          <Input
            id="owner-address"
            placeholder="Enter owner's Stellar address"
            value={ownerAddress}
            onChange={(e) => setOwnerAddress(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Stellar address of the certificate owner
          </p>
        </div>
      </div>
    </BasePanel>
  );
};