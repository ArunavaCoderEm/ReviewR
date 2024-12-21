"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/component/Sidebar";
import { Copy, LayoutDashboard, PlusCircleIcon } from "lucide-react";
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
import { websitesProps } from "@/Types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard(): React.ReactNode {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [webname, setWebname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [websites, setWebsites] = useState<websitesProps[]>([]);

  const getwebsites = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/getWebsites/${user?.id}`);
      setWebsites(response?.data?.yourWebsites);
    } catch (error: any) {
      console.error("Error occurred while generating review link:", error);
      const errorMessage = error?.response?.data?.error || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getwebsites();
  }, [user?.id]);

  const arr: number[] = [1, 2, 3, 4, 5, 6, 7];

  const handleSubmit = async () => {
    if (websiteUrl) {
      setLoading(true);
      try {
        const datasend = {
          url: websiteUrl,
          userId: user?.id || "",
          name: webname,
          creatorFullName: user?.fullName
        };

        const response = await axios.post("/api/createWebsite", datasend);
        setWebsiteUrl("");
        getwebsites();
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

  const copyLink = (link: string, name: string): void => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported in this browser.");
      return;
    }

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success(`Link copied to clipboard ${name}`);
      })
      .catch((error) => {
        toast.error("Failed to copy link");
        alert("Failed to copy the link. Please try again.");
      });
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
              <div className="px-6 py-4 flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="url" className="ml-1 mb-1">
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
                <div className="flex flex-col gap-1">
                  <label htmlFor="url" className="ml-1 mb-2">
                    Your Website Name.
                  </label>
                  <Input
                    required
                    value={webname}
                    onChange={(e) => setWebname(e.target.value)}
                    type="name"
                    placeholder="Website name goes here ..."
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mb-2 font-semibold mx-auto mt-10"
                >
                  {loading ? "Generating..." : "Submit"}
                </Button>
                <DrawerClose asChild>
                  <Button
                    className="w-full mb-2 font-semibold mx-auto"
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
          {loading && (
            <div className="grid gap-2 mt-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 h-96 overflow-y-auto">
              {arr.map((item, index) => {
                return <Skeleton key={index} />;
              })}
            </div>
          )}
          {!loading && websites.length > 0 && (
            <div className="grid gap-2 mt-7 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 h-96 overflow-y-auto">
              {websites?.map((item: websitesProps, index: number) => {
                return (
                  <div key={index}>
                    <Link href={""}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{item?.name}</CardTitle>
                          <CardDescription className="mt-2">
                            {item?.url}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="font-semibold">
                            Createdby :{" "}
                            <span className="text-muted-foreground">
                              {user?.fullName}
                            </span>
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="font-semibold"
                            onClick={() =>
                              copyLink(item?.reviewLink, item?.name)
                            }
                          >
                            Copy Review Link
                            <Copy />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
          {!loading && websites.length <= 0 && (
            <>
              <p className="text-xl mt-5 ml-2 text-destructive">
                🚫 No Websites Has Been Reviewed 🚫
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
