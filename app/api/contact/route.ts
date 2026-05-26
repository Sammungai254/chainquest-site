import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 *
 * To send real emails, integrate Resend/Nodemailer/SendGrid here.
 * Example with Resend:
 *   import { Resend } from 'resend';
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({ from, to, subject, html });
 */
export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const message = {
      id: `msg_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    // Log to console (replace with email service / DB)
    console.log("[ChainQuest Contact]", JSON.stringify(message, null, 2));

    // TODO: Send notification email to info@chainquestke.com
    // TODO: Send auto-reply to sender

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We will respond within 24 hours.",
        messageId: message.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
