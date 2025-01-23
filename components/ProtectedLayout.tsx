import React from "react";
import { Redirect } from "expo-router";
import { useDB } from "@/hooks/useDB";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useDB();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <>{children}</>;
} 