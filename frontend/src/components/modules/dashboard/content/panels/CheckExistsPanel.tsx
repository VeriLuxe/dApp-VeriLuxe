"use client";

import { useState } from "react";
import { BasePanel } from "./BasePanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = "http://127.0.0.1:3000";

export const CheckExistsPanel = () => {
  const [certId, setCertId] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckExists = async () => {
    if (!certId.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/certificates/${encodeURIComponent(certId)}/exists`);
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
      title="Check Certificate Existence"
      description="Check whether a certificate with the given ID exists in the system"
      endpoint="/certificates/{id}/exists"
      method="GET"
      onSubmit={handleCheckExists}
      isLoading={isLoading}
      response={response}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="cert-id">Certificate ID</Label>
          <Input
            id="cert-id"
            placeholder="Enter certificate ID to check"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            The unique identifier of the certificate to check for existence
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            ℹ️ This endpoint returns a boolean indicating whether the certificate exists.
          </p>
        </div>
      </div>
    </BasePanel>
  );
};