"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const y = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">

      {/* Background Image with Parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=85&auto=format&fit=crop"
          alt="Aureline Clinic — Premium Aesthetic Treatments London"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/80 via-[#FAF8F5]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-20 md:pb-28">

        {/* Eyebrow */}
        <motion.p
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="text-[11px] tracking-[0.4em] uppercase text-stone-500 mb-6 font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Mayfair, London · Est. 2016
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            variants={FADE_UP}
            initial="hidden"
            animate="show"
            custom={0.35}
            className="text-[clamp(2.6rem,6vw,5.2rem)] font-light leading-[1.08] tracking-tight text-stone-800 max-w-2xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Refined aesthetics.
            <br />
            <em className="not-italic" style={{ color: "#B8714A" }}>
              Naturally you.
            </em>
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          custom={0.5}
          className="text-[15px] leading-relaxed text-stone-500 font-light max-w-md mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Expert-led treatments designed around your anatomy, your goals,
          and the results you actually want.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="show"
          custom={0.65}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <Link
            href="/consultation"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-stone-800 text-[#FAF8F5] text-[12px] tracking-[0.2em] uppercase font-light hover:bg-stone-700 transition-colors duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Book Consultation
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>

          <Link
            href="/treatments"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-stone-300 text-stone-700 text-[12px] tracking-[0.2em] uppercase font-light hover:border-stone-500 hover:text-stone-900 transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View Treatments
          </Link>
        </motion.div>
      </div>

      {/* Bottom detail line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-stone-200/80 origin-left"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-6 lg:right-12 flex flex-col items-center gap-2"
      >
        <span
          className="text-[9px] tracking-[0.35em] uppercase text-stone-400 rotate-90 origin-center"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-stone-400 to-transparent"
        />
      </motion.div>

    </section>
  );
}
