"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface SlideImage {
  before: string;
  after: string;
  caption: string;
  treatment: string;
}

const slides: SlideImage[] = [
  {
    before:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
    caption: "Subtle enhancement. Visible confidence.",
    treatment: "Skin Rejuvenation",
  },
  {
    before:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    caption: "Natural volume. Balanced proportions.",
    treatment: "Lip Enhancement",
  },
];

function BeforeAfterSlide({ slide, index }: { slide: SlideImage; index: number }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percent);
    },
    []
  );

  const handleMouseDown = useCallback(() => setIsDragging(true), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[600px] overflow-hidden cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Image (Full width, background) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${slide.after}')` }}
      />

      {/* Before Image (Clipped by slider position) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${slide.before}')`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      />

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 bg-[#1E2A44]/60" />
            <div className="w-0.5 h-3 bg-[#1E2A44]/60" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <span className="px-3 py-1.5 bg-[#1E2A44]/80 text-white text-[10px] uppercase tracking-[0.2em] font-sans backdrop-blur-sm">
          Before
        </span>
      </div>
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <span className="px-3 py-1.5 bg-[#C9A96E]/90 text-[#1E2A44] text-[10px] uppercase tracking-[0.2em] font-sans font-medium backdrop-blur-sm">
          After
        </span>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#1E2A44]/80 to-transparent">
        <p className="font-serif text-xl md:text-2xl text-white italic">
          {slide.caption}
        </p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-sans mt-2">
          {slide.treatment}
        </p>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterSlider() {
  return (
    <section id="before-after" className="bg-[#1E2A44] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-20 text-center"
        >
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-sans mb-4">
            <span className="w-8 h-px bg-[#C9A96E]" />
            Real Results
            <span className="w-8 h-px bg-[#C9A96E]" />
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
            Transformations that speak{" "}
            <span className="italic text-[#C9A96E]/80">softly</span>
          </h2>
          <p className="mt-4 text-white/50 font-sans font-light max-w-xl mx-auto">
            Drag to reveal. Every result is tailored to the individual —
            preserving character while enhancing confidence.
          </p>
        </motion.div>

        {/* Slides */}
        <div className="space-y-8 md:space-y-12">
          {slides.map((slide, index) => (
            <BeforeAfterSlide key={slide.treatment} slide={slide} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
