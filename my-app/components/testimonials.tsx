"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Isabelle T.",
    location: "Chelsea, London",
    treatment: "Botox & Facial Contouring",
    avatar: "IT",
    rating: 5,
    text: "I was apprehensive about aesthetic treatments for years. Aureline changed that entirely. My consultation felt like a genuine conversation, not a sales pitch. The results three months on are exactly what I hoped for — natural, refined, and completely me.",
  },
  {
    name: "Sophia M.",
    location: "Notting Hill, London",
    treatment: "Skin Rejuvenation",
    avatar: "SM",
    rating: 5,
    text: "Every detail here is considered. From the first message to walking out after treatment, the experience is calm, private, and genuinely premium. My skin has not looked this good in years — and no one can quite put their finger on why.",
  },
  {
    name: "Charlotte R.",
    location: "Kensington, London",
    treatment: "Lip Enhancement",
    avatar: "CR",
    rating: 5,
    text: "I have been to three other clinics before Aureline. None came close to this level of care. My practitioner understood immediately what I was trying to achieve — and delivered results that looked completely natural from day one.",
  },
  {
    name: "Amelia J.",
    location: "Mayfair, London",
    treatment: "PRP Therapy",
    avatar: "AJ",
    rating: 5,
    text: "The discreet environment alone sets Aureline apart. I have recommended them to four friends since my first appointment. That says everything.",
  },
  {
    name: "Victoria H.",
    location: "Belgravia, London",
    treatment: "Facial Contouring",
    avatar: "VH",
    rating: 5,
    text: "What I appreciated most was the honesty. I came in asking for one thing, and my practitioner explained why a slightly different approach would give me better results. She was right. I trust them completely.",
  },
  {
    name: "Eleanor P.",
    location: "Marylebone, London",
    treatment: "Skin Rejuvenation & Peels",
    avatar: "EP",
    rating: 5,
    text: "I travel for work constantly and barely have time for anything. Aureline made the entire process effortless — the booking, the consultation, the aftercare guidance. The results speak for themselves.",
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className="fill-[#B8714A] text-[#B8714A]"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  inView,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col bg-white border border-stone-100 p-8 hover:border-stone-200 hover:shadow-[0_4px_32px_rgba(0,0,0,0.04)] transition-all duration-500"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-6">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0"
          >
            <span
              className="text-[11px] tracking-widest text-stone-500 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {testimonial.avatar}
            </span>
          </div>
          <div>
            <p
              className="text-[13px] text-stone-700 font-light leading-snug"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {testimonial.name}
            </p>
            <p
              className="text-[11px] text-stone-300 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {testimonial.location}
            </p>
          </div>
        </div>

        {/* Google-style G mark */}
        <div className="flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Quote */}
      <p
        className="text-[13.5px] leading-[1.85] text-stone-500 font-light mt-4 flex-1"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {testimonial.text}
      </p>

      {/* Treatment tag */}
      <div className="mt-6 pt-5 border-t border-stone-50">
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-stone-300 font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {testimonial.treatment}
        </span>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [sectionRef, inView] = useInView(0.1);
  const [page, setPage] = useState(0);
  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / CARDS_PER_PAGE);
  const visible = TESTIMONIALS.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF8F5] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] tracking-[0.4em] uppercase text-stone-400 mb-4 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Client Experiences
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2rem,4vw,3.2rem)] font-light text-stone-800 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Trusted by those who
              <br />
              <em className="not-italic" style={{ color: "#B8714A" }}>
                expect the best.
              </em>
            </motion.h2>
          </div>

          {/* Aggregate rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-start md:items-end gap-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="text-3xl font-light text-stone-800"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                5.0
              </span>
              <div className="flex flex-col gap-1">
                <StarRating rating={5} />
                <span
                  className="text-[10px] tracking-[0.15em] uppercase text-stone-300 font-light"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Google Reviews
                </span>
              </div>
            </div>
            <span
              className="text-[11px] tracking-[0.15em] text-stone-300 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Based on 214 reviews
            </span>
          </motion.div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((t, i) => (
              <TestimonialCard
                key={t.name}
                testimonial={t}
                index={i}
                inView={true}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 flex items-center justify-center border border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`transition-all duration-300 rounded-full ${
                    page === i
                      ? "w-5 h-1.5 bg-stone-800"
                      : "w-1.5 h-1.5 bg-stone-200 hover:bg-stone-400"
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 flex items-center justify-center border border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next reviews"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
