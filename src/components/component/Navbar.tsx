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
                    ? "bg-gradient-to-b text-white from-teal-600 to-teal-700 dark:bg-gradient-to-b dark:from-teal-800 dark:to-teal-900"
                    : "hover:text-teal-500 dark:hover:text-teal-400"
                } px-3 py-2 rounded-lg font-[500] transition-all duration-200`}
              >
                {item.title}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Collapsible className="md:hidden" open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle menu"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6 text-teal-500 dark:text-teal-400" />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="bg-background dark:bg-background-dark p-4 w-full">
          <nav className="flex flex-col gap-4 items-center">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link
                  onClick={() => {
                    setActive(item.title);
                    setIsOpen(false);
                  }}
                  href={item.href}
                  className={`block text-sm text-center w-full ${
                    active === item.title
                      ? "bg-gradient-to-b text-white from-teal-600 to-teal-700 dark:bg-gradient-to-b dark:from-teal-800 dark:to-teal-900"
                      : "hover:text-teal-500 dark:hover:text-teal-400"
                  } px-3 py-2 rounded-lg font-[500] transition-all duration-200`}
                >
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ))}
          </nav>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex gap-2 items-center">
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
        <Button className="hidden md:inline-flex font-semibold">
          Get Started
        </Button>
      </div>
    </nav>
  );
}
