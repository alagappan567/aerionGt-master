"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Share2, ThumbsUp, Camera } from "lucide-react";
import Navbar from "./Navbar";
import { CARS, wheelPercent } from "@/data/cars";

gsap.registerPlugin(ScrollTrigger);

export default function CarShowcase() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wheelSpinRefs = useRef<HTMLImageElement[]>([]);
  const animating = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -25,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goTo = (nextIndex: number, dir: 1 | -1) => {
    if (animating.current) return;
    animating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        animating.current = false;
      },
    });

    tl.to(imageRef.current, {
      xPercent: -dir * 30,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    })
      .to(
        wheelSpinRefs.current,
        {
          rotation: "+=160",
          duration: 0.4,
          ease: "power2.in",
        },
        "<"
      )
      .add(() => setIndex(nextIndex))
      .set(imageRef.current, { xPercent: dir * 30 })
      .set(titleRef.current, { yPercent: -140, opacity: 0 })
      .to(imageRef.current, {
        xPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        wheelSpinRefs.current,
        {
          rotation: "+=200",
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        titleRef.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "bounce.out",
        },
        "<"
      );
  };

  const handleNext = () => goTo((index + 1) % CARS.length, 1);
  const handlePrev = () => goTo((index - 1 + CARS.length) % CARS.length, -1);

  const car = CARS[index];
  const wheels = car.wheels.map((w) => wheelPercent(w.cx, w.cy, w.d));

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative flex h-screen w-full flex-col overflow-hidden bg-black"
    >
      <Navbar />

      <div ref={contentRef} className="relative flex h-full w-full flex-col">
      <div
        ref={titleRef}
        className="pointer-events-none absolute inset-x-0 top-24 flex flex-col items-center gap-2 select-none sm:top-28"
      >
        <span className="text-sm font-light tracking-[0.4em] text-white/40 sm:text-base">
          {car.model}
        </span>
        <span className="text-[18vw] leading-none font-extrabold tracking-tight text-white/[0.06] sm:text-[13vw]">
          {car.name.split(" ")[1]}
        </span>
      </div>

      <div className="absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 flex-col gap-6 sm:left-10 md:flex">
        <a
          href="#"
          aria-label="Share"
          className="text-white/70 transition-colors hover:text-white"
        >
          <Share2 size={18} />
        </a>
        <a
          href="#"
          aria-label="Like"
          className="text-white/70 transition-colors hover:text-white"
        >
          <ThumbsUp size={18} />
        </a>
        <a
          href="#"
          aria-label="Gallery"
          className="text-white/70 transition-colors hover:text-white"
        >
          <Camera size={18} />
        </a>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous car"
        className="absolute top-1/2 left-6 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:left-10"
      >
        <ArrowLeft size={18} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next car"
        className="absolute top-1/2 right-6 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-10"
      >
        <ArrowRight size={18} />
      </button>

      <div className="relative flex flex-1 items-center justify-center px-10">
        <div
          ref={imageRef}
          className="relative aspect-[79/53] w-full max-w-4xl"
        >
          <Image
            src={car.image}
            alt={`Aerion ${car.name}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
          />

          {wheels.map((wh, i) => (
            <div
              key={i}
              className="pointer-events-none absolute overflow-hidden rounded-full"
              style={{
                left: `${wh.cx}%`,
                top: `${wh.cy}%`,
                width: `${wh.w}%`,
                height: `${wh.h}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={(el) => {
                  if (el) wheelSpinRefs.current[i] = el;
                }}
                src={car.image}
                alt=""
                aria-hidden
                className="absolute max-w-none"
                style={{
                  left: `${wh.offsetX}%`,
                  top: `${wh.offsetY}%`,
                  width: `${wh.innerWidth}%`,
                  height: `${wh.innerHeight}%`,
                  transformOrigin: `${wh.cx}% ${wh.cy}%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between gap-6 px-6 pb-10 sm:flex-row sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          {CARS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              aria-label={`Go to ${c.name}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border bg-white/5 transition-colors sm:h-16 sm:w-24 ${
                i === index
                  ? "border-blue-500"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/cars/${car.slug}`}
            className="rounded-md border border-white/20 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Show Details
          </Link>
          <button
            type="button"
            className="rounded-md bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
          >
            Booking Now
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
