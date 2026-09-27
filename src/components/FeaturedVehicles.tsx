"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Cog, Settings2, Zap } from "lucide-react";
import Navbar from "./Navbar";
import { FEATURED_VEHICLES } from "@/data/featured";

const CARD_SPACING = 300;
const MAX_VISIBLE_OFFSET = 3;

export default function FeaturedVehicles() {
  const [active, setActive] = useState(0);
  const count = FEATURED_VEHICLES.length;

  const getOffset = (i: number) => {
    let diff = i - active;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  };

  const goNext = () => setActive((a) => (a + 1) % count);
  const goPrev = () => setActive((a) => (a - 1 + count) % count);

  return (
    <section className="relative w-full overflow-hidden bg-black pt-32 pb-20 sm:pt-36">
      <Navbar />

      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center sm:px-10 lg:px-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-600">
              FEATURED VEHICLES
            </p>
            <h2 className="mt-2 text-4xl leading-tight font-bold text-white sm:text-5xl">
              HANDPICKED
              <br />
              FOR YOU
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-md border border-white/20 px-6 py-3 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-white/10"
            >
              VIEW ALL INVENTORY
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative h-[360px] w-full"
          style={{ perspective: "1600px" }}
        >
          {FEATURED_VEHICLES.map((v, i) => {
            const offset = getOffset(i);
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const hidden = abs > MAX_VISIBLE_OFFSET;

            const translateX = offset * CARD_SPACING;
            const rotateY = Math.max(-50, Math.min(50, offset * -32));
            const scale = isActive ? 1 : Math.max(0.72, 1 - abs * 0.14);
            const translateZ = isActive ? 0 : -abs * 120;
            const opacity = hidden ? 0 : 1 - abs * 0.22;

            return (
              <div
                key={v.name}
                data-card
                onClick={() => !isActive && setActive(i)}
                className={`absolute top-0 left-1/2 w-[300px] shrink-0 overflow-hidden rounded-xl border bg-white/[0.03] transition-all duration-700 ease-out ${
                  isActive
                    ? "border-white/20 shadow-2xl shadow-black/60"
                    : "cursor-pointer border-white/10"
                }`}
                style={{
                  transform: `translateX(-50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: 50 - abs,
                  opacity,
                  pointerEvents: hidden ? "none" : "auto",
                }}
              >
                <div className="group relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white">
                    {v.badge}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-white">
                    {v.name}
                  </h3>
                  <p className="mt-1 text-lg font-bold text-red-600">
                    {v.price}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Cog size={14} />
                      {v.engine}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap size={14} />
                      {v.power}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Settings2 size={14} />
                      {v.transmission}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2">
          {FEATURED_VEHICLES.map((v, i) => (
            <button
              key={v.name}
              type="button"
              aria-label={`Go to ${v.name}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
