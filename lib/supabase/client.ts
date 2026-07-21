import { createBrowserClient } from "@supabase/ssr";

/**
 * Use in Client Components ("use client") — e.g. login/signup forms,
 * logout buttons. For Server Components/Route Handlers, use
 * lib/supabase/server.ts instead.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
