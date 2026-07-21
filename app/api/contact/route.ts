import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Very small in-memory rate limiter (per server instance) so one visitor can't
// spam the form. Fine for a low-traffic marketing site; swap for a durable
// store (Upstash Redis, etc.) if you deploy across multiple instances.
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5; // max submissions
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes, per IP

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, business, service, message, company } = body as {
      name?: string;
      email?: string;
      business?: string;
      service?: string;
      message?: string;
      company?: string; // honeypot — real users never fill this in
    };

    // Honeypot: bots fill every field, including hidden ones. Silently "succeed".
    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || !toEmail || !fromEmail) {
      // Not configured yet — log so it's visible in server logs during setup,
      // but don't silently pretend to the visitor that it worked.
      console.error(
        "[contact] Missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL env vars. Submission was NOT delivered:",
        { name, email, business, service, message }
      );
      return NextResponse.json(
        {
          error:
            "The contact form isn't fully configured yet. Please email us directly for now.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email.trim(),
      subject: `New inquiry from ${name.trim()}${business ? ` (${business.trim()})` : ""}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        business ? `Business: ${business.trim()}` : null,
        service ? `Interested in: ${service}` : null,
        "",
        message?.trim() || "(no message provided)",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
