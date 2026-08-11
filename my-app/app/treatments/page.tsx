"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const treatments = [
  {
    slug: "botox",
    number: "01",
    title: "Botox & Anti-Wrinkle",
    category: "Injectables",
    description:
      "Soften expression lines while preserving natural movement and the character of your face.",
    price: "From £195",
    duration: "30 min",
    image: "/botox.jpg",
  },
  {
    slug: "lip-enhancement",
    number: "02",
    title: "Lip Enhancement",
    category: "Injectables",
    description:
      "Subtle volume, definition and balance, tailored to your natural proportions.",
    price: "From £250",
    duration: "45 min",
    image: "/lip.jpg",
  },
  {
    slug: "skin-rejuvenation",
    number: "03",
    title: "Skin Rejuvenation",
    category: "Skin",
    description:
      "Restore radiance and support a smoother, brighter and more even-looking complexion.",
    price: "From £280",
    duration: "60 min",
    image: "/skin.jpg",
  },
  {
    slug: "prp-therapy",
    number: "04",
    title: "PRP Therapy",
    category: "Regenerative",
    description:
      "A regenerative approach using your own platelet-rich plasma to support skin renewal.",
    price: "From £350",
    duration: "75 min",
    image: "/prp.jpg",
  },
  {
    slug: "facial-contouring",
    number: "05",
    title: "Facial Contouring",
    category: "Injectables",
    description:
      "Refined definition and balance using a considered approach to facial structure.",
    price: "From £320",
    duration: "60 min",
    image: "/contouring.jpg",
  },
  {
    slug: "chemical-peels",
    number: "06",
    title: "Chemical Peels",
    category: "Skin",
    description:
      "Clinical-grade peels selected to refine texture, brighten the complexion and support clearer-looking skin.",
    price: "From £175",
    duration: "45 min",
    image: "/peel.jpg",
  },
];

export default function TreatmentsPage() {
  return (
    <main className="bg-[#FAF8F5] text-stone-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1E2A44] py-24 md:py-32 lg:py-36">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#C9A96E_1px,_transparent_1px)] bg-[length:40px_40px]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3 text-[10px] font-sans font-light uppercase tracking-[0.3em] text-[#C9A96E]/70">
              <span className="h-px w-9 bg-[#C9A96E]/50" />
              Our Treatments
            </div>
            <h1 className="font-serif text-5xl font-light leading-[0.98] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
              Thoughtful treatments.
              <br />
              <span className="italic text-[#C9A96E]/90">Considered results.</span>
            </h1>
            <p className="mt-7 max-w-xl font-sans text-sm font-light leading-7 text-white/55 md:text-base">
              From subtle enhancements to skin-focused treatments, every treatment begins with a consultation designed around you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Treatment catalogue */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="mb-12 flex items-end justify-between gap-8 border-b border-stone-200 pb-6 md:mb-16">
            <div>
              <p className="mb-2 font-sans text-[10px] font-light uppercase tracking-[0.25em] text-stone-400">
                The Aureline approach
              </p>
              <p className="max-w-xl font-sans text-sm font-light leading-6 text-stone-500">
                Every treatment is selected around your features, skin and goals. Explore a treatment below to learn more.
              </p>
            </div>
            <span className="hidden font-sans text-[10px] font-light uppercase tracking-[0.2em] text-stone-300 md:block">
              06 Treatments
            </span>
          </div>

          <div className="space-y-20 md:space-y-28">
            {treatments.map((treatment, index) => {
              const reversed = index % 2 === 1;

              return (
                <motion.article
                  key={treatment.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="grid overflow-hidden border-t border-stone-200 pt-0 lg:grid-cols-2"
                >
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className={`group relative block aspect-[4/3] overflow-hidden bg-stone-100 lg:aspect-auto lg:min-h-[520px] ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={treatment.image}
                      alt={treatment.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44]/25 via-transparent to-transparent opacity-60" />
                    <span className="absolute left-6 top-6 font-sans text-[10px] font-light tracking-[0.25em] text-white/80">
                      {treatment.number}
                    </span>
                    <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/5 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-[#1E2A44]">
                      <ArrowUpRight size={16} strokeWidth={1.4} />
                    </span>
                  </Link>

                  <div
                    className={`flex min-h-[420px] flex-col justify-center px-0 py-10 md:px-8 lg:px-16 lg:py-16 ${
                      reversed ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="mb-4 font-sans text-[10px] font-light uppercase tracking-[0.25em] text-stone-400">
                      {treatment.category}
                    </p>
                    <h2 className="font-serif text-4xl font-light leading-[0.98] tracking-[-0.02em] text-[#1E2A44] md:text-5xl">
                      {treatment.title}
                    </h2>
                    <p className="mt-6 max-w-md font-sans text-sm font-light leading-7 text-stone-500">
                      {treatment.description}
                    </p>

                    <div className="mt-7 flex items-center gap-5 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-stone-400">
                      <span>{treatment.price}</span>
                      <span className="h-1 w-1 rounded-full bg-stone-300" />
                      <span>{treatment.duration}</span>
                    </div>

                    <div className="mt-9 flex flex-wrap items-center gap-7">
                      <Link
                        href={`/treatments/${treatment.slug}`}
                        className="group/link inline-flex items-center gap-3 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-[#1E2A44]"
                      >
                        Explore treatment
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </Link>
                      <Link
                        href="/consultation"
                        className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-stone-400 transition-colors hover:text-[#1E2A44]"
                      >
                        Book consultation
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="border-t border-stone-200 bg-[#F3F0EB] px-6 py-24 md:py-32 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 font-sans text-[10px] font-light uppercase tracking-[0.3em] text-stone-400">
            Not sure where to begin?
          </p>
          <h2 className="font-serif text-4xl font-light leading-none tracking-[-0.02em] text-[#1E2A44] md:text-6xl">
            Every treatment begins
            <br />
            with a conversation.
          </h2>
          <p className="mx-auto mt-7 max-w-lg font-sans text-sm font-light leading-7 text-stone-500">
            Tell us what you&apos;re looking to achieve and we&apos;ll help you find the right approach for you.
          </p>
          <Link
            href="/consultation"
            className="mt-9 inline-flex items-center gap-3 bg-[#1E2A44] px-8 py-4 font-sans text-[10px] font-light uppercase tracking-[0.22em] text-[#FAF8F5] transition-colors hover:bg-[#2A3957]"
          >
            Book a Consultation
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
