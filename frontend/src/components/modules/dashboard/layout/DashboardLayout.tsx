"use client";

import { useState } from "react";
import { DashboardSidebar } from "../sidebar/DashboardSidebar";
import { DashboardHeader } from "../header/DashboardHeader";
import { DashboardContent } from "../content/DashboardContent";

export const DashboardLayout = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="flex h-screen">
        <DashboardSidebar 
          selectedEndpoint={selectedEndpoint}
          onEndpointSelect={setSelectedEndpoint}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <DashboardContent selectedEndpoint={selectedEndpoint} />
        </div>
      </div>
    </div>
  );
};