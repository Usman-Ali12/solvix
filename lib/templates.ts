export type PreviewTemplate = {
  slug: string;
  niche: string;
  businessName: string;
  tagline: string;
  heroLine: string;
  accent: string; // tailwind gradient classes for this template's hero
  turnaround: string;
  services: { title: string; description: string }[];
  testimonial: { quote: string; name: string };
  stats: { label: string; value: string }[];
};

export const templates: PreviewTemplate[] = [
  {
    slug: "field-service",
    niche: "Field Service & Trades",
    businessName: "QuickFix HVAC",
    tagline: "24/7 emergency repairs, dispatched in minutes.",
    heroLine: "Heating and cooling repair your neighbors already trust.",
    accent: "from-signal/50 via-circuit/20 to-transparent",
    turnaround: "Ready in 3–5 days",
    services: [
      { title: "Emergency AC & Heating Repair", description: "Same-day service, dispatched to the nearest available technician." },
      { title: "Installation & Replacement", description: "Free quotes on new systems with financing options available." },
      { title: "Maintenance Plans", description: "Seasonal tune-ups that catch problems before they become breakdowns." },
    ],
    testimonial: { quote: "They picked up at 11pm on a Sunday and had someone at our door in 40 minutes.", name: "Homeowner, verified customer" },
    stats: [
      { label: "Avg. response time", value: "24 min" },
      { label: "Jobs completed", value: "3,400+" },
      { label: "Rating", value: "4.9★" },
    ],
  },
  {
    slug: "dental-medical",
    niche: "Dental & Medical",
    businessName: "Bright Smile Dental",
    tagline: "Gentle, modern dental care for the whole family.",
    heroLine: "A dental visit you won't dread.",
    accent: "from-circuit/40 via-signal/20 to-transparent",
    turnaround: "Ready in 4–6 days",
    services: [
      { title: "General & Preventive Care", description: "Cleanings, checkups, and exams in a calm, modern office." },
      { title: "Cosmetic Dentistry", description: "Whitening, veneers, and smile makeovers tailored to you." },
      { title: "Emergency Appointments", description: "Same-day slots held open for urgent dental pain." },
    ],
    testimonial: { quote: "Booked online in under a minute and got a same-week appointment.", name: "Patient, verified visit" },
    stats: [
      { label: "New patients / mo", value: "60+" },
      { label: "5-star reviews", value: "310" },
      { label: "Years serving area", value: "12" },
    ],
  },
  {
    slug: "fitness",
    niche: "Gyms & Fitness Studios",
    businessName: "IronForge Gym",
    tagline: "Train harder. Recover smarter. Results that show.",
    heroLine: "Your strongest year starts here.",
    accent: "from-signal/40 via-circuit/30 to-transparent",
    turnaround: "Ready in 3–5 days",
    services: [
      { title: "Strength & Conditioning", description: "Coach-led group classes for every experience level." },
      { title: "Personal Training", description: "1-on-1 programs built around your goals and schedule." },
      { title: "Open Gym Access", description: "24/7 badge entry for members on any plan." },
    ],
    testimonial: { quote: "Signed up for a trial class online and never looked back — six months in now.", name: "Member since 2025" },
    stats: [
      { label: "Active members", value: "850+" },
      { label: "Classes / week", value: "40" },
      { label: "Trial sign-ups / mo", value: "70" },
    ],
  },
  {
    slug: "real-estate",
    niche: "Real Estate",
    businessName: "Coastal Real Estate Group",
    tagline: "Local expertise. Serious buyers only.",
    heroLine: "Find a home that actually fits your life.",
    accent: "from-signal-dim/50 via-circuit/15 to-transparent",
    turnaround: "Ready in 4–6 days",
    services: [
      { title: "Buyer Representation", description: "AI pre-qualification so agents only speak to serious buyers." },
      { title: "Listing Management", description: "New listings pushed instantly to interested subscribers." },
      { title: "Market Valuations", description: "Free instant home value estimates for sellers." },
    ],
    testimonial: { quote: "Got an alert the morning a listing went live and made an offer that afternoon.", name: "Buyer, closed 2026" },
    stats: [
      { label: "Active listings", value: "38" },
      { label: "Avg. days on market", value: "19" },
      { label: "Closed deals (2026)", value: "112" },
    ],
  },
  {
    slug: "legal",
    niche: "Law Firms",
    businessName: "Raza & Co. Law",
    tagline: "Straightforward legal advice, no jargon.",
    heroLine: "Clear guidance when it matters most.",
    accent: "from-circuit/25 via-signal/35 to-transparent",
    turnaround: "Ready in 5–7 days",
    services: [
      { title: "Family & Civil Law", description: "Confidential consultations, in person or by video." },
      { title: "Business Law", description: "Contracts, formation, and dispute support for local businesses." },
      { title: "Free Case Review", description: "A confidential AI intake to understand your situation before you call." },
    ],
    testimonial: { quote: "The intake chatbot took my case details late at night and someone called me first thing.", name: "Client, family law" },
    stats: [
      { label: "Cases handled", value: "500+" },
      { label: "Consultation response", value: "< 24h" },
      { label: "Years practicing", value: "15" },
    ],
  },
  {
    slug: "restaurant",
    niche: "Restaurants & Cafés",
    businessName: "Copper Kettle Café",
    tagline: "Slow food, fast service.",
    heroLine: "Come for the coffee. Stay for everything else.",
    accent: "from-signal/35 via-circuit/25 to-transparent",
    turnaround: "Ready in 3–5 days",
    services: [
      { title: "Online Reservations", description: "Book a table in seconds, synced to real-time availability." },
      { title: "Seasonal Menu", description: "Menu updates automatically without touching any code." },
      { title: "Catering Inquiries", description: "A simple form that routes straight to the events team." },
    ],
    testimonial: { quote: "We stopped losing weekend reservations to phone tag the week this launched.", name: "Owner, Copper Kettle" },
    stats: [
      { label: "Reservations / week", value: "220" },
      { label: "Repeat customers", value: "64%" },
      { label: "Avg. rating", value: "4.8★" },
    ],
  },
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}
