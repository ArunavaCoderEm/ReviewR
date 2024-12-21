"use client";

import React, { useState } from "react";
import Sidebar from "@/components/component/Sidebar";
import { LayoutDashboard, PlusCircleIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

export default function Dashboard(): React.ReactNode {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const arr: number[] = [1, 2, 3, 4, 5, 6, 7];

  const handleSubmit = async () => {
    if (websiteUrl) {
      setLoading(true);
      try {
        const datasend = {
          url: websiteUrl,
          userId: user?.id || "",
        };

        const response = await axios.post("/api/createWebsite", datasend);
        setWebsiteUrl("");
        toast.success("Website has been added.");
      } catch (error: any) {
        console.error("Error occurred while generating review link:", error);

        const errorMessage =
          error?.response?.data?.error || "An error occurred";

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

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

          <Drawer>
            <DrawerTrigger asChild>
              <Button className="mt-10 font-[600]">
                Get Reviews For New Website
                <PlusCircleIcon />
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Create a link to generate reviews !</DrawerTitle>
                <DrawerDescription>
                  Paste your website link in the given section to generate a
                  link to add reviews from users.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-6 py-4 flex flex-col gap-1">
                <label htmlFor="url" className="ml-1 mb-2">
                  Your Website URL.
                </label>
                <Input
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  type="text"
                  placeholder="Your URL goes here ..."
                />
              </div>
              <DrawerFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full md:w-80 font-semibold mx-auto mt-10"
                >
                  {loading ? "Generating..." : "Submit"}
                </Button>
                <DrawerClose asChild>
                  <Button
                    className="w-full md:w-80 font-semibold mx-auto"
                    variant="destructive"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

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
