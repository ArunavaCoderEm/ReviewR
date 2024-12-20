"use client";

import BackgroundDots from "@/components/component/Bg";
import Hero from "@/components/component/Hero";
import SkewedInfiniteScroll from "@/components/component/SkewedBg";
import React from "react";

export default function Home(): React.ReactNode {
  return (
    <div className="relative">
      <SkewedInfiniteScroll />
      <BackgroundDots />
      <Hero />
    </div>
  );
}
