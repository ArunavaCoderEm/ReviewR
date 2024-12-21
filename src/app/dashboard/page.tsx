"use client";

import React, { useState } from "react";
import Sidebar from "@/components/component/Sidebar";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ${isOpen ? "md:ml-64" : "md:ml-64"}`}>
        <div className="bg-background min-h-screen p-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden bg-muted text-muted-foreground p-2 rounded mb-4"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
          <h1 className="text-2xl font-bold">Responsive Sidebar Layout</h1>
          <p className="mt-4">This is the main content area.</p>
        </div>
      </div>
    </div>
  );
}
