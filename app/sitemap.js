import { buildCatalog, grades } from "../data/curriculum";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const courses = buildCatalog();

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/catalog`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/curriculum.json`, changeFrequency: "monthly", priority: 0.8 },
    ...grades.map((grade) => ({
      url: `${base}/grades/${grade.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...courses.map((course) => ({
      url: `${base}${course.path}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
