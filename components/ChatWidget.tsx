"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type Message = { role: "bot" | "user"; text: string };

const suggestedPrompts = [
  "What services does Solvix offer?",
  "How much does a website cost?",
  "Can I book a free consultation?",
];

const placeholderReplies: Record<string, string> = {
  default:
    "Thanks for reaching out! I can help with questions about our websites, chatbots, and automation services, or get you booked in with the team. What would you like to know?",
  services:
    "We build business websites, AI chatbots, automation workflows, landing pages, and appointment booking systems. Which one is most relevant to your business right now?",
  cost: "Pricing depends on scope — most business websites start around $149/mo. Full pricing is on our Pricing page, or I can set up a free consultation to quote your specific needs.",
  book: "Great — I can pass your details to the team for a free 20-minute consultation. What's the best email to reach you at?",
};

function getReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("service") || lower.includes("offer"))
    return placeholderReplies.services;
  if (lower.includes("cost") || lower.includes("price") || lower.includes("much"))
    return placeholderReplies.cost;
  if (lower.includes("book") || lower.includes("consult") || lower.includes("call"))
    return placeholderReplies.book;
  return placeholderReplies.default;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi, I'm the Solvix assistant. Ask me about our services, pricing, or book a free consultation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function handleSend(text?: string) {
    const value = (text ?? input).trim();
    if (!value) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getReply(value) }]);
      setTyping(false);
    }, 900);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-4 flex h-[520px] w-[90vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-line bg-void-soft shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-line bg-void px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-signal/15 text-circuit">
                    <Sparkles size={15} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-paper">
                      Solvix Assistant
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-slate-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-circuit" />
                      Online now
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="text-slate-soft transition-colors hover:text-paper"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={clsxJoin(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.role === "bot"
                        ? "bg-void text-paper"
                        : "ml-auto bg-signal text-white"
                    )}
                  >
                    {m.text}
                  </div>
                ))}
                {typing && (
                  <div className="flex w-fit gap-1 rounded-2xl bg-void px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-soft [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-soft [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-soft" />
                  </div>
                )}

                {messages.length === 1 && (
                  <div className="flex flex-col gap-2 pt-2">
                    {suggestedPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleSend(p)}
                        className="rounded-full border border-slate-line px-3.5 py-2 text-left text-xs text-slate-soft transition-colors hover:border-circuit hover:text-circuit"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 border-t border-slate-line px-4 py-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-sm text-paper placeholder:text-slate-soft focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  aria-label="Send message"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-white transition-colors hover:bg-signal-light"
                >
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close chat assistant" : "Open chat assistant"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-white shadow-[0_8px_30px_rgba(59,91,255,0.45)]"
        >
          {open ? <X size={22} /> : <MessageSquare size={22} />}
        </motion.button>
      </div>
    </>
  );
}

function clsxJoin(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
