import Navbar from '@/components/Navbar';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main style={{ marginLeft: 240, padding: 24 }}>
        {children}
      </main>
    </div>
  );
}
