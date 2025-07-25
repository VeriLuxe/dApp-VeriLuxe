"use client";

import { OverviewPanel } from "./panels/OverviewPanel";
import { HealthPanel } from "./panels/HealthPanel";
import { InitContractPanel } from "./panels/InitContractPanel";
import { IssueCertificatePanel } from "./panels/IssueCertificatePanel";
import { VerifyCertificatePanel } from "./panels/VerifyCertificatePanel";
import { GetCertificatePanel } from "./panels/GetCertificatePanel";
import { TransferCertificatePanel } from "./panels/TransferCertificatePanel";
import { RevokeCertificatePanel } from "./panels/RevokeCertificatePanel";
import { CheckExistsPanel } from "./panels/CheckExistsPanel";

interface DashboardContentProps {
  selectedEndpoint: string;
}

export const DashboardContent = ({ selectedEndpoint }: DashboardContentProps) => {
  const renderPanel = () => {
    switch (selectedEndpoint) {
      case "overview":
        return <OverviewPanel />;
      case "health":
        return <HealthPanel />;
      case "init":
        return <InitContractPanel />;
      case "issue":
        return <IssueCertificatePanel />;
      case "verify":
        return <VerifyCertificatePanel />;
      case "get":
        return <GetCertificatePanel />;
      case "transfer":
        return <TransferCertificatePanel />;
      case "revoke":
        return <RevokeCertificatePanel />;
      case "exists":
        return <CheckExistsPanel />;
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {renderPanel()}
    </main>
  );
};