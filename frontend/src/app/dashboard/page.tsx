"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalAuthenticationStore } from "@/auth/store/data";
import { DashboardLayout } from "@/components/modules/dashboard/layout/DashboardLayout";

export default function DashboardPage() {
  const address = useGlobalAuthenticationStore((state) => state.address);
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  if (!address) {
    return null;
  }

  return <DashboardLayout />;
}