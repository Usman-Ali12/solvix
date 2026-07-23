import { NextRequest, NextResponse } from "next/server";

// Uses Google's Gemini API (free tier: no credit card required, ~1,500
// requests/day on gemini-2.5-flash as of 2026). Get a key at
// https://aistudio.google.com/apikey and set it as GEMINI_API_KEY in
// .env.local (and in your hosting provider's env vars for production).

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are the Solvix Assistant, the chat widget on the Solvix Solutions website.

Solvix Solutions builds premium websites, AI chatbots, and automation for local service businesses (dental clinics, gyms, restaurants, real estate agencies, law firms, and similar local businesses).

Services offered:
- Business websites — fast, polished sites built to convert visitors
- AI chatbots — answer customer questions and capture leads 24/7
- AI automation — connect tools so quotes, follow-ups, and reminders send themselves
- Landing pages for campaigns and paid ad traffic
- Appointment booking systems synced to the business's calendar
- CSR support & dispatch — an AI receptionist for trades/field service teams

Pricing: most business websites start around $149/mo. Full pricing is on the Pricing page. For anything specific, offer to set up a free consultation.

Contact: +92 304 8876558 (WhatsApp), info@solvixsolution.com

Tone: warm, direct, confident — a helpful person on the team, not a generic corporate bot. Keep replies short (2-4 sentences), plain language, no bullet-point walls unless the user asks for a list. Never invent client names, stats, or guarantees you're not told above. If asked something you don't know (exact timelines, a specific client's setup, legal/contract questions), say so honestly and offer to connect them with the team instead of making something up.`;

const FALLBACK_REPLY =
  "Sorry, I'm having trouble connecting right now. You can reach the team directly on WhatsApp at +92 304 8876558, or use the contact form and we'll get back to you shortly.";

type IncomingMessage = { role: "bot" | "user"; text: string };

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const { messages } = (await req.json()) as { messages: IncomingMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Basic abuse guard: cap history length and individual message size.
    const trimmed = messages.slice(-12);
    const lastUserMessage = trimmed[trimmed.length - 1]?.text ?? "";
    if (lastUserMessage.length > 1000) {
      return NextResponse.json({
        reply: "That message is a bit long for the chat widget — could you shorten it, or use the contact form instead?",
      });
    }

    const contents = trimmed.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: 220,
          temperature: 0.6,
        },
      }),
      // Gemini free tier can occasionally be slow under load — fail fast
      // rather than leaving the widget's typing indicator spinning forever.
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const data = await response.json();
    const reply: string | undefined =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return NextResponse.json({ reply: reply || FALLBACK_REPLY });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}