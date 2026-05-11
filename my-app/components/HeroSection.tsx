"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const BRAND = {
  accent: "#0F4C5C",
};

function CinematicBackground({
  src,
  alt = "background",
}: {
  src: string;
  alt?: string;
}) {
  const grainStyle = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="120" height="120" filter="url(#n)" opacity="0.35"/>
      </svg>
    `;

    return {
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#F6F4F1]/95 via-[#F6F4F1]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F6F4F1]" />
      <div className="absolute inset-0 bg-black/10" />

      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={grainStyle}
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F6F4F1]">
      <CinematicBackground src="/clinic-hero.jpg" />

      <div className="relative w-full max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-black/60">
            Aureline Clinic
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-light leading-tight text-[#1C1C1E]">
            Refined aesthetic medicine
            <span className="block font-normal">
              for naturally elevated results
            </span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-black/60">
            Medical-led treatments designed to enhance your natural features
            with precision, restraint, and clinical expertise in Central London.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/consultation"
              className="px-5 py-2.5 rounded-full text-white text-sm transition hover:opacity-90"
              style={{ backgroundColor: BRAND.accent }}
            >
              Book Consultation
            </Link>

            <Link
              href="/treatments"
              className="text-sm text-black/60 hover:text-black transition"
            >
              View Treatments
            </Link>
          </div>

          <div className="mt-6 text-xs text-black/50 space-x-2">
            <span>GMC-registered practitioners</span>
            <span>•</span>
            <span>Central London</span>
            <span>•</span>
            <span>2,000+ clients</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}