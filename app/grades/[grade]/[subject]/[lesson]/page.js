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
} from "../../../../../data/curriculum";

function parseWeekSlug(
  value,
) {
  const match =
    /^week-(\d{1,2})$/.exec(
      value ?? "",
    );

  if (!match) {
    return null;
  }

  const weekNumber =
    Number(
      match[1],
    );

  if (
    !Number.isInteger(
      weekNumber,
    ) ||
    weekNumber < 1 ||
    weekNumber > 36
  ) {
    return null;
  }

  return weekNumber;
}

export function generateStaticParams() {
  return grades.flatMap(
    (grade) =>
      subjects.flatMap(
        (subject) =>
          buildCourseWeeks(
            grade,
            subject,
          ).map(
            (lesson) => ({
              grade:
                grade.slug,

              subject:
                subject.slug,

              lesson:
                `week-${lesson.week_number}`,
            }),
          ),
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

    lesson:
      lessonSlug,
  } = await params;

  const grade =
    getGrade(
      gradeSlug,
    );

  const subject =
    getSubject(
      subjectSlug,
    );

  const weekNumber =
    parseWeekSlug(
      lessonSlug,
    );

  if (
    !grade ||
    !subject ||
    weekNumber === null
  ) {
    return {};
  }

  const lesson =
    buildCourseWeeks(
      grade,
      subject,
    ).find(
      (item) =>
        item.week_number ===
        weekNumber,
    );

  if (!lesson) {
    return {};
  }

  return {
    title:
      `${grade.label} ${subject.label} — ${lesson.title} | Open House Sample Curriculum`,

    description:
      `Provider-hosted sample lesson for ${grade.label} ${subject.label}, Week ${weekNumber}.`,
  };
}

export default async function WeeklyLessonPage({
  params,
}) {
  const {
    grade:
      gradeSlug,

    subject:
      subjectSlug,

    lesson:
      lessonSlug,
  } = await params;

  const grade =
    getGrade(
      gradeSlug,
    );

  const subject =
    getSubject(
      subjectSlug,
    );

  const weekNumber =
    parseWeekSlug(
      lessonSlug,
    );

  if (
    !grade ||
    !subject ||
    weekNumber === null
  ) {
    notFound();
  }

  const lessons =
    buildCourseWeeks(
      grade,
      subject,
    );

  const lesson =
    lessons.find(
      (item) =>
        item.week_number ===
        weekNumber,
    );

  if (!lesson) {
    notFound();
  }

  const code =
    courseCode(
      grade,
      subject,
    );

  const previous =
    lessons.find(
      (item) =>
        item.week_number ===
        weekNumber - 1,
    ) ?? null;

  const next =
    lessons.find(
      (item) =>
        item.week_number ===
        weekNumber + 1,
    ) ?? null;

  const jsonLd = {
    "@context":
      "https://schema.org",

    "@type":
      "LearningResource",

    name:
      `${grade.label} ${subject.label} — ${lesson.title}`,

    educationalLevel:
      grade.label,

    learningResourceType:
      "Lesson",

    isPartOf: {
      "@type":
        "Course",

      name:
        `${grade.label} ${subject.label}`,

      identifier:
        code,
    },
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

        <a
          href={
            `/grades/${grade.slug}/${subject.slug}`
          }
        >
          {subject.label}
        </a>

        {" / "}

        Week
        {" "}
        {weekNumber}
      </div>

      <p className="eyebrow">
        {code}
        {" · "}
        Unit
        {" "}
        {lesson.unit_number}
        {" · "}
        Week
        {" "}
        {weekNumber}
      </p>

      <main>
        <article
          data-lesson
          data-week={
            weekNumber
          }
        >
          <h1>
            {lesson.title}
          </h1>

          <p className="lede">
            Provider-hosted weekly lesson
            for
            {" "}
            {grade.label}
            {" "}
            {subject.label}.
          </p>

          <div className="meta">
            <span className="pill">
              Week
              {" "}
              {weekNumber}
              {" "}
              of 36
            </span>

            <span className="pill">
              Unit
              {" "}
              {lesson.unit_number}
              {": "}
              {lesson.unit_title}
            </span>
          </div>

          <section>
            <h2>
              Lesson Focus
            </h2>

            <p>
              Dummy instructional lesson
              content for
              {" "}
              {grade.label}
              {" "}
              {subject.label},
              {" "}
              Week
              {" "}
              {weekNumber}.
              Students practice
              age-appropriate skills
              connected to
              {" "}
              {lesson.unit_title}.
            </p>
          </section>

          <section>
            <h2>
              Practice
            </h2>

            <p>
              Complete a short guided
              practice activity connected
              to this week&apos;s topic.
              This placeholder text exists
              so Open House can test
              provider-hosted lesson
              extraction without storing
              canonical instructional
              bodies.
            </p>
          </section>

          <section>
            <h2>
              Check for Understanding
            </h2>

            <p>
              Explain one idea you learned
              this week and give one
              example using the lesson
              topic.
            </p>
          </section>
        </article>
      </main>

      <nav
        aria-label="Lesson navigation"
      >
        {previous ? (
          <a
            rel="prev"
            href={
              previous.path
            }
          >
            Previous:
            {" "}
            {previous.title}
          </a>
        ) : null}

        {previous && next
          ? " · "
          : null}

        {next ? (
          <a
            rel="next"
            data-next
            href={
              next.path
            }
          >
            Next:
            {" "}
            {next.title}
          </a>
        ) : null}
      </nav>
    </>
  );
}
