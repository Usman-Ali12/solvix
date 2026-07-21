"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/Toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim() ?? "";
    const password = data.get("password")?.toString() ?? "";

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    const next = searchParams.get("next");
    router.push(next && next.startsWith("/") ? next : "/dashboard");
    router.refresh();
  }

  return (
    <section className="pb-24 pt-40 md:pt-48">
      <div className="container-solvix flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="eyebrow text-center block">Welcome back</p>
            <h1 className="mt-4 font-display text-3xl font-semibold text-paper">
              Log in to your account
            </h1>
            <p className="mt-2 text-sm text-slate-soft">
              Access your dashboard, leads, and automations.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-slate-line bg-void-soft p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-medium text-slate-soft">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@business.com"
                className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
              />
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-medium text-slate-soft">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-white transition-all hover:bg-signal-light disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
              {!loading && <LogIn size={15} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
