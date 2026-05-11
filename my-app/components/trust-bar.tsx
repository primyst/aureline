"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "2,400+", label: "Clients Treated" },
  { value: "8", label: "Years of Excellence" },
  { value: "97%", label: "Satisfaction Rate" },
  { value: "12", label: "Expert Practitioners" },
];

const PUBLICATIONS = [
  "Vogue",
  "Harper's Bazaar",
  "The Times",
  "Evening Standard",
  "Tatler",
];

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] as const,  // ← add `as const`
      delay 
    },
  }),
};

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

// Animated counter
function Counter({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const hasSymbol = /[^0-9]/.test(value);
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const step = 16;
    const steps = duration / step;
    const increment = numeric / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numeric) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(`${Math.floor(current)}${suffix}`);
      }
    }, step);

    return () => clearInterval(timer);
  }, [numeric, suffix, value]);

  return <span>{display}</span>;
}

export default function TrustBar() {
  const [sectionRef, inView] = useInView(0.2);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF8F5] border-b border-stone-100"
    >
      {/* Stats Row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={FADE_UP}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              custom={i * 0.1}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Value */}
              <span
                className="text-[clamp(2rem,4vw,3rem)] font-light text-stone-800 leading-none tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {inView ? <Counter value={stat.value} /> : "0"}
              </span>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}

                className="w-8 h-px bg-[#B8714A] my-3 origin-left"
              />

              {/* Label */}
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-stone-400 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Publications Row */}
      <div className="border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">

            {/* Label */}
            <motion.span
              variants={FADE_UP}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              custom={0.4}
              className="text-[10px] tracking-[0.35em] uppercase text-stone-300 font-light whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              As seen in
            </motion.span>

            {/* Divider */}
            <div className="hidden sm:block w-px h-4 bg-stone-200 flex-shrink-0" />

            {/* Publication Names */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-8 gap-y-3">
              {PUBLICATIONS.map((pub, i) => (
                <motion.span
                  key={pub}
                  variants={FADE_UP}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  custom={0.45 + i * 0.08}
                  className="text-[13px] tracking-[0.15em] text-stone-300 hover:text-stone-500 transition-colors duration-300 cursor-default font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {pub}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
