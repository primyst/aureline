"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  treatment: string;
  rating: number;
  quote: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah",
    treatment: "Botox",
    rating: 5,
    quote:
      "I was nervous about looking 'done.' The results are so natural, even my husband didn't notice — he just said I looked well-rested. Exactly what I wanted.",
    initials: "S",
  },
  {
    name: "Emily",
    treatment: "Lip Enhancement",
    rating: 5,
    quote:
      "I've had fillers before elsewhere and they were too much. Here, the approach is completely different — subtle, balanced, perfectly proportioned to my face.",
    initials: "E",
  },
  {
    name: "Catherine",
    treatment: "Skin Rejuvenation",
    rating: 5,
    quote:
      "After three sessions, my skin has never looked better. The texture, the glow — it's not just visible, it's how I feel when I look in the mirror now.",
    initials: "C",
  },
  {
    name: "Amelia",
    treatment: "PRP Therapy",
    rating: 5,
    quote:
      "The consultation alone was worth it. They actually listened to my concerns instead of pushing treatments. The results speak for themselves.",
    initials: "A",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex-shrink-0 w-[320px] md:w-[380px] bg-white border border-stone-200/80 p-8 md:p-10 transition-all duration-500 hover:border-[#C9A96E]/40 hover:shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
    >
      {/* Quote Icon */}
      <Quote
        size={24}
        strokeWidth={1}
        className="text-[#C9A96E]/30 mb-6"
      />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={0}
            className="fill-[#C9A96E] text-[#C9A96E]"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="font-serif text-lg md:text-xl text-[#1E2A44] leading-[1.6] mb-8 italic">
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
        <div className="w-10 h-10 rounded-full bg-[#1E2A44] flex items-center justify-center">
          <span className="text-white text-sm font-sans font-medium">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p className="text-sm font-sans font-medium text-[#1E2A44]">
            {testimonial.name}
          </p>
          <p className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-sans">
            {testimonial.treatment}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { once: true, margin: "-50px" });

  return (
    <section id="testimonials" className="bg-[#FAF8F5] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-sans mb-4">
            <span className="w-8 h-px bg-[#C9A96E]" />
            Client Stories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1E2A44] leading-[1.1] max-w-2xl">
            Words from those who've{" "}
            <span className="italic text-[#C9A96E]/80">experienced</span> us
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 md:gap-6 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.name} className="snap-start">
            <TestimonialCard testimonial={testimonial} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
