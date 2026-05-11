"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TREATMENTS = [
  {
    name: "Botox & Anti-Wrinkle",
    slug: "botox",
    tagline: "Softened expression lines with natural movement preserved.",
    from: "£195",
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1598524374912-e2a9e5e8c60a?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Lip Enhancement",
    slug: "lip-enhancement",
    tagline: "Refined volume and definition. Never overcorrected.",
    from: "£250",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Skin Rejuvenation",
    slug: "skin-rejuvenation",
    tagline: "Restored luminosity through targeted dermal therapies.",
    from: "£280",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "PRP Therapy",
    slug: "prp-therapy",
    tagline: "Your body's own regenerative power, amplified.",
    from: "£350",
    duration: "75 min",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Facial Contouring",
    slug: "facial-contouring",
    tagline: "Sculpted definition that honours your natural architecture.",
    from: "£320",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Chemical Peels",
    slug: "chemical-peels",
    tagline: "Surface renewal with clinical-grade precision.",
    from: "£175",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80&auto=format&fit=crop",
  },
];

function useInView(threshold = 0.1) {
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

function TreatmentCard({
  treatment,
  index,
  inView,
}: {
  treatment: (typeof TREATMENTS)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.7,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden bg-stone-50 border border-stone-100 hover:border-stone-200 transition-colors duration-500"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={treatment.image}
          alt={treatment.name}
          fill
          className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />

        {/* Duration pill */}
        <div className="absolute top-4 right-4">
          <span
            className="text-[10px] tracking-[0.2em] uppercase bg-[#FAF8F5]/90 backdrop-blur-sm text-stone-500 px-3 py-1.5 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {treatment.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name */}
        <h3
          className="text-xl font-light text-stone-800 mb-2 leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {treatment.name}
        </h3>

        {/* Tagline */}
        <p
          className="text-[13px] leading-relaxed text-stone-400 font-light mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {treatment.tagline}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex flex-col">
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-stone-300 font-light mb-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              From
            </span>
            <span
              className="text-lg font-light text-stone-700"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {treatment.from}
            </span>
          </div>

          {/* CTA */}
          <Link
            href={`/treatments/${treatment.slug}`}
            className="group/link inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-800 transition-colors duration-300 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Learn More
            <ArrowRight
              size={12}
              strokeWidth={1.5}
              className="group-hover/link:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>

      {/* Bottom accent line — reveals on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B8714A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

export default function TreatmentsGrid() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF8F5] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] tracking-[0.4em] uppercase text-stone-400 mb-4 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Our Treatments
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2rem,4vw,3.2rem)] font-light text-stone-800 leading-tight max-w-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Expertly tailored.
              <br />
              <em className="not-italic" style={{ color: "#B8714A" }}>
                Always personal.
              </em>
            </motion.h2>
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/treatments"
              className="group inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-stone-400 hover:text-stone-700 transition-colors duration-300 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View All Treatments
              <ArrowRight
                size={12}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((treatment, i) => (
            <TreatmentCard
              key={treatment.slug}
              treatment={treatment}
              index={i}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
