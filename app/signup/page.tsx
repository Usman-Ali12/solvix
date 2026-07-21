"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/Toast";

export default function SignupPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const fullName = data.get("fullName")?.toString().trim() ?? "";
    const businessName = data.get("businessName")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const password = data.get("password")?.toString() ?? "";

    const supabase = createClient();
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, business_name: businessName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    // If email confirmation is required, there's no session yet — show a
    // "check your email" state instead of redirecting to a page that will
    // just bounce them back to /login.
    if (!signUpData.session) {
      setCheckEmail(true);
      return;
    }

    showToast("Account created — welcome to Solvix.", "success");
    router.push("/dashboard");
    router.refresh();
  }

  if (checkEmail) {
    return (
      <section className="pb-24 pt-40 md:pt-48">
        <div className="container-solvix flex justify-center">
          <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-slate-line bg-void-soft px-8 py-16 text-center">
            <MailCheck className="text-circuit" size={32} />
            <h1 className="mt-4 font-display text-xl font-semibold text-paper">
              Check your email
            </h1>
            <p className="mt-2 max-w-sm text-sm text-slate-soft">
              We&apos;ve sent a confirmation link to finish setting up your
              account. Once confirmed, you can log in.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-24 pt-40 md:pt-48">
      <div className="container-solvix flex justify-center">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="eyebrow text-center block">Get started</p>
            <h1 className="mt-4 font-display text-3xl font-semibold text-paper">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-soft">
              Set up access to your Solvix dashboard.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-slate-line bg-void-soft p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-xs font-medium text-slate-soft">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Your name"
                className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
              />
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="businessName" className="text-xs font-medium text-slate-soft">
                Business name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Your business"
                className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
              />
            </div>

            <div className="mt-5 flex flex-col gap-2">
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
                minLength={6}
                placeholder="At least 6 characters"
                className="rounded-lg border border-slate-line bg-void px-4 py-2.5 text-sm text-paper placeholder:text-slate-soft focus:border-circuit"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-white transition-all hover:bg-signal-light disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <UserPlus size={15} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-soft">
            Already have an account?{" "}
            <Link href="/login" className="text-circuit hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
