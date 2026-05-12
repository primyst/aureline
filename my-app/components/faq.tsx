"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long do results last?",
    answer:
      "Results vary by treatment. Botox typically lasts 3–4 months, while dermal fillers can last 6–18 months depending on the product and area treated. During your consultation, we'll provide a personalized timeline based on your treatment plan.",
  },
  {
    question: "Is there downtime?",
    answer:
      "Most of our treatments require minimal to no downtime. Botox and fillers allow you to return to normal activities immediately, though we recommend avoiding strenuous exercise for 24 hours. Any redness or swelling typically subsides within a few hours.",
  },
  {
    question: "Are consultations required?",
    answer:
      "Yes — every treatment begins with a private consultation. This allows us to assess your goals, discuss your medical history, and design a personalized plan. There is no obligation to proceed after the consultation.",
  },
  {
    question: "How soon can I book?",
    answer:
      "We typically have availability within 1–2 weeks. For urgent appointments, please contact us via WhatsApp and we'll do our best to accommodate you.",
  },
  {
    question: "Is treatment personalized?",
    answer:
      "Absolutely. No two faces are the same, and neither are our treatments. We assess your unique facial structure, skin type, and aesthetic goals to create a plan that's exclusively yours — never a one-size-fits-all approach.",
  },
];

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="border-b border-stone-200/80"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex items-start justify-between gap-6 text-left group"
        aria-expanded={isOpen}
      >
        <h3 className="font-serif text-xl md:text-2xl text-[#1E2A44] leading-[1.3] group-hover:text-[#C9A96E] transition-colors duration-300">
          {item.question}
        </h3>
        <span className="flex-shrink-0 mt-1 text-stone-400 transition-colors duration-300 group-hover:text-[#C9A96E]">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="minus"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Minus size={20} strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={20} strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-6 md:pb-8 text-stone-500 font-sans font-light leading-[1.8] max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-[#FAF8F5] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column — Header */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:sticky lg:top-32"
            >
              <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-sans mb-4">
                <span className="w-8 h-px bg-[#C9A96E]" />
                FAQ
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1E2A44] leading-[1.1] mb-4">
                Questions we hear{" "}
                <span className="italic text-[#C9A96E]/80">often</span>
              </h2>
              <p className="text-stone-500 font-sans font-light leading-relaxed">
                Everything you need to know before your first visit. If you
                don't see your question here, reach out — we're happy to help.
              </p>
            </motion.div>
          </div>

          {/* Right Column — Accordion */}
          <div className="lg:col-span-8">
            {faqs.map((faq, index) => (
              <FAQAccordion key={faq.question} item={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
