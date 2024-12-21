"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTheme } from "next-themes";
import { menuItemsProps } from "@/Types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { checkUserNeon } from "@/hooks/checkUser";

const menuItems: menuItemsProps[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Features", href: "/features" },
  { title: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const helperFunc = async () => {
      await checkUserNeon();
    };
    helperFunc();
  }, []);

  const router = useRouter();

  const { signOut } = useClerk();

  const [active, setActive] = useState<string>("home");

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="flex z-10 items-center justify-between p-4 bg-background shadow-md dark:bg-background-dark relative">
      <Link
        onClick={() => {
          setActive("Home");
        }}
        href="/"
        className="flex items-center space-x-2"
      >
        <Image
          src="/Images/reviewRlogo.jpeg"
          width={30}
          height={30}
          alt="LogoPic"
          className="object-contain rounded-md"
        />
      </Link>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="flex gap-3 items-center">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link
                onClick={() => {
                  setActive(item.title);
                }}
                href={item.href}
                className={`text-sm ${
                  active === item.title
                    ? "bg-gradient-to-b text-white from-black to-black/80 dark:bg-gradient-to-b dark:from-white dark:to-gray-300 dark:text-black"
                    : "hover:text-teal-600 dark:hover:text-teal-400"
                } px-3 py-2 rounded-lg font-[500] transition-all duration-200`}
              >
                {item.title}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-2 items-center">
        <Collapsible
          className="md:hidden"
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle menu"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? (
                <Menu className="h-6 w-6 text-teal-500 dark:text-teal-400" />
              ) : (
                <X className="h-6 w-6 text-red-600 dark:text-red-500" />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent
            className={`absolute bg-gradient-to-b from-background to-background/90 list-none top-full left-0 w-full p-4 transition-all ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <nav className="flex flex-col list-none gap-4 items-center">
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={index} className="w-full">
                  <Link
                    onClick={() => {
                      setActive(item.title);
                      setIsOpen(false);
                    }}
                    href={item.href}
                    className={`flex flex-col list-none text-sm text-center w-full ${
                      active === item.title
                        ? "bg-gradient-to-b text-white from-black to-black/80 dark:bg-gradient-to-b dark:from-white dark:to-gray-300 dark:text-black"
                        : "hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted-foreground/10"
                    } px-3 py-2 rounded-lg font-[500] transition-all duration-200`}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </nav>
          </CollapsibleContent>
        </Collapsible>
        <Select value={theme} onValueChange={(value) => setTheme(value)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="cursor-pointer">
            <SelectItem className="cursor-pointer" value="light">
              Light
            </SelectItem>
            <SelectItem className="cursor-pointer" value="dark">
              Dark
            </SelectItem>
            <SelectItem className="cursor-pointer" value="system">
              System
            </SelectItem>
          </SelectContent>
        </Select>
        <SignedOut>
          <Button
            onClick={() => router.push("/sign-in")}
            className="inline-flex font-semibold"
          >
            Get Started
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="inline-flex font-semibold"
          >
            Sign Out
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
}
