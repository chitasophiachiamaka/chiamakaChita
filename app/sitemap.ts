import type { MetadataRoute } from "next";
import { projectDetails } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [{ url: base, changeFrequency: "monthly", priority: 1 }, { url: `${base}/resume`, changeFrequency: "yearly", priority: 0.5 }, ...projectDetails.map((project) => ({ url: `${base}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }))];
}
