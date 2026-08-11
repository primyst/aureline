"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Shield, Sparkles, CheckCircle, Phone } from "lucide-react";

interface TreatmentData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  priceFrom: number;
  duration: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

const treatmentsData: Record<string, TreatmentData> = {
  botox: {
    slug: "botox",
    title: "Botox",
    subtitle: "Smooth expression lines while preserving natural movement",
    description:
      "Our Botox treatments are designed to soften fine lines and wrinkles while maintaining your natural facial expressions. Using precise micro-dosing techniques, we target specific muscles to create a refreshed, well-rested appearance — never frozen or artificial.",
    image: "/botox.jpg",
    priceFrom: 250,
    duration: "30–45 minutes",
    benefits: [
      "Softens forehead lines, crow's feet, and frown lines",
      "Preserves natural facial movement and expression",
      "Prevents deepening of wrinkles over time",
      "Quick treatment with no downtime",
      "Results visible within 3–7 days",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description:
          "We assess your facial structure, discuss your goals, and identify the precise areas for treatment. Every plan is personalized.",
      },
      {
        step: 2,
        title: "Personalized Treatment",
        description:
          "Using ultra-fine needles, we administer Botox with micro-dosing precision. The procedure takes 30–45 minutes with minimal discomfort.",
      },
      {
        step: 3,
        title: "Recovery",
        description:
          "Return to normal activities immediately. We advise avoiding strenuous exercise for 24 hours and not lying down for 4 hours post-treatment.",
      },
      {
        step: 4,
        title: "Results",
        description:
          "Initial results appear in 3–7 days, with full effect at 2 weeks. Results typically last 3–4 months. We schedule follow-ups to maintain your look.",
      },
    ],
    faqs: [
      {
        question: "How long do Botox results last?",
        answer:
          "Results typically last 3–4 months. With regular treatments, the effects may last longer as muscles become trained to relax.",
      },
      {
        question: "Will I look frozen?",
        answer:
          "Not with our approach. We use micro-dosing techniques that soften lines while preserving your natural expressions and movement.",
      },
      {
        question: "Is there any downtime?",
        answer:
          "No. You can return to work and normal activities immediately. Minor redness at injection sites resolves within minutes.",
      },
    ],
  },
  "lip-fillers": {
    slug: "lip-enhancement",
    title: "Lip Enhancement",
    subtitle: "Subtle volume and definition for balanced proportions",
    description:
      "Our lip enhancement treatments focus on creating natural, harmonious volume that complements your facial features. We use premium hyaluronic acid fillers to add subtle definition, correct asymmetry, and restore youthful fullness — never overdone.",
    image: "/lip.jpg",
    priceFrom: 350,
    duration: "45–60 minutes",
    benefits: [
      "Adds natural-looking volume and definition",
      "Corrects asymmetry and restores shape",
      "Enhances lip border for a more defined look",
      "Hydrates and improves lip texture",
      "Results are immediate and adjustable",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description:
          "We analyze your lip shape, facial proportions, and discuss your desired outcome. We design a plan that enhances, not transforms.",
      },
      {
        step: 2,
        title: "Personalized Treatment",
        description:
          "Using cannula or fine-needle techniques, we layer filler strategically for smooth, even results. Numbing cream ensures comfort throughout.",
      },
      {
        step: 3,
        title: "Recovery",
        description:
          "Expect mild swelling for 24–48 hours. We provide aftercare guidance including ice application and avoiding heat exposure for 48 hours.",
      },
      {
        step: 4,
        title: "Results",
        description:
          "Immediate visible results with final shape settling after 2 weeks. Results last 6–12 months depending on the product and your metabolism.",
      },
    ],
    faqs: [
      {
        question: "Will my lips look unnatural?",
        answer:
          "Our philosophy is enhancement, not transformation. We add subtle volume that complements your natural lip shape and facial proportions.",
      },
      {
        question: "How long do lip fillers last?",
        answer:
          "Typically 6–12 months. Factors like metabolism, product choice, and lifestyle affect longevity. We recommend maintenance every 6–9 months.",
      },
      {
        question: "Can the results be reversed?",
        answer:
          "Yes. Hyaluronic acid fillers can be dissolved with an enzyme called hyaluronidase if needed, though this is rarely requested with our approach.",
      },
    ],
  },
  "skin-rejuvenation": {
    slug: "skin-rejuvenation",
    title: "Skin Rejuvenation",
    subtitle: "Restore radiance and even tone with advanced techniques",
    description:
      "Our skin rejuvenation treatments combine medical-grade skincare, laser technology, and collagen-stimulating therapies to address fine lines, pigmentation, texture issues, and dullness. Each protocol is tailored to your skin type and concerns.",
    image: "/skin.jpg",
    priceFrom: 400,
    duration: "60–90 minutes",
    benefits: [
      "Improves skin texture and reduces pore size",
      "Fades pigmentation and sun damage",
      "Stimulates collagen for firmer skin",
      "Restores radiance and even tone",
      "Customizable to your specific skin concerns",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description:
          "We conduct a thorough skin analysis using diagnostic imaging to identify concerns beneath the surface. We then design a multi-session protocol.",
      },
      {
        step: 2,
        title: "Personalized Treatment",
        description:
          "Depending on your needs, we may use laser resurfacing, microneedling with RF, or medical-grade peels — alone or in combination.",
      },
      {
        step: 3,
        title: "Recovery",
        description:
          "Downtime varies by treatment intensity. Light treatments have no downtime; deeper resurfacing may require 3–5 days of social downtime.",
      },
      {
        step: 4,
        title: "Results",
        description:
          "Visible improvement after the first session, with optimal results after a series of 3–6 treatments spaced 4–6 weeks apart.",
      },
    ],
    faqs: [
      {
        question: "How many sessions will I need?",
        answer:
          "Most clients see significant improvement after 3–6 sessions. We assess progress after each treatment and adjust the protocol as needed.",
      },
      {
        question: "Is there downtime?",
        answer:
          "It depends on the treatment intensity. Light treatments have no downtime; deeper procedures may require 3–5 days of social recovery.",
      },
      {
        question: "Can all skin types be treated?",
        answer:
          "Yes. We have protocols specifically designed for darker skin tones to minimize risk of pigmentation changes.",
      },
    ],
  },
  "prp-therapy": {
    slug: "prp-therapy",
    title: "PRP Therapy",
    subtitle: "Harness your body's own regenerative potential",
    description:
      "Platelet-Rich Plasma (PRP) therapy uses your body's natural healing factors to stimulate collagen production, improve skin texture, and promote hair growth. It's a completely natural approach that works with your biology, not against it.",
    image: "/prp.jpg",
    priceFrom: 450,
    duration: "60–75 minutes",
    benefits: [
      "100% natural — uses your own blood plasma",
      "Stimulates collagen and elastin production",
      "Improves skin texture and firmness",
      "Reduces fine lines and acne scarring",
      "Can be combined with microneedling for enhanced results",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description:
          "We review your medical history, assess your skin concerns, and determine if PRP is the right approach for your goals.",
      },
      {
        step: 2,
        title: "Personalized Treatment",
        description:
          "We draw a small amount of blood, process it in a centrifuge to isolate the platelet-rich plasma, then inject or apply it to target areas.",
      },
      {
        step: 3,
        title: "Recovery",
        description:
          "Mild redness and swelling for 24–48 hours. No specific aftercare restrictions — your body does the healing naturally.",
      },
      {
        step: 4,
        title: "Results",
        description:
          "Gradual improvement over 4–6 weeks as collagen builds. A series of 3 treatments, 4 weeks apart, is recommended for optimal results.",
      },
    ],
    faqs: [
      {
        question: "Is PRP safe?",
        answer:
          "Yes — because it uses your own blood, there is no risk of allergic reaction or rejection. It's one of the safest aesthetic treatments available.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Initial improvements appear at 4–6 weeks as collagen production increases. Optimal results develop over 3 months post-treatment.",
      },
      {
        question: "Can PRP help with hair loss?",
        answer:
          "Yes. PRP is effective for stimulating dormant hair follicles and improving hair density, particularly in early-stage hair thinning.",
      },
    ],
  },
  "facial-contouring": {
    slug: "facial-contouring",
    title: "Facial Contouring",
    subtitle: "Sculpted, balanced features with precision techniques",
    description:
      "Our facial contouring treatments use advanced dermal fillers and collagen-stimulating injectables to enhance facial structure, restore lost volume, and create harmonious proportions. The result is a more defined, youthful appearance that still looks entirely you.",
    image: "/contouring.jpg",
    priceFrom: 600,
    duration: "60–90 minutes",
    benefits: [
      "Defines cheekbones and jawline structure",
      "Restores mid-face volume lost with age",
      "Creates balanced, harmonious proportions",
      "Lifts and contours without surgery",
      "Results are immediate and long-lasting",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description:
          "We analyze your facial proportions using advanced imaging and discuss which areas would benefit most from structural enhancement.",
      },
      {
        step: 2,
        title: "Personalized Treatment",
        description:
          "Using cannula and needle techniques, we place high-density fillers along the bone structure and deeper tissue layers for natural lift and definition.",
      },
      {
        step: 3,
        title: "Recovery",
        description:
          "Mild swelling and possible bruising for 3–7 days. We recommend avoiding intense exercise and alcohol for 48 hours post-treatment.",
      },
      {
        step: 4,
        title: "Results",
        description:
          "Immediate structural improvement with final results visible at 2–3 weeks. Results last 12–18 months depending on product and area treated.",
      },
    ],
    faqs: [
      {
        question: "Will I look like I've had work done?",
        answer:
          "No. Our approach restores the structure you had in your youth. The result is a fresher, more defined version of you — not a different person.",
      },
      {
        question: "How long do results last?",
        answer:
          "Facial contouring fillers last 12–18 months, significantly longer than standard lip fillers due to the denser product and deeper placement.",
      },
      {
        question: "Is this a replacement for a facelift?",
        answer:
          "For moderate volume loss, yes. For significant skin laxity, we may recommend combining with skin-tightening treatments or discussing surgical options.",
      },
    ],
  },
  "chemical-peels": {
    slug: "chemical-peels",
    title: "Chemical Peels",
    subtitle: "Reveal fresh, renewed skin with clinical-grade solutions",
    description:
      "Our chemical peels use medical-grade acids at precise concentrations to exfoliate damaged skin layers, stimulate cell renewal, and reveal brighter, smoother skin beneath. From gentle lunchtime peels to deeper resurfacing, we tailor the strength to your skin's needs.",
    image: "/peel.jpg",
    priceFrom: 200,
    duration: "30–45 minutes",
    benefits: [
      "Improves skin texture and reduces fine lines",
      "Fades hyperpigmentation and acne marks",
      "Unclogs pores and reduces breakouts",
      "Stimulates cell turnover for radiant skin",
      "Customizable depth for your skin type and goals",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description:
          "We assess your skin type, concerns, and tolerance to determine the ideal peel strength and formulation for your goals.",
      },
      {
        step: 2,
        title: "Personalized Treatment",
        description:
          "After cleansing and prepping the skin, we apply the peel solution and monitor your skin's response to ensure optimal results without over-treatment.",
      },
      {
        step: 3,
        title: "Recovery",
        description:
          "Light peels: no downtime. Medium peels: 3–5 days of flaking. Deep peels: 7–10 days of peeling. We provide detailed aftercare instructions.",
      },
      {
        step: 4,
        title: "Results",
        description:
          "Brighter, smoother skin visible within a week. A series of 4–6 peels, 3–4 weeks apart, delivers cumulative improvement in texture and tone.",
      },
    ],
    faqs: [
      {
        question: "Will my skin actually peel?",
        answer:
          "Light peels cause minimal to no visible peeling. Medium and deep peels do cause flaking and peeling — we prepare you for what to expect.",
      },
      {
        question: "How many peels do I need?",
        answer:
          "A series of 4–6 peels delivers the best results. We space them 3–4 weeks apart to allow full skin recovery between treatments.",
      },
      {
        question: "Can I wear makeup after?",
        answer:
          "After light peels: yes, after 24 hours. After medium/deep peels: we recommend waiting 5–7 days until peeling is complete.",
      },
    ],
  },
};

