"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { menuItemsProps } from "@/Types/types";

const menuItems: menuItemsProps[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Features", href: "/features" },
  { title: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const [active, setActive] = useState<string>("home");

  return (
    <nav className="flex items-center justify-between p-4 bg-background shadow-md dark:bg-background-dark">
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
                    ? "bg-gradient-to-b from-teal-400 to-teal-500 dark:bg-gradient-to-b dark:from-teal-800 dark:to-teal-900"
                    : ""
                } px-3 py-2 rounded-lg hover:text-teal-500 transition-all duration-200 dark:hover:text-teal-400`}
              >
                {item.title}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" aria-label="Toggle menu">
            <Menu className="h-6 w-6 text-teal-500 dark:text-teal-400" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-background dark:bg-background-dark p-4"
        >
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-lg font-medium hover:text-teal-500 dark:hover:text-teal-400"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <Button className="hidden md:inline-flex font-semibold">
        Get Started
      </Button>
    </nav>
  );
}
