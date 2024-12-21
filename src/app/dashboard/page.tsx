"use client";

import React, { useState } from "react";
import Sidebar from "@/components/component/Sidebar";
import { LayoutDashboard } from "lucide-react";

export default function Dashboard():React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ${isOpen ? "md:ml-64" : "md:ml-64"}`}>
        <div className="bg-background min-h-screen p-4">
          {!isOpen && (
            <button
              onClick={toggleSidebar}
              className="md:hidden absolute right-5 bg-muted text-muted-foreground p-2 rounded mb-4"
            >
              <LayoutDashboard />
            </button>
          )}
          <h1 className="text-2xl font-bold">Responsive Sidebar Layout</h1>
          <p className="mt-4">This is the main content area.</p>
        </div>
      </div>
    </div>
  );
}
