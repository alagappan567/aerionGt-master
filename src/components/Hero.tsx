"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import HeroContent from "./HeroContent";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(layerRef.current, {
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

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div ref={layerRef} className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-contain"
          src="/Video/aerion-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        />

        <div className="relative z-10 h-full">
          <HeroContent />
        </div>
      </div>

      <Navbar />
    </section>
  );
}
