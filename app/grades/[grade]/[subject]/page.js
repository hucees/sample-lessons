import {
  notFound,
} from "next/navigation";

import {
  grades,
  subjects,
  getGrade,
  getSubject,
  courseCode,
  buildCourseWeeks,
} from "../../../../data/curriculum";

export function generateStaticParams() {
  return grades.flatMap(
    (grade) =>
      subjects.map(
        (subject) => ({
          grade:
            grade.slug,

          subject:
            subject.slug,
        }),
      ),
  );
}

export async function generateMetadata({
  params,
}) {
  const {
    grade:
      gradeSlug,

    subject:
      subjectSlug,
  } = await params;

  const grade =
    getGrade(
      gradeSlug,
    );

  const subject =
    getSubject(
      subjectSlug,
    );

  if (
    !grade ||
    !subject
  ) {
    return {};
  }

  return {
    title:
      `${grade.label} ${subject.label} | Open House Sample Curriculum`,

    description:
      `Sample 36-week ${grade.label} ${subject.label} curriculum.`,
  };
}

export default async function CoursePage({
  params,
}) {
  const {
    grade:
      gradeSlug,

    subject:
      subjectSlug,
  } = await params;

  const grade =
    getGrade(
      gradeSlug,
    );

  const subject =
    getSubject(
      subjectSlug,
    );

  if (
    !grade ||
    !subject
  ) {
    notFound();
  }

  const code =
    courseCode(
      grade,
      subject,
    );

  const canonicalPath =
    `/grades/${grade.slug}/${subject.slug}`;

  const lessons =
    buildCourseWeeks(
      grade,
      subject,
    );

  const jsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "Course",

    name:
      `${grade.label} ${subject.label}`,

    description:
      `Sample ${grade.label} ${subject.label} curriculum for external provider testing.`,

    provider: {
      "@type":
        "Organization",

      name:
        "Open House Sample Curriculum",
    },

    educationalLevel:
      grade.label,

    identifier:
      code,

    url:
      canonicalPath,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              jsonLd,
            ),
        }}
      />

      <div className="breadcrumbs">
        <a href="/">
          Home
        </a>
        {" / "}
        <a
          href={
            `/grades/${grade.slug}`
          }
        >
          {grade.label}
        </a>
        {" / "}
        {subject.label}
      </div>

      <p className="eyebrow">
        {code}
      </p>

      <h1>
        {grade.label}
        {" "}
        {subject.label}
      </h1>

      <p className="lede">
        Sample 36-week
        {" "}
        {grade.label}
        {" "}
        {subject.label}
        {" "}
        curriculum. Each instructional
        week below has its own stable
        provider-hosted lesson URL for
        external curriculum parsing,
        manifest generation, and live
        lesson delivery testing.
      </p>

      <div className="meta">
        <span className="pill">
          Grade: {grade.label}
        </span>

        <span className="pill">
          Subject: {subject.label}
        </span>

        <span className="pill">
          36 instructional weeks
        </span>

        <span className="pill">
          5 days per week
        </span>
      </div>

      <section>
        <h2>
          Course Overview
        </h2>

        <p>
          This provider-hosted sample
          course is organized into nine
          units. Each unit contains four
          provider-hosted weekly lessons.
          The lesson text is intentionally
          dummy instructional content so
          Open House can safely test
          discovery, manifests, and live
          external lesson rendering.
        </p>
      </section>

      <section>
        <h2>
          {grade.label}
          {" "}
          {subject.label}
          {" "}
          Units
        </h2>

        <div className="unit-list">
          {subject.units.map(
            (
              title,
              index,
            ) => {
              const unitNumber =
                index + 1;

              const startWeek =
                index * 4 + 1;

              const endWeek =
                startWeek + 3;

              const unitLessons =
                lessons.filter(
                  (lesson) =>
                    lesson.unit_number ===
                    unitNumber,
                );

              return (
                <article
                  className="unit"
                  key={title}
                >
                  <p className="eyebrow">
                    Weeks
                    {" "}
                    {startWeek}
                    {"–"}
                    {endWeek}
                  </p>

                  <h3>
                    Unit
                    {" "}
                    {unitNumber}
                    {": "}
                    {title}
                  </h3>

                  <p>
                    Dummy unit overview
                    for
                    {" "}
                    {grade.label}
                    {" "}
                    {subject.label},
                    {" "}
                    Unit
                    {" "}
                    {unitNumber}.
                  </p>

                  <ol>
                    {unitLessons.map(
                      (
                        lesson,
                      ) => (
                        <li
                          key={
                            lesson.lesson_key
                          }
                        >
                          <a
                            className="lesson"
                            data-week={
                              lesson.week_number
                            }
                            href={
                              lesson.path
                            }
                          >
                            {
                              lesson.title
                            }
                          </a>
                        </li>
                      ),
                    )}
                  </ol>
                </article>
              );
            },
          )}
        </div>
      </section>
    </>
  );
}
