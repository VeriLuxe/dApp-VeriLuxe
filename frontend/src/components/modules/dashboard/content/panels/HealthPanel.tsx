"use client";

import { useState } from "react";
import { BasePanel } from "./BasePanel";

const API_BASE_URL = "http://127.0.0.1:3000";

export const HealthPanel = () => {
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleHealthCheck = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
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
      title="Health Check"
      description="Check the health status of the VeriLuxe API"
      endpoint="/health"
      method="GET"
      onSubmit={handleHealthCheck}
      isLoading={isLoading}
      response={response}
    >
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          This endpoint doesn't require any parameters. Click "Execute Request" to check the API health status.
        </p>
      </div>
    </BasePanel>
  );
};