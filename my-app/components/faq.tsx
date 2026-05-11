"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Are consultations required before treatment?",
    a: "Yes — every treatment at Aureline begins with a private consultation. This allows your practitioner to understand your goals, assess your suitability, and design a treatment plan that delivers results without compromise. We do not treat on the same day as a first consultation.",
  },
  {
    q: "How long do results typically last?",
    a: "This varies by treatment and individual. Anti-wrinkle injections typically last 3–4 months, dermal fillers 9–18 months depending on the area treated, and skin rejuvenation treatments offer cumulative benefits with ongoing maintenance. Your practitioner will give you realistic timelines during your consultation.",
  },
  {
    q: "Is there any downtime after treatment?",
    a: "Most treatments at Aureline require minimal downtime. Injectable treatments may cause mild bruising or localised swelling for 24–72 hours. Deeper skin treatments may involve a few days of sensitivity. Your practitioner will provide a full aftercare guide specific to your treatment before you leave.",
  },
  {
    q: "How soon can I book a consultation?",
    a: "We typically have availability within 3–5 business days. For more urgent appointments, we recommend reaching out via WhatsApp directly — our team will do their best to accommodate you. We do not operate a walk-in service.",
  },
  {
    q: "Is every treatment plan fully personalised?",
    a: "Entirely. There are no standard protocols at Aureline. Every treatment plan is built around your facial anatomy, your aesthetic goals, and your lifestyle. If a treatment is not right for you, we will tell you — and suggest what is.",
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

function FAQItem({
  item,
  index,
  inView,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[0];
  index: number;
  inView: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-t border-stone-100 last:border-b last:border-stone-100"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
        aria-expanded={isOpen}
      >
        {/* Question */}
        <span
          className={`text-[15px] font-light leading-snug transition-colors duration-300 ${
            isOpen ? "text-stone-900" : "text-stone-600 group-hover:text-stone-800"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
        >
          {item.q}
        </span>

        {/* Icon */}
        <div
          className={`flex-shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300 mt-0.5 ${
            isOpen
              ? "border-[#B8714A] bg-[#B8714A]/8"
              : "border-stone-200 group-hover:border-stone-400"
          }`}
        >
          {isOpen ? (
            <Minus size={12} strokeWidth={1.5} className="text-[#B8714A]" />
          ) : (
            <Plus size={12} strokeWidth={1.5} className="text-stone-400 group-hover:text-stone-600" />
          )}
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-7 text-[13.5px] leading-[1.9] text-stone-400 font-light max-w-2xl"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [sectionRef, inView] = useInView(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      ref={sectionRef}
      className="bg-stone-50 border-t border-stone-100 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left — sticky label + headline */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-[11px] tracking-[0.4em] uppercase text-stone-400 mb-5 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Common Questions
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2rem,3.5vw,3rem)] font-light text-stone-800 leading-tight mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Everything
                <br />
                you need
                <br />
                <em className="not-italic" style={{ color: "#B8714A" }}>
                  to know.
                </em>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[13px] leading-relaxed text-stone-400 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Still have questions? Speak with our team directly — we are
                happy to answer anything before you commit to a consultation.
              </motion.p>

              {/* WhatsApp nudge */}
              <motion.a
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                href="https://wa.me/447700900000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-[11px] tracking-[0.2em] uppercase text-stone-400 hover:text-stone-700 transition-colors duration-300 font-light group"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-[#B8714A]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Ask via WhatsApp
              </motion.a>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
            {FAQS.map((item, i) => (
              <FAQItem
                key={item.q}
                item={item}
                index={i}
                inView={inView}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
