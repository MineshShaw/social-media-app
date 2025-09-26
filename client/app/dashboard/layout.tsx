"use client";

import Navbar from "@/components/Navbar";
import React from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function DashboardLayout({
  feed,
  messages,
  profile,
  children,
}: {
  feed: React.ReactNode;
  messages: React.ReactNode;
  profile: React.ReactNode;
  children: React.ReactNode;
}) {
  useCurrentUser();

  return (
    <div className="flex flex-col w-full h-screen">
      <main
        style={{ padding: 24 }}
        className="flex-1 flex flex-col"
      >
        {children}

        <div className="flex gap-4 justify-center flex-1">
          {/* Profile column */}
          <div className="flex-1 max-w-[20%] overflow-y-auto">
            {profile}
          </div>

          {/* Feed column */}
          <div className="flex-1 max-w-[50%] overflow-y-auto">
            {feed}
          </div>

          {/* Messages column */}
          <div className="flex-1 max-w-[20%] overflow-y-auto">
            {messages}
          </div>
        </div>
      </main>
      <div className="p-4 flex justify-center items-center w-full">
      <Navbar />
      </div>
    </div>
  );
}
