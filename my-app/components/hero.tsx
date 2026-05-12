"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Calendar, ChevronRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] max-h-[1200px] overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop')`,
          }}
        />
        {/* Gradient Overlay — bottom heavy for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44]/90 via-[#1E2A44]/40 to-[#1E2A44]/20" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.3)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 lg:pb-32"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
          {/* Location Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6 md:mb-8"
          >
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E]/80 font-sans">
              <span className="w-8 h-px bg-[#C9A96E]/60" />
              Mayfair, London
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[110px] text-white leading-[0.95] tracking-[-0.02em] max-w-5xl"
          >
            Refined aesthetic
            <br />
            <span className="italic text-[#C9A96E]/90">treatments</span>
            <br />
            for natural results
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 md:mt-8 text-base md:text-lg text-white/60 font-sans font-light max-w-xl leading-relaxed"
          >
            Private consultations in the heart of London. Expert care,
            understated elegance, results that speak softly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/consultation"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A96E] text-[#1E2A44] text-[13px] uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300 hover:bg-[#B8985E] hover:shadow-[0_0_30px_rgba(201,169,110,0.2)]"
            >
              <Calendar size={16} strokeWidth={1.5} />
              Book Consultation
            </Link>

            <Link
              href="/treatments"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white/80 text-[13px] uppercase tracking-[0.15em] font-sans transition-all duration-300 hover:border-white/40 hover:text-white"
            >
              View Treatments
              <ChevronRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator — subtle, bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-12 lg:right-20 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-sans rotate-90 origin-center translate-x-4">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} strokeWidth={1} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
