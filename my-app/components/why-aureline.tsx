"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, MessageCircle, Microscope } from "lucide-react";

interface Reason {
  number: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const reasons: Reason[] = [
  {
    number: "01",
    title: "Natural Results",
    description:
      "We enhance what you have. We don't change who you are. Every treatment is calibrated to preserve your expressions, your character, your identity. The best outcome is when no one can tell you've had work done — they just notice you look refreshed.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    icon: <Sparkles size={20} strokeWidth={1.5} />,
  },
  {
    number: "02",
    title: "Expert Care",
    description:
      "Led by practitioners with 15+ years in aesthetic medicine. Our team combines clinical precision with an artistic eye — because the face is not just anatomy, it's identity. Every injection is deliberate, every placement is considered.",
    image:
      "nurses.jpg",
    icon: <Shield size={20} strokeWidth={1.5} />,
  },
  {
    number: "03",
    title: "Private Consultation",
    description:
      "Every treatment begins with a conversation. We listen to your goals, assess your features, and design a plan that's uniquely yours. No rush, no pressure — just a calm, confidential space to explore what's possible.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop",
    icon: <MessageCircle size={20} strokeWidth={1.5} />,
  },
  {
    number: "04",
    title: "Modern Techniques",
    description:
      "We invest in the latest non-surgical innovations — from micro-dosing Botox for subtle movement preservation to advanced filler layering for natural volume. Technology serves artistry, never the other way around.",
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1000&auto=format&fit=crop",
    icon: <Microscope size={20} strokeWidth={1.5} />,
  },
];

function ReasonBlock({
  reason,
  index,
}: {
  reason: Reason;
  index: number;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Text */}
      <div className={isReversed ? "lg:order-2" : ""}>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[#C9A96E]/30 font-serif text-6xl md:text-7xl leading-none">
            {reason.number}
          </span>
          <div className="w-12 h-px bg-[#C9A96E]/30" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#C9A96E]">{reason.icon}</span>
          <h3 className="font-serif text-3xl md:text-4xl text-[#1E2A44]">
            {reason.title}
          </h3>
        </div>
        <p className="text-stone-500 font-sans font-light leading-[1.8] text-base md:text-lg max-w-lg">
          {reason.description}
        </p>
      </div>

      {/* Image */}
      <div className={isReversed ? "lg:order-1" : ""}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.02]"
            style={{ backgroundImage: `url('${reason.image}')` }}
          />
          <div className="absolute inset-0 bg-[#1E2A44]/5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyAureline() {
  return (
    <section id="why-choose" className="bg-[#FAF8F5] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20 md:mb-28"
        >
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-sans mb-4">
            <span className="w-8 h-px bg-[#C9A96E]" />
            Why Aureline
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1E2A44] leading-[1.1] max-w-2xl">
            Four reasons clients choose{" "}
            <span className="italic text-[#C9A96E]/80">us</span>
          </h2>
        </motion.div>

        {/* Reasons */}
        <div className="space-y-24 md:space-y-32">
          {reasons.map((reason, index) => (
            <ReasonBlock key={reason.number} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
