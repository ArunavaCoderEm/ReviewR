"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { sidebarProps } from "@/Types/types";

const Sidebar: React.FC<sidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useUser();

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
        flex
        flex-col
        justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div>
        <div className="p-4 font-bold text-lg flex justify-between items-center mt-20">
          <span className="text-foreground flex gap-1 items-center">
            <img src="/Images/reviewRlogo.jpeg" className="rounded-full w-8" alt="" />
            ReviewR
            </span>
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

      <div className="p-4 bg-muted-foreground/10 border-t border-muted-foreground/20 flex items-center space-x-4">
        <img
          src={user?.imageUrl ?? "/default-profile.png"}
          className="rounded-full w-12 h-12 object-cover"
          alt="Profile Picture"
        />
        <div>
          <p className="font-medium">{user?.fullName || "Guest User"}</p>
          <p className="text-sm text-muted-foreground">
            {user?.emailAddresses[0]?.emailAddress || "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
