"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const results = [
  {
    number: "01",
    slug: "skin-rejuvenation",
    treatment: "Skin Rejuvenation",
    category: "Skin",
    caption: "A brighter complexion. A more rested appearance.",
    before: "/face-before.png",
    after: "/face-after.png",
  },
  {
    number: "02",
    slug: "lip-enhancement",
    treatment: "Lip Enhancement",
    category: "Injectables",
    caption: "Natural volume. Balanced proportions.",
    before: "/lip-before.jpg",
    after: "/lip-after.jpg",
  },
];

function Result({
  result,
  index,
}: {
  result: (typeof results)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group"
    >
      <div className="grid border-t border-stone-200 lg:grid-cols-[1fr_0.72fr]">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 lg:aspect-[1.18/1]">
          <img
            src={result.after}
            alt={`${result.treatment} result`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute left-5 top-5 flex items-center gap-2 bg-[#1E2A44]/85 px-3 py-2 backdrop-blur-sm">
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
              Result
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-white p-7 sm:p-10 lg:p-12">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400">
                {result.number} / {result.category}
              </span>
              <ArrowUpRight
                size={17}
                strokeWidth={1.3}
                className="text-stone-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C9A96E]"
              />
            </div>

            <h2 className="mt-10 font-serif text-4xl font-light leading-[1] tracking-[-0.02em] text-[#1E2A44] sm:text-5xl">
              {result.treatment}
            </h2>
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-relaxed text-stone-500">
              {result.caption}
            </p>
          </div>

          <div className="mt-12 border-t border-stone-100 pt-6">
            <Link
              href={`/treatments/${result.slug}`}
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-stone-700 transition-colors hover:text-[#C9A96E]"
            >
              Explore treatment
              <ArrowRight size={14} strokeWidth={1.4} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-stone-200 lg:hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={result.before}
            alt="Before treatment"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-3 left-3 bg-[#1E2A44]/85 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-white">
            Before
          </span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={result.after}
            alt="After treatment"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-3 left-3 bg-[#C9A96E]/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-[#1E2A44]">
            After
          </span>
        </div>
      </div>

      <div className="hidden gap-3 border-b border-stone-200 py-5 lg:flex">
        <div className="relative aspect-[4/3] w-28 overflow-hidden bg-stone-100">
          <img src={result.before} alt="Before treatment" className="h-full w-full object-cover" />
          <span className="absolute bottom-2 left-2 bg-[#1E2A44]/85 px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-white">Before</span>
        </div>
        <div className="relative aspect-[4/3] w-28 overflow-hidden bg-stone-100">
          <img src={result.after} alt="After treatment" className="h-full w-full object-cover" />
          <span className="absolute bottom-2 left-2 bg-[#C9A96E]/90 px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-[#1E2A44]">After</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ResultsPage() {
  return (
    <main className="bg-[#FAF8F5] text-stone-800">
      <section className="relative overflow-hidden bg-[#1E2A44] px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(circle_at_center,_#C9A96E_1px,_transparent_1px)] bg-[length:40px_40px]" />
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#C9A96E]">
              <span className="h-px w-8 bg-[#C9A96E]" />
              Results
            </span>
            <h1 className="font-serif text-5xl font-light leading-[0.95] tracking-[-0.025em] text-white sm:text-6xl lg:text-8xl">
              Enhancements that still feel like
              <span className="italic text-[#C9A96E]"> you.</span>
            </h1>
            <p className="mt-8 max-w-xl text-sm font-light leading-7 text-white/50 sm:text-base">
              Our approach is intentionally considered: refined changes, balanced proportions, and results designed around the individual rather than a template.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 flex flex-col gap-5 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400">Selected results</p>
              <h2 className="mt-3 font-serif text-3xl font-light text-[#1E2A44] sm:text-4xl">
                Subtle changes. Visible difference.
              </h2>
            </div>
            <p className="max-w-xs text-xs font-light leading-6 text-stone-400">
              Explore a selection of treatment outcomes and the considered approach behind each one.
            </p>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {results.map((result, index) => (
              <Result key={result.treatment} result={result} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">A considered approach</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight tracking-[-0.02em] text-[#1E2A44] sm:text-5xl">
            The goal is not to look different.
            <br />
            <span className="italic text-stone-400">It is to feel more like yourself.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-sm font-light leading-7 text-stone-500">
            Every treatment begins with a consultation. We take the time to understand your goals before recommending an approach.
          </p>
          <Link
            href="/consultation"
            className="mt-9 inline-flex items-center gap-3 bg-[#1E2A44] px-8 py-4 text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#273653]"
          >
            Book a Consultation
            <ArrowRight size={14} strokeWidth={1.4} />
          </Link>
        </div>
      </section>

      <section className="bg-[#FAF8F5] px-6 py-8 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1200px] border-t border-stone-200 pt-6">
          <p className="text-[10px] font-light leading-5 text-stone-400">
            Results shown are for demonstration purposes only. Individual results vary and depend on treatment, skin, anatomy, and personal circumstances. A consultation is required before treatment.
          </p>
        </div>
      </section>
    </main>
  );
}
