import {
  buildCatalog,
} from "../../data/curriculum";

export function GET(
  request,
) {
  const base =
    new URL(
      request.url,
    ).origin;

  const courses =
    buildCatalog().map(
      (course) => ({
        ...course,

        url:
          `${base}${course.path}`,

        lessons:
          course.lessons.map(
            (lesson) => ({
              ...lesson,

              url:
                `${base}${lesson.path}`,
            }),
          ),
      }),
    );

  return Response.json({
    schema_version:
      2,

    provider: {
      key:
        "open_house_sample_provider",

      name:
        "Open House Sample Curriculum",

      type:
        "sample_external_provider",
    },

    catalog: {
      grade_range:
        "K-4",

      subject_count_per_grade:
        4,

      course_count:
        courses.length,

      lesson_count:
        courses.reduce(
          (
            total,
            course,
          ) =>
            total +
            course.lessons.length,
          0,
        ),

      courses,
    },
  });
}
