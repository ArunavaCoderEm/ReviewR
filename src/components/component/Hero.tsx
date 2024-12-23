"use client";

import React from "react";
import { Button } from "../ui/button";
import { Earth, MoveRightIcon } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; 

export default function Hero(): React.ReactNode {
  const router = useRouter();

  return (
    <div className="flex z-10 flex-col container mx-auto px-6 pt-20 pb-24 items-center justify-center">
      <div className="py-7 mx-auto">
        <h1 className="text-5xl md:text-7xl leading-tight text-center px-6 font-semibold text-foreground">
          Collect And Showcase Your
        </h1>
        <h1 className="text-5xl md:text-7xl text-center px-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-b dark:from-teal-300 dark:to-teal-600 from-teal-500 to-teal-700">
          Customer Reviews
        </h1>
        <h1 className="text-3xl md:text-5xl text-center px-6 font-semibold mt-2">
          Effortlessly.
        </h1>
        <h2 className="text-center text-xl max-w-2xl mx-auto mt-5 md:mt-10 px-6 py-3">
          Easily gather, manage, and embed authentic customer reviews from your
          websites. Build trust and boost conversions with social proof that
          matters.
        </h2>
      </div>
      <div className="flex items-center gap-3 justify-center">
        <SignedIn>
          <Button
            onClick={() => router.push("/dashboard")}
            className="font-semibold px-4 py-6"
          >
            Dashboard
            <MoveRightIcon />
          </Button>
        </SignedIn>
        <SignedOut>
          <Button
            onClick={() => router.push("/sign-in")}
            className="font-semibold px-4 py-6"
          >
            Get Started
            <MoveRightIcon />
          </Button>
        </SignedOut>
        <button
          className="bg-gradient-to-br hover:scale-95 transition-all duration-200 from-teal-400 px-4 py-3 font-semibold flex items-center gap-2 text-white to-teal-600 rounded-lg"
          onClick={() => router.push("https://replit.com/@acecankill/TestTemplateReviewR")}
        >
          View Demo
          <Earth className="w-4" />
        </button>
      </div>
    </div>
  );
}
