"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Treatment {
  slug: string;
  title: string;
  description: string;
  priceFrom: number;
  image: string;
  size: "large" | "medium" | "standard";
}

const treatments: Treatment[] = [
  {
    slug: "botox",
    title: "Botox",
    description: "Smooth expression lines while preserving natural movement",
    priceFrom: 250,
    image: "/botox.jpg",
    size: "large",
  },
  {
    slug: "lip-fillers",
    title: "Lip Enhancement",
    description: "Subtle volume and definition for balanced proportions",
    priceFrom: 350,
    image: "/lip.jpg",
    size: "large",
  },
  {
    slug: "skin-rejuvenation",
    title: "Skin Rejuvenation",
    description: "Restore radiance and even tone with advanced techniques",
    priceFrom: 400,
    image: "/skin.jpg",
    size: "medium",
  },
  {
    slug: "prp-therapy",
    title: "PRP Therapy",
    description: "Harness your body's own regenerative potential",
    priceFrom: 450,
    image: "/prp.jpg",
    size: "medium",
  },
  {
    slug: "facial-contouring",
    title: "Facial Contouring",
    description: "Sculpted, balanced features with precision techniques",
    priceFrom: 600,
    image: "/contouring.jpg",
    size: "standard",
  },
  {
    slug: "chemical-peels",
    title: "Chemical Peels",
    description: "Reveal fresh, renewed skin with clinical-grade solutions",
    priceFrom: 200,
    image: "/peel.jpg",
    size: "standard",
  },
];

function TreatmentCard({
  treatment,
  index,
}: {
  treatment: Treatment;
  index: number;
}) {
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    standard: "md:col-span-1 md:row-span-1",
  };

  const imageHeight = {
    large: "h-64 md:h-80",
    medium: "h-64 md:h-72",
    standard: "h-48 md:h-56",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={sizeClasses[treatment.size]}
    >
      <Link
        href={`/treatments/${treatment.slug}`}
        className="group block h-full border border-stone-200/80 bg-white transition-all duration-500 hover:border-[#C9A96E]/60"
      >
        <div className={`relative ${imageHeight[treatment.size]} overflow-hidden`}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ backgroundImage: `url('${treatment.image}')` }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-5 md:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-xl md:text-2xl text-[#1E2A44]">
                {treatment.title}
              </h3>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="text-stone-400 transition-all duration-300 group-hover:text-[#C9A96E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="text-sm text-stone-500 font-sans font-light leading-relaxed">
              {treatment.description}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <span className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-sans">
              From £{treatment.priceFrom}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TreatmentsPage() {
  return (
    <main className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative bg-[#1E2A44] py-24 md:py-32">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#C9A96E_1px,_transparent_1px)] bg-[length:40px_40px]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E]/60 font-sans mb-4">
              <span className="w-8 h-px bg-[#C9A96E]/40" />
              Our Treatments
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
              Treatments tailored to{" "}
              <span className="italic text-[#C9A96E]/80">enhance</span> your
              natural features
            </h1>
            <p className="text-white/50 font-sans font-light text-lg max-w-xl leading-relaxed">
              Each treatment is personalized to your unique facial structure,
              skin type, and aesthetic goals. No one-size-fits-all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {treatments.map((treatment, index) => (
              <TreatmentCard
                key={treatment.slug}
                treatment={treatment}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
