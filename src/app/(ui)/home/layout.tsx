"use client";
import Sidebar from "../../../components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1  p-4">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
