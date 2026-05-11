"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const DIFFERENTIATORS = [
  {
    number: "01",
    title: "No cookie-cutter protocols",
    body: "Every face is different. Your treatment plan is designed around your anatomy, your goals, and what will actually look right on you — not a standard menu.",
  },
  {
    number: "02",
    title: "Practitioners, not salespeople",
    body: "We will tell you if a treatment isn't right for you. Our reputation is built on honest consultations and results that hold up over time.",
  },
  {
    number: "03",
    title: "Unhurried appointments",
    body: "We do not overbook. Every appointment is given the time it deserves — from the consultation through to aftercare.",
  },
  {
    number: "04",
    title: "Discretion as standard",
    body: "A private, calm environment. No waiting rooms full of strangers. Your visit — and your results — remain entirely your own.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export default function WhyAureline() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF8F5] py-24 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top row — label + headline + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end mb-20 lg:mb-28">

          {/* Left — headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] tracking-[0.4em] uppercase text-stone-400 mb-5 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Why Clients Choose Us
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-light text-stone-800 leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Care that feels
              <br />
              like it was made
              <br />
              <em className="not-italic" style={{ color: "#B8714A" }}>
                for you alone.
              </em>
            </motion.h2>
          </div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-72 lg:h-96 overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200&q=85&auto=format&fit=crop"
              alt="Aureline Clinic interior — private consultation room"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-[#B8714A]/6" />
          </motion.div>
        </div>

        {/* Differentiators grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-0">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.25 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group py-8 border-t border-stone-100 flex gap-8 items-start"
            >
              {/* Number */}
              <span
                className="text-[11px] tracking-[0.2em] text-stone-300 font-light pt-1 flex-shrink-0 group-hover:text-[#B8714A] transition-colors duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.number}
              </span>

              {/* Content */}
              <div>
                <h3
                  className="text-lg font-light text-stone-800 mb-3 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed text-stone-400 font-light"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 lg:mt-28 border-t border-stone-100 pt-12 max-w-2xl"
        >
          <p
            className="text-[clamp(1.2rem,2.5vw,1.7rem)] font-light text-stone-500 leading-relaxed italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "We measure success not by how many clients we see, but by how many
            return — and how many send their closest friends."
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="w-8 h-px bg-[#B8714A]" />
            <span
              className="text-[11px] tracking-[0.25em] uppercase text-stone-400 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Dr. Isabelle Moreau · Clinical Director
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
