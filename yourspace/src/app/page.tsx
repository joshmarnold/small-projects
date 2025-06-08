"use client";

import { AppShell } from "@/components/app/AppShell";
import { useSeedData } from "@/hooks/useSeedData";

export default function Page() {
  const ready = useSeedData();

  if (!ready) return null;

  return (
    <>
      <AppShell />
    </>
  );
}
