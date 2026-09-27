"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Fuel,
  Gauge,
  Settings2,
  Zap,
} from "lucide-react";
import Navbar from "./Navbar";
import type { Car } from "@/data/cars";

const SPEC_ICONS = [Settings2, Zap, Gauge, Fuel];

function TiltCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`will-change-transform transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export default function CarDetail({
  car,
  embedded = false,
}: {
  car: Car;
  embedded?: boolean;
}) {
  const colors = car.colors ?? [];
  const [colorIndex, setColorIndex] = useState(0);
  const [activeShot, setActiveShot] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const activeColor = colors[colorIndex];
  const shots = Array.from(
    new Set([...(car.gallery ?? []), car.image]),
  );
  const mainImage = shots[activeShot] ?? car.image;

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsCompact(!entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative w-full bg-black">
      {!embedded && <Navbar showBooking className="fixed" />}

      {/* Compact sticky bar — slides in once the hero has scrolled past */}
      {!embedded && (
        <div
          className={`fixed top-0 left-0 z-30 w-full border-b border-white/10 bg-black/90 backdrop-blur transition-all duration-300 ${
            isCompact
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3 sm:px-10 lg:px-16">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-16 overflow-hidden rounded">
                <Image
                  src={mainImage}
                  alt={car.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{car.name}</p>
                <p className="text-xs text-white/50">{car.price}</p>
              </div>
            </div>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-light text-white transition-colors hover:bg-white/10 sm:flex"
            >
              <CalendarDays size={14} strokeWidth={1.5} />
              Book a Test Drive
            </button>
          </div>
        </div>
      )}

      <div ref={heroRef}>
        <section
          className={`relative w-full overflow-hidden pb-10 ${
            embedded ? "pt-0" : "pt-28 sm:pt-32"
          }`}
        >
          <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
            <div className="mb-8 flex items-center gap-2 text-xs font-light text-white/40 sm:text-sm">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight size={14} />
              <Link
                href="/#showcase"
                className="text-red-500 transition-colors hover:text-red-400"
              >
                Showcase
              </Link>
              <ChevronRight size={14} />
              <span className="text-white/70">
                2024 {car.model} {car.name.split(" ")[1] ?? car.name}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              {/* Left: gallery */}
              <div className="relative">
                <div className="perspective-1000 relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/[0.03]">
                  <Image
                    key={mainImage}
                    src={mainImage}
                    alt={`Aerion ${car.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="animate-spin-in-3d object-contain"
                  />

                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() =>
                      setActiveShot((i) => (i - 1 + shots.length) % shots.length)
                    }
                    className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/20"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => setActiveShot((i) => (i + 1) % shots.length)}
                    className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/20"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="perspective-1000 mt-4 flex gap-3">
                  {shots.slice(0, 5).map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setActiveShot(i)}
                      className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 will-change-transform hover:-translate-y-1 hover:[transform:rotateX(8deg)_rotateY(-10deg)] sm:h-20 sm:w-28 ${
                        activeShot === i
                          ? "border-red-500"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: info panel */}
              <div className="flex flex-col justify-center">
                <span className="text-xs font-medium tracking-[0.2em] text-red-500">
                  2024 {car.model} {car.name.split(" ")[1] ?? car.name}
                </span>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {activeColor?.name ?? car.name}
                </h1>

                {car.status && (
                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-medium tracking-wide text-red-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    {car.status}
                  </span>
                )}

                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
                  {car.tagline}
                </p>

                {car.price && (
                  <p className="mt-6 text-3xl font-bold text-red-500">
                    {car.price}
                    <span className="ml-2 text-sm font-normal text-white/40">
                      USD
                    </span>
                  </p>
                )}

                {car.quickSpecs && (
                  <div className="mt-8 grid grid-cols-2 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4">
                    {car.quickSpecs.map((spec, i) => {
                      const Icon = SPEC_ICONS[i];
                      return (
                        <div key={spec.value} className="flex items-center gap-2">
                          <Icon size={18} strokeWidth={1.5} className="text-white/50" />
                          <div>
                            <p className="text-sm font-medium text-white">
                              {spec.label}
                            </p>
                            <p className="text-[10px] tracking-wide text-white/40">
                              {spec.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-8 py-3 text-sm font-light text-white transition-colors hover:bg-white/10"
                  >
                    Book Now
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-red-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Detail grid */}
      <section className="relative z-10 mx-auto max-w-[1600px] px-6 pb-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-white">
                PERFORMANCE
              </h2>
              <button className="text-xs text-white/40 hover:text-white">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {(car.perfBars ?? []).map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs text-white/60">
                    <span>{bar.label}</span>
                    <span className="text-white">{bar.max}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-red-600"
                      style={{ width: `${bar.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>

          <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-white">
                EXTERIOR COLORS
              </h2>
              <button className="text-xs text-white/40 hover:text-white">
                View All
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  onClick={() => {
                    setColorIndex(i);
                    const matchIndex = shots.indexOf(c.image);
                    setActiveShot(matchIndex === -1 ? 0 : matchIndex);
                  }}
                  className={`h-9 w-9 rounded-full ring-2 transition-all ${
                    colorIndex === i
                      ? "ring-red-500"
                      : "ring-transparent hover:ring-white/30"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            <p className="mt-5 text-sm text-white/70">{activeColor?.name}</p>
          </TiltCard>

          <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-white">
                INTERIOR
              </h2>
              <button className="text-xs text-white/40 hover:text-white">
                View All
              </button>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/[0.03]">
              {car.interiorImage && (
                <Image
                  src={car.interiorImage}
                  alt="Interior"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              )}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/50">
              {car.interiorLabel}
            </p>
          </TiltCard>

          <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-white">
                GALLERY
              </h2>
              <button className="text-xs text-white/40 hover:text-white">
                View All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(car.gallery ?? []).slice(0, 4).map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => {
                    const matchIndex = shots.indexOf(src);
                    setActiveShot(matchIndex === -1 ? 0 : matchIndex);
                  }}
                  className="relative aspect-square overflow-hidden rounded-lg bg-white/[0.03]"
                >
                  <Image src={src} alt="" fill sizes="150px" className="object-cover" />
                </button>
              ))}
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Feature strip */}
      {car.features && (
        <section className="relative z-10 mx-auto max-w-[1600px] px-6 pb-20 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-6 sm:grid-cols-3 md:grid-cols-6">
            {car.features.map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <p className="text-sm font-medium text-white">{f.label}</p>
                <p className="text-xs text-white/40">{f.sub}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Original write-ups, preserved */}
      <section className="relative z-10 mx-auto max-w-[1600px] px-6 pb-24 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-12 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] text-white">
              PERFORMANCE
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {car.performance}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] text-white">
              CONSTRUCTION
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {car.construction}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] text-white">
              RENTS COSTS
            </h2>
            <ul className="mt-4 space-y-2">
              {car.rentCosts.map((rc) => (
                <li
                  key={rc.label}
                  className="flex items-center justify-between gap-6 text-sm text-white/60"
                >
                  <span>{rc.label}</span>
                  <span className="text-white">{rc.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
