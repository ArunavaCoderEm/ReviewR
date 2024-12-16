"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Features", href: "/features" },
  { title: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <Link href="/" className="text-2xl font-bold">
        <Image
          src="/Images/revireRlogo.jpeg"
          width={500}
          height={500}
          alt="LogoPic"
        />
      </Link>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {menuItems.map((item, index) => (
            <Link href={item.href} className="" key={index}>
              <NavigationMenuItem key={item.title}>
                {item.title}
              </NavigationMenuItem>
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <Button className="hidden md:inline-flex">Sign Up</Button>
    </nav>
  );
}
