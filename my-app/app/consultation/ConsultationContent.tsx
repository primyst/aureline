"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Calendar, Clock, User } from "lucide-react";

interface SlotOption {
  slotId: string;
  time: string;
  duration: number;
  practitioner: { name: string; title: string };
}

interface FormState {
  treatment: string;
  date: string;
  slotId: string;
  selectedSlot: SlotOption | null;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes: string;
}

const TREATMENTS = [
  { slug: "botox", label: "Botox & Anti-Wrinkle", from: "£195", duration: "30 min" },
  { slug: "lip-enhancement", label: "Lip Enhancement", from: "£250", duration: "45 min" },
  { slug: "skin-rejuvenation", label: "Skin Rejuvenation", from: "£280", duration: "60 min" },
  { slug: "prp-therapy", label: "PRP Therapy", from: "£350", duration: "75 min" },
  { slug: "facial-contouring", label: "Facial Contouring", from: "£320", duration: "60 min" },
  { slug: "chemical-peels", label: "Chemical Peels", from: "£175", duration: "45 min" },
];

const STEPS = ["Treatment", "Date & Time", "Your Details", "Review"];

const FADE = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

// The seeded availability starts on the next London workday.
function getMinDate(): string {
  const date = new Date();
  const londonDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
  }).format(date);

  const [year, month, day] = londonDate.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day));
  const weekday = next.getUTCDay();

  if (weekday === 6) next.setUTCDate(next.getUTCDate() + 2);
  else if (weekday === 0) next.setUTCDate(next.getUTCDate() + 1);
  else next.setUTCDate(next.getUTCDate() + 1);

  return next.toISOString().split("T")[0];
}

