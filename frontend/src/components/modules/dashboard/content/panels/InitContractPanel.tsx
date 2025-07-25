"use client";

import { useState } from "react";
import { BasePanel } from "./BasePanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = "http://127.0.0.1:3000";

export const InitContractPanel = () => {
  const [adminAddress, setAdminAddress] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInitContract = async () => {
    if (!adminAddress.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_address: adminAddress,
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
      title="Initialize Contract"
      description="Initialize the smart contract with an admin address"
      endpoint="/init"
      method="POST"
      onSubmit={handleInitContract}
      isLoading={isLoading}
      response={response}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="admin-address">Admin Address</Label>
          <Input
            id="admin-address"
            placeholder="Enter Stellar address (e.g., GXXXXXXX...)"
            value={adminAddress}
            onChange={(e) => setAdminAddress(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            The Stellar address that will have admin privileges on the contract
          </p>
        </div>
      </div>
    </BasePanel>
  );
};