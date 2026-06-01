import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const FROM_ADDRESS = "ChainQuest Ke <noreply@chainquest.co.ke>";

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * POST /api/contact
 *
 * Handles contact form submissions:
 *   1. Sends a notification email to CONTACT_EMAIL (info@chainquest.co.ke)
 *   2. Sends a confirmation email back to the submitter
 *
 * Required env vars:
 *   - RESEND_API_KEY   Resend API key
 *   - CONTACT_EMAIL    Destination inbox for notifications (e.g. info@chainquest.co.ke)
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

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      console.error("[Contact API] Missing RESEND_API_KEY or CONTACT_EMAIL env var");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const name = body.name.trim();
    const email = body.email.trim();
    const subject = body.subject?.trim() || "New contact form submission";
    const message = body.message.trim();

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    // 1. Notification to the team
    const notification = await resend.emails.send({
      from: FROM_ADDRESS,
      to: contactEmail,
      replyTo: email,
      subject: `[ChainQuest Contact] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #0f1d35;">
          <h2 style="color: #f5c218; border-bottom: 2px solid #f5c218; padding-bottom: 8px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 16px; border-left: 4px solid #f5c218; border-radius: 4px;">
            ${safeMessage}
          </div>
          <p style="margin-top: 24px; color: #888; font-size: 12px;">
            Submitted at ${new Date().toUTCString()}
          </p>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nSubmitted at ${new Date().toUTCString()}`,
    });

    if (notification.error) {
      console.error("[Contact API] Notification send failed", notification.error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    // 2. Confirmation to the user (best-effort — don't fail the request if this errors)
    const confirmation = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      replyTo: contactEmail,
      subject: "We received your message — ChainQuest Ke",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #0f1d35;">
          <h2 style="color: #f5c218;">Thanks for reaching out, ${safeName}!</h2>
          <p>We've received your message and will respond within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <div style="background: #f5f5f5; padding: 16px; border-left: 4px solid #f5c218; border-radius: 4px;">
            ${safeMessage}
          </div>
          <p style="margin-top: 24px;">
            In the meantime, feel free to reach us directly at
            <a href="mailto:${escapeHtml(contactEmail)}" style="color: #f5c218;">${escapeHtml(contactEmail)}</a>
            or on WhatsApp at
            <a href="https://wa.me/254745381960" style="color: #f5c218;">+254 745 381 960</a>.
          </p>
          <p style="color: #888; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
            — The ChainQuest Ke Team<br/>
            <a href="https://chainquest.co.ke" style="color: #f5c218;">chainquest.co.ke</a>
          </p>
        </div>
      `,
      text: `Thanks for reaching out, ${name}!\n\nWe've received your message and will respond within 24 hours.\n\nYour message:\n${message}\n\nIn the meantime, reach us at ${contactEmail} or WhatsApp +254 745 381 960.\n\n— The ChainQuest Ke Team\nchainquest.co.ke`,
    });

    if (confirmation.error) {
      // Notification already succeeded — log but still return success to the user.
      console.warn("[Contact API] Confirmation send failed", confirmation.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent! We'll respond within 24 hours.",
        notificationId: notification.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