function StepTreatment({ value, onChange, onNext }: { value: string; onChange: (t: string) => void; onNext: () => void }) {
  return (
    <div>
      <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-light text-stone-800 mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Select your treatment.</h2>
      <p className="text-[13px] text-stone-400 font-light mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>Choose the treatment you'd like to discuss in your consultation.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {TREATMENTS.map((t) => (
          <button key={t.slug} onClick={() => onChange(t.slug)} className={`text-left px-5 py-5 border transition-all duration-300 group ${value === t.slug ? "border-stone-800 bg-stone-50" : "border-stone-100 hover:border-stone-300"}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-light text-stone-800 mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>{t.label}</p>
                <p className="text-[11px] text-stone-400 font-light tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>From {t.from} · {t.duration}</p>
              </div>
              {value === t.slug && <div className="w-5 h-5 bg-stone-800 flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={11} strokeWidth={2} className="text-white" /></div>}
            </div>
          </button>
        ))}
      </div>
      <button onClick={onNext} disabled={!value} className="group inline-flex items-center gap-3 px-8 py-4 bg-stone-800 text-[#FAF8F5] text-[12px] tracking-[0.2em] uppercase font-light hover:bg-stone-700 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Continue<ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" /></button>
    </div>
  );
}

function StepDateTime({ treatment, date, selectedSlot, onDateChange, onSlotSelect, onNext, onBack }: { treatment: string; date: string; selectedSlot: SlotOption | null; onDateChange: (d: string) => void; onSlotSelect: (s: SlotOption) => void; onNext: () => void; onBack: () => void }) {
  const [slots, setSlots] = useState<SlotOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSlots = useCallback(async (d: string) => {
    if (!d) return;
    setLoading(true);
    setError("");
    setSlots([]);
    try {
      const res = await fetch(`/api/slots?treatment=${treatment}&date=${d}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load slots.");
      setSlots(data.slots ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load slots.");
    } finally {
      setLoading(false);
    }
  }, [treatment]);

  useEffect(() => { if (date) fetchSlots(date); }, [date, fetchSlots]);

  return (
    <div>
      <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-light text-stone-800 mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Choose a date and time.</h2>
      <p className="text-[13px] text-stone-400 font-light mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>Select a date to see available slots.</p>
      <div className="mb-8">
        <label className="block text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>Preferred Date</label>
        <input type="date" min={getMinDate()} value={date} onChange={(e) => onDateChange(e.target.value)} className="w-full sm:w-auto border border-stone-200 bg-white text-stone-800 px-4 py-3 text-[13px] font-light focus:outline-none focus:border-stone-400 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }} />
      </div>
      {date && (
        <div className="mb-10">
          {loading && <p className="text-[13px] text-stone-400 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>Loading available slots...</p>}
          {error && <p className="text-[13px] text-red-500 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}
          {!loading && !error && slots.length === 0 && <p className="text-[13px] text-stone-400 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>No slots available on this date. Please try another day.</p>}
          {!loading && slots.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>Available Slots</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {slots.map((slot) => (
                  <button key={slot.slotId} onClick={() => onSlotSelect(slot)} className={`text-left px-4 py-4 border transition-all duration-300 ${selectedSlot?.slotId === slot.slotId ? "border-stone-800 bg-stone-50" : "border-stone-100 hover:border-stone-300"}`}>
                    <p className="text-[15px] font-light text-stone-800 mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{slot.time}</p>
                    <p className="text-[10px] text-stone-400 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>{slot.practitioner.name}</p>
                    <p className="text-[10px] text-stone-300 font-light mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{slot.duration} min</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-stone-400 hover:text-stone-700 transition-colors font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}><ArrowLeft size={13} strokeWidth={1.5} /> Back</button>
        <button onClick={onNext} disabled={!selectedSlot} className="group inline-flex items-center gap-3 px-8 py-4 bg-stone-800 text-[#FAF8F5] text-[12px] tracking-[0.2em] uppercase font-light hover:bg-stone-700 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Continue<ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" /></button>
      </div>
    </div>
  );
}

function StepDetails({ form, onChange, onNext, onBack }: { form: FormState; onChange: (field: string, value: string) => void; onNext: () => void; onBack: () => void }) {
  const isValid = form.patientName.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.patientEmail) && form.patientPhone.trim().length >= 7;
  return (
    <div>
      <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-light text-stone-800 mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Your details.</h2>
      <p className="text-[13px] text-stone-400 font-light mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>All information is kept private and confidential.</p>
      <div className="flex flex-col gap-5 max-w-md mb-10">
        {[{ id: "patientName", label: "Full Name", type: "text", placeholder: "Your full name" }, { id: "patientEmail", label: "Email Address", type: "email", placeholder: "your@email.com" }, { id: "patientPhone", label: "Phone Number", type: "tel", placeholder: "+44 7700 000000" }].map((field) => (
          <div key={field.id}><label htmlFor={field.id} className="block text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>{field.label}</label><input id={field.id} type={field.type} placeholder={field.placeholder} value={form[field.id as keyof FormState] as string} onChange={(e) => onChange(field.id, e.target.value)} className="w-full border border-stone-200 bg-white text-stone-800 px-4 py-3 text-[13px] font-light focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-300" style={{ fontFamily: "'DM Sans', sans-serif" }} /></div>
        ))}
        <div><label htmlFor="notes" className="block text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>Notes or Goals <span className="normal-case tracking-normal text-stone-300">(optional)</span></label><textarea id="notes" rows={4} placeholder="Anything you'd like your practitioner to know beforehand..." value={form.notes} onChange={(e) => onChange("notes", e.target.value)} maxLength={1000} className="w-full border border-stone-200 bg-white text-stone-800 px-4 py-3 text-[13px] font-light focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-300 resize-none" style={{ fontFamily: "'DM Sans', sans-serif" }} /></div>
      </div>
      <div className="flex items-center gap-4"><button onClick={onBack} className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-stone-400 hover:text-stone-700 transition-colors font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}><ArrowLeft size={13} strokeWidth={1.5} /> Back</button><button onClick={onNext} disabled={!isValid} className="group inline-flex items-center gap-3 px-8 py-4 bg-stone-800 text-[#FAF8F5] text-[12px] tracking-[0.2em] uppercase font-light hover:bg-stone-700 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed" style={{ fontFamily: "'DM Sans', sans-serif" }}>Review Booking<ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" /></button></div>
    </div>
  );
}

function StepReview({ form, onSubmit, onBack, submitting, error }: { form: FormState; onSubmit: () => void; onBack: () => void; submitting: boolean; error: string }) {
  const treatment = TREATMENTS.find((t) => t.slug === form.treatment);
  const rows = [
    { label: "Treatment", value: treatment?.label ?? "" },
    { label: "Practitioner", value: form.selectedSlot?.practitioner.name ?? "" },
    { label: "Date", value: form.date ? new Date(form.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" }) : "" },
    { label: "Time", value: `${form.selectedSlot?.time ?? ""} (${form.selectedSlot?.duration ?? ""} min)` },
    { label: "Name", value: form.patientName },
    { label: "Email", value: form.patientEmail },
    { label: "Phone", value: form.patientPhone },
    ...(form.notes ? [{ label: "Notes", value: form.notes }] : []),
  ];
  return (
    <div>
      <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-light text-stone-800 mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Review your booking.</h2>
      <p className="text-[13px] text-stone-400 font-light mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>Confirm your details before we secure your appointment.</p>
      <div className="border border-stone-100 mb-10 max-w-md">{rows.map((row, i) => <div key={i} className={`flex gap-6 px-6 py-4 ${i !== rows.length - 1 ? "border-b border-stone-50" : ""}`}><span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-light w-24 flex-shrink-0 pt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{row.label}</span><span className="text-[13px] text-stone-700 font-light leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{row.value}</span></div>)}</div>
      {error && <p className="text-[13px] text-red-500 font-light mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}
      <p className="text-[11px] text-stone-300 font-light mb-8 max-w-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>By confirming, you agree to our cancellation policy. Please give at least 48 hours notice to reschedule or cancel.</p>
      <div className="flex items-center gap-4"><button onClick={onBack} disabled={submitting} className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-stone-400 hover:text-stone-700 transition-colors font-light disabled:opacity-30" style={{ fontFamily: "'DM Sans', sans-serif" }}><ArrowLeft size={13} strokeWidth={1.5} /> Back</button><button onClick={onSubmit} disabled={submitting} className="group inline-flex items-center gap-3 px-8 py-4 bg-[#B8714A] text-white text-[12px] tracking-[0.2em] uppercase font-light hover:bg-[#a6623f] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{submitting ? "Confirming..." : "Confirm Booking"}{!submitting && <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />}</button></div>
    </div>
  );
}

export default function ConsultationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const treatmentFromUrl = searchParams.get("treatment");
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<FormState>({ treatment: TREATMENTS.some((t) => t.slug === treatmentFromUrl) ? treatmentFromUrl! : "", date: "", slotId: "", selectedSlot: null, patientName: "", patientEmail: "", patientPhone: "", notes: "" });

  useEffect(() => { if (treatmentFromUrl && TREATMENTS.some((t) => t.slug === treatmentFromUrl)) setStep(1); }, [treatmentFromUrl]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSlotSelect = (slot: SlotOption) => setForm((prev) => ({ ...prev, slotId: slot.slotId, selectedSlot: slot }));
  const handleDateChange = (date: string) => setForm((prev) => ({ ...prev, date, slotId: "", selectedSlot: null }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slotId: form.slotId, treatment: form.treatment, patientName: form.patientName, patientEmail: form.patientEmail, patientPhone: form.patientPhone, notes: form.notes }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed.");
      router.push(`/confirmation/${data.reference}`);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]"><div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24"><div className="grid grid-cols-1 lg:grid-cols-12 gap-16"><div className="lg:col-span-7"><div className="flex items-center gap-3 mb-14">{STEPS.map((s, i) => <div key={s} className="flex items-center gap-3"><div className="flex items-center gap-2"><div className={`w-6 h-6 flex items-center justify-center text-[10px] font-light transition-all duration-300 ${i < step ? "bg-stone-800 text-white" : i === step ? "border border-stone-800 text-stone-800" : "border border-stone-200 text-stone-300"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{i < step ? <Check size={10} strokeWidth={2} /> : i + 1}</div><span className={`text-[11px] tracking-[0.15em] uppercase font-light hidden sm:block transition-colors duration-300 ${i === step ? "text-stone-700" : "text-stone-300"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{s}</span></div>{i < STEPS.length - 1 && <div className={`w-8 h-px transition-colors duration-300 ${i < step ? "bg-stone-400" : "bg-stone-100"}`} />}</div>)}</div><AnimatePresence mode="wait"><motion.div key={step} {...FADE}>{step === 0 && <StepTreatment value={form.treatment} onChange={(t) => updateField("treatment", t)} onNext={() => setStep(1)} />}{step === 1 && <StepDateTime treatment={form.treatment} date={form.date} selectedSlot={form.selectedSlot} onDateChange={handleDateChange} onSlotSelect={handleSlotSelect} onNext={() => setStep(2)} onBack={() => setStep(0)} />}{step === 2 && <StepDetails form={form} onChange={updateField} onNext={() => setStep(3)} onBack={() => setStep(1)} />}{step === 3 && <StepReview form={form} onSubmit={handleSubmit} onBack={() => setStep(2)} submitting={submitting} error={submitError} />}</motion.div></AnimatePresence></div><div className="lg:col-span-4 lg:col-start-9"><div className="lg:sticky lg:top-32 flex flex-col gap-6"><div className="border border-stone-100 p-7"><p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-5 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>What to Expect</p>{[{ icon: User, text: "Private consultation with a senior practitioner" }, { icon: Clock, text: "Honest, no-pressure treatment recommendations" }, { icon: Calendar, text: "Full pricing discussion before any commitment" }, { icon: Check, text: "Confirmation email sent immediately" }].map(({ icon: Icon, text }, i) => <div key={i} className="flex items-start gap-3 mb-4 last:mb-0"><Icon size={13} strokeWidth={1.5} className="text-[#B8714A] mt-0.5 flex-shrink-0" /><p className="text-[12px] text-stone-500 font-light leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{text}</p></div>)}</div><div className="border border-stone-100 p-7"><p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-4 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>Prefer to speak first?</p><a href="https://wa.me/447700900000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[12px] text-stone-500 hover:text-stone-800 transition-colors duration-300 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-[#B8714A]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.916 2.207-.242.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c0 5.45-4.437 9.884-9.885 9.884"/></svg>Message us on WhatsApp</a></div></div></div></div></div>
  );
}
