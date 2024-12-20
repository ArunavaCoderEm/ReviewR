"use client";

import { Button } from "@/components/ui/button";
import { MoveRightIcon } from "lucide-react";
import React from "react";

export default function Home(): React.ReactNode {
  return (
    <div className="flex flex-col container mx-auto px-6 pt-20 pb-24 items-center justify-center">
      <div className="py-7 mx-auto">
        <h1 className="text-5xl md:text-7xl leading-tight text-center px-6 font-semibold text-foreground">
          Collect and Showcase Your
        </h1>
        <h1 className="text-5xl md:text-7xl text-center px-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-b dark:from-teal-300 dark:to-teal-600 from-teal-600 to-teal-800">
          Customer Reviews
        </h1>
        <h2 className="text-center text-xl max-w-2xl mx-auto mt-5 md:mt-10 px-6 py-3">
          Easily gather, manage, and embed authentic customer reviews from your
          websites. Build trust and boost conversions with social proof that
          matters.
        </h2>
      </div>
      <div className="flex items-center gap-3 justify-center">
        <Button className="font-semibold px-4 py-6">
          Get Started
          <MoveRightIcon />
        </Button>
        <button className="bg-gradient-to-br hover:scale-95 transition-all duration-200 from-teal-400 px-4 py-3 font-semibold text-white to-teal-600 rounded-lg">
          View Demo
        </button>
      </div>
    </div>
  );
}
