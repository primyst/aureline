import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/lib/models/Booking";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;

  // Validate reference format — AUR- followed by 8 alphanumeric characters
  if (!ref || !/^AUR-[A-Z0-9]{8}$/.test(ref)) {
    return NextResponse.json(
      { error: "Invalid booking reference." },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const booking = await Booking.findOne({ reference: ref })
    .select(
      "reference patientName treatment treatmentLabel practitionerName date time duration status createdAt"
    )
    .lean();

  if (!booking) {
    return NextResponse.json(
      { error: "Booking not found." },
      { status: 404 }
    );
  }

  const formattedDate = new Date(booking.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });

  // Return only what the frontend needs — no internal IDs, no patient contact details
  return NextResponse.json({
    booking: {
      reference: booking.reference,
      patientName: booking.patientName,
      treatment: booking.treatmentLabel,
      practitionerName: booking.practitionerName,
      date: formattedDate,
      time: booking.time,
      duration: booking.duration,
      status: booking.status,
      createdAt: booking.createdAt,
    },
  });
}