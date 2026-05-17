"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Phone, Mail, MapPin, Clock, CheckCircle, MessageCircle } from "lucide-react";

const treatments = [
  "Botox",
  "Lip Enhancement",
  "Skin Rejuvenation",
  "PRP Therapy",
  "Facial Contouring",
  "Chemical Peels",
  "Not sure — need guidance",
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-[#C9A96E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-[#C9A96E]" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1E2A44] mb-4">
            Consultation requested
          </h1>
          <p className="text-stone-500 font-sans font-light leading-[1.7] mb-8">
            Thank you, {formData.name}. We've received your request and will
            confirm your appointment within 24 hours. A confirmation email has
            been sent to {formData.email}.
          </p>
          <p className="text-stone-400 font-sans text-sm">
            Reference: AC-{Date.now().toString().slice(-6)}
          </p>
        </motion.div>
      </main>
    );
  }

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
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E]/60 font-sans mb-4">
              <span className="w-8 h-px bg-[#C9A96E]/40" />
              Private Consultation
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
              Begin with a conversation
            </h1>
            <p className="text-white/50 font-sans font-light text-lg leading-[1.7]">
              Every treatment at Aureline begins with a private consultation.
              Tell us your goals, and we'll design a plan that's uniquely yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-serif text-2xl md:text-3xl text-[#1E2A44] mb-8">
                  Your details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-sans mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 text-[#1E2A44] font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                        placeholder="Sarah Johnson"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-sans mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 text-[#1E2A44] font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                        placeholder="+44 7700 000000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-sans mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-stone-200 text-[#1E2A44] font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      placeholder="sarah@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-sans mb-2">
                      Treatment Interest
                    </label>
                    <select
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-stone-200 text-[#1E2A44] font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a treatment</option>
                      {treatments.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-sans mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 text-[#1E2A44] font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-sans mb-2">
                        Preferred Time
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone-200 text-[#1E2A44] font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-sans mb-2">
                      Your Goals / Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-stone-200 text-[#1E2A44] font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                      placeholder="Tell us about your goals, concerns, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#C9A96E] text-[#1E2A44] text-[13px] uppercase tracking-[0.12em] font-sans font-medium transition-all duration-300 hover:bg-[#B8985E] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1E2A44]/30 border-t-[#1E2A44] rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Calendar size={16} strokeWidth={1.5} />
                        Request Consultation
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:sticky lg:top-32 space-y-8"
              >
                {/* What to Expect */}
                <div className="bg-white border border-stone-200/80 p-8">
                  <h3 className="font-serif text-xl text-[#1E2A44] mb-6">
                    What to expect
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MessageCircle size={16} className="text-[#C9A96E]" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-[#1E2A44] mb-1">
                          Personalized Assessment
                        </p>
                        <p className="text-stone-500 font-sans font-light text-sm leading-[1.6]">
                          We analyze your facial structure and skin condition to
                          recommend the most suitable treatments.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={16} className="text-[#C9A96E]" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-[#1E2A44] mb-1">
                          Treatment Recommendations
                        </p>
                        <p className="text-stone-500 font-sans font-light text-sm leading-[1.6]">
                          You'll receive a tailored treatment plan with
                          transparent pricing and expected outcomes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock size={16} className="text-[#C9A96E]" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-medium text-[#1E2A44] mb-1">
                          No Pressure, No Obligation
                        </p>
                        <p className="text-stone-500 font-sans font-light text-sm leading-[1.6]">
                          Take time to decide. There's never any pressure to book
                          immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-[#1E2A44] p-8">
                  <h3 className="font-serif text-xl text-white mb-6">
                    Prefer to talk?
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="tel:+442000000000"
                      className="flex items-center gap-3 text-white/60 hover:text-[#C9A96E] transition-colors font-sans text-sm"
                    >
                      <Phone size={16} strokeWidth={1.5} />
                      +44 20 0000 0000
                    </a>
                    <a
                      href="mailto:hello@aureline.clinic"
                      className="flex items-center gap-3 text-white/60 hover:text-[#C9A96E] transition-colors font-sans text-sm"
                    >
                      <Mail size={16} strokeWidth={1.5} />
                      hello@aureline.clinic
                    </a>
                    <div className="flex items-start gap-3 text-white/60 font-sans text-sm">
                      <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                      <span>
                        12a Mount Street
                        <br />
                        Mayfair, London W1K 2RB
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <a
                      href="https://wa.me/447000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 text-white/80 text-[12px] uppercase tracking-[0.12em] font-sans transition-all duration-300 hover:border-[#C9A96E]/50 hover:text-[#C9A96E]"
                    >
                      <MessageCircle size={16} strokeWidth={1.5} />
                      WhatsApp Our Team
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
