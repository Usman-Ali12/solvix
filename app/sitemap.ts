import type { MetadataRoute } from "next";
import { templates } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/pricing", "/previews", "/portfolio", "/about", "/contact"];
  const previewRoutes = templates.map((t) => `/previews/${t.slug}`);

  return [...routes, ...previewRoutes].map((route) => ({
    url: `https://solvix.ai${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
