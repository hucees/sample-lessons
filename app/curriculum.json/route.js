import { buildCatalog } from "../../data/curriculum";

export function GET(request) {
  const base = new URL(request.url).origin;
  const courses = buildCatalog().map((course) => ({
    ...course,
    url: `${base}${course.path}`,
  }));

  return Response.json({
    schema_version: 1,
    provider: {
      key: "open_house_sample_provider",
      name: "Open House Sample Curriculum",
      type: "sample_external_provider",
    },
    catalog: {
      grade_range: "K-4",
      subject_count_per_grade: 4,
      course_count: courses.length,
      courses,
    },
  });
}
