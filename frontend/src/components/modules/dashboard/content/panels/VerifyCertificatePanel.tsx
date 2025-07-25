"use client";

import { useState } from "react";
import { BasePanel } from "./BasePanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API_BASE_URL = "http://127.0.0.1:3000";

export const VerifyCertificatePanel = () => {
  const [certId, setCertId] = useState("");
  const [metadataHash, setMetadataHash] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyCertificate = async () => {
    if (!certId.trim() || !metadataHash.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/certificates/${encodeURIComponent(certId)}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata_hash: metadataHash,
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
      title="Verify Certificate"
      description="Verify the authenticity of a certificate by comparing metadata hashes"
      endpoint="/certificates/{id}/verify"
      method="POST"
      onSubmit={handleVerifyCertificate}
      isLoading={isLoading}
      response={response}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="cert-id">Certificate ID</Label>
          <Input
            id="cert-id"
            placeholder="Enter certificate ID to verify"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            The unique identifier of the certificate to verify
          </p>
        </div>

        <div>
          <Label htmlFor="metadata-hash">Expected Metadata Hash</Label>
          <Textarea
            id="metadata-hash"
            placeholder="Enter the expected metadata hash"
            value={metadataHash}
            onChange={(e) => setMetadataHash(e.target.value)}
            className="mt-1"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            The metadata hash you expect this certificate to have
          </p>
        </div>
      </div>
    </BasePanel>
  );
};