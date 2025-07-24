"use client";

import { FashionAuthDApp } from "@/components/modules/dapp/FashionAuthDApp";
import { LandingPage } from "@/components/modules/landing/ui/pages/LandingPage";
import { useState } from "react";

export default function App() {
  const [showDApp, setShowDApp] = useState(false);

  if (showDApp) {
    return <FashionAuthDApp />;
  }

  return <LandingPage onEnterDApp={() => setShowDApp(true)} />;
}
