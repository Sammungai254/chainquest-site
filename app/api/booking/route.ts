import { NextRequest, NextResponse } from "next/server";

interface BookingPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  time?: string;
  message?: string;
}

/**
 * POST /api/booking
 *
 * Handles booking form submissions. Currently logs to console and returns success.
 *
 * To persist to a real database, replace the console.log with:
 * - MongoDB: use mongoose or the MongoDB driver
 * - Firebase: use Firebase Admin SDK
 * - Supabase: use @supabase/supabase-js
 *
 * To send email notifications, integrate:
 * - Nodemailer (SMTP)
 * - Resend (resend.com)
 * - SendGrid
 */
export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json();

    // Basic validation
    if (!body.name || !body.email || !body.service || !body.date) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, service, date" },
        { status: 400 }
      );
    }

    // Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // --- Persistence layer (replace with real DB) ---
    const booking = {
      id: `booking_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    // Log to console (replace with DB insert)
    console.log("[ChainQuest Booking]", JSON.stringify(booking, null, 2));

    // TODO: Send confirmation email to user
    // TODO: Send notification email/WhatsApp to admin
    // TODO: Create Google Calendar event (optional)

    return NextResponse.json(
      {
        success: true,
        message: "Booking received. We will confirm within 24 hours.",
        bookingId: booking.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Booking API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
