# Deploying Solvix to Vercel

## 1. Push this project to GitHub
```bash
cd solvix
git init
git add .
git commit -m "Initial commit"
```
Create a new repo on GitHub, then:
```bash
git remote add origin https://github.com/<your-username>/solvix.git
git branch -M main
git push -u origin main
```
(`.gitignore` already excludes `node_modules`, `.next`, and both `.env` files — your keys won't be committed.)

## 2. Import into Vercel
1. Go to vercel.com → **Add New → Project**.
2. Select the `solvix` GitHub repo you just pushed.
3. Framework preset should auto-detect as **Next.js** — leave build settings as default.

## 3. Add environment variables
In the Vercel project → **Settings → Environment Variables**, add each of these (values from your `.env.local`):

| Key | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API (publishable key) |
| `SUPABASE_SECRET_KEY` | Supabase → Project Settings → API (secret key — mark it "Sensitive" in Vercel) |
| `RESEND_API_KEY` | Resend → API Keys |
| `CONTACT_TO_EMAIL` | Your inbox address |
| `CONTACT_FROM_EMAIL` | An address on a domain verified in Resend |

Set each for **Production, Preview, and Development**.

## 4. Deploy
Click **Deploy**. Vercel builds and gives you a `*.vercel.app` URL immediately.

## 5. Connect solvix.ai (once ready)
Vercel project → **Settings → Domains** → add `solvix.ai` → follow the DNS records it gives you (usually an A record + CNAME, added wherever your domain is registered).

## 6. After deploying — Supabase redirect URLs
Supabase → Authentication → URL Configuration → add your Vercel URL (and later `solvix.ai`) to **Site URL** and **Redirect URLs**, or email confirmation links (`/auth/callback`) will redirect to `localhost` instead of your live site.
