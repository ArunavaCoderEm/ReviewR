"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function Home(): React.ReactNode {
  return (
    <div className="flex flex-col px-4 py-5 items-center justify-center">
     <h1 className="text-5xl md:text-7xl text-center px-6 py-7 font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground-muted to-background">Lorem, ipsum dolor sit</h1>
     <h2 className="text-center mt-5 md:mt-10 px-6 py-3">amet consectetur adipisicing elit. Officia culpa voluptate molestias natus vero nihil corporis hic impedit corrupti perferendis? Dolorem harum vero illum laborum iusto at modi deleniti eligendi</h2>
     <Button className="font-semibold w-full md:w-96 mt-10">Get Started</Button>
    </div>
  );
}
