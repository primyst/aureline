import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Slot from "@/lib/models/Slot";
import Practitioner from "@/lib/models/Practitioner";
import { SlotsQuerySchema } from "@/lib/validations/booking";

const LONDON_TIME_ZONE = "Europe/London";

function getLondonDayRange(date: string) {
  // Slot dates are stored as UTC-normalized calendar days by the seed script.
  // Query the exact UTC day so server timezone differences cannot shift results.
  const dayStart = new Date(`${date}T00:00:00.000Z`);
  const dayEnd = new Date(`${date}T23:59:59.999Z`);
  return { dayStart, dayEnd };
}

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
    const { dayStart, dayEnd } = getLondonDayRange(date);

    await connectToDatabase();

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

    const response = slots
      .map((slot) => {
        const practitioner = practitionerMap.get(slot.practitionerId.toString());
        if (!practitioner) return null;

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
      .sort((a, b) => (a!.time > b!.time ? 1 : -1));

    return NextResponse.json({ slots: response });
  } catch (err) {
    console.error("[GET /api/slots]", err);
    return NextResponse.json(
      { error: "Failed to fetch available slots." },
      { status: 500 }
    );
  }
}
