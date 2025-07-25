"use client";

import { useState } from "react";
import { BasePanel } from "./BasePanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = "http://127.0.0.1:3000";

export const RevokeCertificatePanel = () => {
  const [certId, setCertId] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRevokeCertificate = async () => {
    if (!certId.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/certificates/${encodeURIComponent(certId)}/revoke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      title="Revoke Certificate"
      description="Permanently revoke a certificate, making it invalid"
      endpoint="/certificates/{id}/revoke"
      method="POST"
      onSubmit={handleRevokeCertificate}
      isLoading={isLoading}
      response={response}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="cert-id">Certificate ID</Label>
          <Input
            id="cert-id"
            placeholder="Enter certificate ID to revoke"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            The unique identifier of the certificate to revoke
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-800">
            ⚠️ Warning: This action is irreversible. Once revoked, a certificate cannot be restored.
          </p>
        </div>
      </div>
    </BasePanel>
  );
};