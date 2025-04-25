"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, useUser } from "@clerk/nextjs";

export default function BottomBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // Avoid rendering while loading

  return (
    <div className="bg-white">
      <div>{children}</div>
    </div>
  );
}
