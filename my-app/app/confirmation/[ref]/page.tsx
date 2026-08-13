import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Calendar, Clock, User, MapPin } from "lucide-react";

interface BookingDetails {
  reference: string;
  patientName: string;
  treatment: string;
  practitionerName: string;
  date: string;
  time: string;
  duration: number;
  status: string;
}

async function getBooking(ref: string): Promise<BookingDetails | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/bookings/${ref}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.booking ?? null;
  } catch {
    return null;
  }
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;

  // Validate format before hitting the API
  if (!/^AUR-[A-Z0-9]{8}$/.test(ref)) notFound();

  const booking = await getBooking(ref);
  if (!booking) notFound();

  const details = [
    { icon: User, label: "Practitioner", value: booking.practitionerName },
    { icon: Calendar, label: "Date", value: booking.date },
    { icon: Clock, label: "Time", value: `${booking.time} (${booking.duration} min)` },
    { icon: MapPin, label: "Location", value: "12 Mount Street, Mayfair, London W1K 3NX" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-2xl mx-auto px-6 pt-36 pb-24">
        <div className="flex items-center justify-center w-14 h-14 bg-stone-800 mb-10">
          <Check size={22} strokeWidth={1.5} className="text-white" />
        </div>

        <p
          className="text-[11px] tracking-[0.4em] uppercase text-stone-400 mb-3 font-light"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Appointment Confirmed
        </p>
        <h1
          className="text-[clamp(2rem,4vw,3rem)] font-light text-stone-800 leading-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          We look forward to
          <br />
          <em className="not-italic" style={{ color: "#B8714A" }}>
            seeing you, {booking.patientName.split(" ")[0]}.
          </em>
        </h1>
        <p
          className="text-[14px] text-stone-400 font-light leading-relaxed mb-12"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          A confirmation email has been sent to you with all the details below.
          Please keep your reference number for your records.
        </p>

        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-stone-100">
          <div>
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-1 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Booking Reference
            </p>
            <p
              className="text-2xl font-light text-stone-800 tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {booking.reference}
            </p>
          </div>
        </div>

        <div className="mb-8 pb-8 border-b border-stone-100">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Treatment
          </p>
          <p
            className="text-xl font-light text-stone-800"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {booking.treatment}
          </p>
        </div>

        <div className="flex flex-col gap-5 mb-12">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <Icon size={15} strokeWidth={1.5} className="text-[#B8714A] mt-0.5 flex-shrink-0" />
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-0.5 font-light"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </p>
                <p
                  className="text-[14px] text-stone-700 font-light"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-stone-50 border border-stone-100 p-7 mb-10">
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-5 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            What Happens Next
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "You will receive a reminder 24 hours before your appointment",
              "Please arrive 5 minutes early — your practitioner will meet you at reception",
              "Bring a form of ID to your first appointment",
              "To reschedule, contact us at least 48 hours in advance",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-[#B8714A] flex-shrink-0 mt-2" />
                <p
                  className="text-[13px] text-stone-500 font-light leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-stone-800 text-[#FAF8F5] text-[12px] tracking-[0.2em] uppercase font-light hover:bg-stone-700 transition-colors duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Return Home
          </Link>
          <a
            href="https://wa.me/447700900000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-stone-200 text-stone-600 text-[12px] tracking-[0.2em] uppercase font-light hover:border-stone-400 transition-colors duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
