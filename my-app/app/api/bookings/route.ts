import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Slot from "@/lib/models/Slot";
import Booking from "@/lib/models/Booking";
import Practitioner from "@/lib/models/Practitioner";
import { sendBookingEmails } from "@/lib/email/sender";
import {
  CreateBookingSchema,
  TREATMENT_LABELS,
} from "@/lib/validations/booking";

// ─── Simple in-memory rate limiter ───────────────────────────────────────────
// Keyed by IP. Max 5 booking attempts per 10 minutes per IP.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count += 1;
  return true;
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ─── POST /api/bookings ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = getIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many booking attempts. Please try again later." },
      { status: 429 }
    );
  }

  // Parse + validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = CreateBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { slotId, treatment, patientName, patientEmail, patientPhone, notes } =
    parsed.data;

  await connectToDatabase();

  // ─── Atomic slot reservation ───────────────────────────────────────────────
  // Only updates the slot if isBooked is still false.
  // This is the critical double-booking prevention — not application logic.
  const reservedSlot = await Slot.findOneAndUpdate(
    { _id: slotId, treatment, isBooked: false },
    { isBooked: true },
    { new: true }
  );

  if (!reservedSlot) {
    return NextResponse.json(
      {
        error:
          "This slot is no longer available. Please select a different time.",
      },
      { status: 409 }
    );
  }

  // Fetch practitioner (after reservation — slot is already held)
  const practitioner = await Practitioner.findById(
    reservedSlot.practitionerId
  ).lean();

  if (!practitioner || !practitioner.isActive) {
    // Roll back the slot reservation
    await Slot.findByIdAndUpdate(slotId, { isBooked: false });
    return NextResponse.json(
      { error: "Practitioner is unavailable. Please select another slot." },
      { status: 409 }
    );
  }

  // ─── Create booking ────────────────────────────────────────────────────────
  let booking;
  try {
    booking = await Booking.create({
      patientName,
      patientEmail,
      patientPhone,
      treatment,
      treatmentLabel: TREATMENT_LABELS[treatment],
      practitionerId: practitioner._id,
      practitionerName: practitioner.name,
      slotId: reservedSlot._id,
      date: reservedSlot.date,
      time: reservedSlot.time,
      duration: reservedSlot.duration,
      notes,
      status: "confirmed",
    });

    // Link booking back to slot
    await Slot.findByIdAndUpdate(slotId, { bookedBy: booking._id });
  } catch (err) {
    // Roll back slot if booking creation fails
    await Slot.findByIdAndUpdate(slotId, { isBooked: false, bookedBy: null });
    console.error("[POST /api/bookings] Booking creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }

  // ─── Send emails ───────────────────────────────────────────────────────────
  const formattedDate = new Date(reservedSlot.date).toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/London",
    }
  );

  try {
    await sendBookingEmails({
      reference: booking.reference,
      patientName,
      patientEmail,
      patientPhone,
      treatment: TREATMENT_LABELS[treatment],
      practitionerName: practitioner.name,
      date: formattedDate,
      time: reservedSlot.time,
      duration: reservedSlot.duration,
      notes,
    });
  } catch (emailErr) {
    // Booking is confirmed — email failure is non-blocking.
    // Log it but don't fail the request.
    console.error("[POST /api/bookings] Email delivery failed:", emailErr);
  }

  return NextResponse.json(
    { reference: booking.reference },
    { status: 201 }
  );
}