function ProcessStep({
  step,
  title,
  description,
  index,
}: {
  step: number;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-stone-200" />
      <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-[#C9A96E] flex items-center justify-center">
        <span className="text-[10px] font-sans font-medium text-[#1E2A44]">
          {step}
        </span>
      </div>
      <h3 className="font-serif text-xl md:text-2xl text-[#1E2A44] mb-2">
        {title}
      </h3>
      <p className="text-stone-500 font-sans font-light leading-[1.7] text-sm md:text-base max-w-lg">
        {description}
      </p>
    </motion.div>
  );
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="border-b border-stone-200/80 py-6"
    >
      <h4 className="font-serif text-lg md:text-xl text-[#1E2A44] mb-2">
        {question}
      </h4>
      <p className="text-stone-500 font-sans font-light leading-[1.7] text-sm">
        {answer}
      </p>
    </motion.div>
  );
}

export default function TreatmentPage() {
  const params = useParams();
  const slug = params.slug as string;
  const treatment = treatmentsData[slug];

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#1E2A44] mb-4">
            Treatment not found
          </h1>
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#B8985E] transition-colors font-sans text-sm"
          >
            <ArrowLeft size={16} />
            Back to treatments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${treatment.image}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1E2A44]/90 via-[#1E2A44]/50 to-[#1E2A44]/20" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-sans text-sm mb-6"
              >
                <ArrowLeft size={16} />
                All Treatments
              </Link>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-4">
                {treatment.title}
              </h1>
              <p className="text-white/70 font-sans font-light text-lg md:text-xl max-w-xl">
                {treatment.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-sans mb-4">
                  <span className="w-8 h-px bg-[#C9A96E]" />
                  Overview
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1E2A44] leading-[1.2] mb-6">
                  A closer look at{" "}
                  <span className="italic text-[#C9A96E]/80">
                    {treatment.title.toLowerCase()}
                  </span>
                </h2>
                <p className="text-stone-500 font-sans font-light leading-[1.8] text-base md:text-lg">
                  {treatment.description}
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white border border-stone-200/80 p-8 md:p-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#C9A96E]/10 flex items-center justify-center">
                      <Sparkles size={18} className="text-[#C9A96E]" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-sans">
                        From
                      </p>
                      <p className="font-serif text-2xl text-[#1E2A44]">
                        £{treatment.priceFrom}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#C9A96E]/10 flex items-center justify-center">
                      <Clock size={18} className="text-[#C9A96E]" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-sans">
                        Duration
                      </p>
                      <p className="font-serif text-2xl text-[#1E2A44]">
                        {treatment.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#C9A96E]/10 flex items-center justify-center">
                      <Shield size={18} className="text-[#C9A96E]" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-stone-400 font-sans">
                        Safety
                      </p>
                      <p className="font-serif text-lg text-[#1E2A44]">
                        Medical-grade, clinically proven
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-stone-100">
                  <Link
                    href="/consultation"
                    className="group flex items-center justify-center gap-3 w-full py-4 bg-[#C9A96E] text-[#1E2A44] text-[13px] uppercase tracking-[0.12em] font-sans font-medium transition-all duration-300 hover:bg-[#B8985E]"
                  >
                    <Calendar size={16} strokeWidth={1.5} />
                    Book Consultation
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28 bg-white border-y border-stone-200/60">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-sans mb-4">
              <span className="w-8 h-px bg-[#C9A96E]" />
              Benefits
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E2A44]">
              What you can <span className="italic text-[#C9A96E]/80">expect</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatment.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex items-start gap-4 p-6 border border-stone-200/80"
              >
                <CheckCircle
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#C9A96E] flex-shrink-0 mt-0.5"
                />
                <p className="text-stone-600 font-sans font-light text-sm leading-[1.6]">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:sticky lg:top-32"
              >
                <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-sans mb-4">
                  <span className="w-8 h-px bg-[#C9A96E]" />
                  The Process
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1E2A44] leading-[1.2] mb-4">
                  Your journey,{" "}
                  <span className="italic text-[#C9A96E]/80">step by step</span>
                </h2>
                <p className="text-stone-500 font-sans font-light leading-[1.7]">
                  From first consultation to final results, every step is
                  designed around your comfort and your goals.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-8">
              {treatment.process.map((step, index) => (
                <ProcessStep
                  key={step.step}
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-28 bg-white border-y border-stone-200/60">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 md:mb-16 max-w-2xl"
          >
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] font-sans mb-4">
              <span className="w-8 h-px bg-[#C9A96E]" />
              FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1E2A44]">
              Common questions about{" "}
              <span className="italic text-[#C9A96E]/80">
                {treatment.title.toLowerCase()}
              </span>
            </h2>
          </motion.div>

          <div className="max-w-3xl">
            {treatment.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#1E2A44]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              Ready to begin your{" "}
              <span className="italic text-[#C9A96E]/80">
                {treatment.title.toLowerCase()}
              </span>{" "}
              journey?
            </h2>
            <p className="text-white/50 font-sans font-light max-w-xl mx-auto mb-10">
              Book a private consultation at our Mayfair clinic. We'll assess
              your goals and design a treatment plan tailored to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A96E] text-[#1E2A44] text-[13px] uppercase tracking-[0.12em] font-sans font-medium transition-all duration-300 hover:bg-[#B8985E]"
              >
                <Calendar size={16} strokeWidth={1.5} />
                Book Consultation
              </Link>

              <a
                href="https://wa.me/447000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white/80 text-[13px] uppercase tracking-[0.12em] font-sans transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                <Phone size={16} strokeWidth={1.5} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
