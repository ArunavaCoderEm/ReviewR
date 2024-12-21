"use client";

import React, { useState } from "react";
import Sidebar from "@/components/component/Sidebar";
import { LayoutDashboard, PlusCircleIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard(): React.ReactNode {
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const arr = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        fullName={user?.fullName}
        imgUrl={user?.imageUrl}
        email={user?.emailAddresses[0]?.emailAddress}
        toggleSidebar={toggleSidebar}
      />
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
          <Button className="mt-10 font-[600]">
            Get Reviews For New Website
            <PlusCircleIcon />
          </Button>
          <p className="mt-10 text-2xl bg-clip-text text-transparent bg-gradient-to-b from-muted-foreground to-card-foreground font-extrabold">
            Here are your previous websites with reviews.
          </p>
          <div className="grid gap-2 mt-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 h-96 overflow-y-auto">
            {arr.map((item, index) => {
              return <Skeleton key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
