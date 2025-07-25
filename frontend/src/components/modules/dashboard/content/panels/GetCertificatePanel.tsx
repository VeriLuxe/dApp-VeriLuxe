"use client";

import { useState } from "react";
import { BasePanel } from "./BasePanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = "http://127.0.0.1:3000";

export const GetCertificatePanel = () => {
  const [certId, setCertId] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCertificate = async () => {
    if (!certId.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/certificates/${encodeURIComponent(certId)}`);
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
      title="Get Certificate"
      description="Retrieve detailed information about a certificate by its ID"
      endpoint="/certificates/{id}"
      method="GET"
      onSubmit={handleGetCertificate}
      isLoading={isLoading}
      response={response}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="cert-id">Certificate ID</Label>
          <Input
            id="cert-id"
            placeholder="Enter certificate ID to retrieve"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            The unique identifier of the certificate you want to retrieve
          </p>
        </div>
      </div>
    </BasePanel>
  );
};