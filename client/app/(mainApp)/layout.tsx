"use client";

import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useCurrentUser();

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col w-full h-[80%]">{children}</div>
      <div className="p-4 flex justify-center h-[20%] items-center w-full">
        <Navbar />
      </div>
    </div>
  );
}
