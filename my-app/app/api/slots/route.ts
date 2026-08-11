import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Slot from "@/lib/models/Slot";
import Practitioner from "@/lib/models/Practitioner";
import { SlotsQuerySchema } from "@/lib/validations/booking";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = {
      treatment: searchParams.get("treatment") ?? "",
      date: searchParams.get("date") ?? "",
    };

    const parsed = SlotsQuerySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { treatment, date } = parsed.data;

    // Build date range for the full day (UTC)
    const dayStart = new Date(`${date}T00:00:00.000Z`);
    const dayEnd = new Date(`${date}T23:59:59.999Z`);

    await connectToDatabase();

    // Find all available (not booked) slots for this treatment on this date
    const slots = await Slot.find({
      treatment,
      date: { $gte: dayStart, $lte: dayEnd },
      isBooked: false,
    })
      .select("_id time duration practitionerId")
      .lean();

    if (!slots.length) {
      return NextResponse.json({ slots: [] });
    }

    // Fetch the relevant practitioners in one query
    const practitionerIds = [...new Set(slots.map((s) => s.practitionerId.toString()))];
    const practitioners = await Practitioner.find({
      _id: { $in: practitionerIds },
      isActive: true,
    })
      .select("_id name title")
      .lean();

    const practitionerMap = new Map(
      practitioners.map((p) => [p._id.toString(), p])
    );

    // Build safe response — never expose raw _id as the booking handle
    // slotId is safe to expose since it's needed to book but carries no sensitive info
    const response = slots
      .map((slot) => {
        const practitioner = practitionerMap.get(slot.practitionerId.toString());
        if (!practitioner) return null; // practitioner inactive or missing

        return {
          slotId: slot._id.toString(),
          time: slot.time,
          duration: slot.duration,
          practitioner: {
            name: practitioner.name,
            title: practitioner.title,
          },
        };
      })
      .filter(Boolean)
      .sort((a, b) => (a!.time > b!.time ? 1 : -1)); // sort by time ascending

    return NextResponse.json({ slots: response });
  } catch (err) {
    console.error("[GET /api/slots]", err);
    return NextResponse.json(
      { error: "Failed to fetch available slots." },
      { status: 500 }
    );
  }
}
