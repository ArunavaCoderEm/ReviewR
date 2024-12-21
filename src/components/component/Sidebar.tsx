"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`
        fixed
        top-0
        left-0
        h-full
        bg-muted
        text-muted-foreground
        w-64
        transform
        transition-transform
        duration-300
        ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="p-4 font-bold text-lg flex justify-between items-center mt-20">
        <span>My Sidebar</span>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-muted-foreground"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-muted-foreground/20 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-muted-foreground/20 rounded"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="block px-4 py-2 hover:bg-muted-foreground/20 rounded"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block px-4 py-2 hover:bg-muted-foreground/20 rounded"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
