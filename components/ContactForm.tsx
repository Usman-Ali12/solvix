"use client";

<<<<<<< HEAD
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/Toast";

const services = [
  "Business Website",
  "AI Chatbot",
  "AI Automation",
  "Landing Page",
  "Appointment Booking",
  "Not sure yet",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      business: data.get("business")?.toString() ?? "",
      service: data.get("service")?.toString() ?? "",
      message: data.get("message")?.toString() ?? "",
      company: data.get("company")?.toString() ?? "", // honeypot
=======
import { useState, type FormEvent } from "react";
import MagneticButton from "./MagneticButton";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      // honeypot — left empty by real visitors, hidden from view
      company_website: String(data.get("company_website") || ""),
>>>>>>> 3794f29 (Initial commit)
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
<<<<<<< HEAD
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      showToast(
        result?.message || "Message received — we'll follow up quickly.",
        "success"
      );
    } catch (err) {
      const messageText =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      showToast(messageText, "error");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-slate-line bg-void-soft px-8 py-16 text-center">
        <CheckCircle2 className="text-circuit" size={32} />
        <h3 className="mt-4 font-display text-xl font-semibold text-paper">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm text-slate-soft">
          Thanks for reaching out — your request has been captured and routed
          for a fast follow-up.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-slate-line bg-void-soft p-8"
    >
      {/* Honeypot — hidden from real users via CSS, bots fill it in and get silently ignored server-side */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-medium text-slate-soft">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Your name"
            className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-medium text-slate-soft">
            Email
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            placeholder="you@business.com"
            className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="business" className="text-xs font-medium text-slate-soft">
          Business name
        </label>
        <input
          id="business"
          name="business"
          type="text"
          placeholder="Your business"
          className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="service" className="text-xs font-medium text-slate-soft">
          What are you interested in?
        </label>
        <select
          id="service"
          name="service"
          className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper focus:border-circuit"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-medium text-slate-soft">
          Tell us about your business
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What's slowing you down right now?"
          className="resize-none rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-white transition-all hover:bg-signal-light disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send message"}
        {!loading && <Send size={15} />}
      </button>
    </form>
  );
}

=======
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Try again later.");
        return;
      }

      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Honeypot field — visually hidden, real users never touch it */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required minLength={2} maxLength={80} placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required maxLength={200} placeholder="you@company.com" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required minLength={10} maxLength={2000} placeholder="What are you looking to automate?" />
      </div>

      <div className="form-footer">
        <MagneticButton type="submit" className="btn btn-primary btn-lg">
          {status === "sending" ? "Sending…" : "Send message"}
        </MagneticButton>

        {status === "ok" && <span className="form-status ok">Sent. We&rsquo;ll reply from info@solvixsolution.com.</span>}
        {status === "error" && <span className="form-status err">{errorMsg}</span>}
      </div>
    </form>
  );
}
>>>>>>> 3794f29 (Initial commit)
