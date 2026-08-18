import { notFound } from "next/navigation";
import {
  grades,
  subjects,
  getGrade,
  getSubject,
  courseCode,
} from "../../../../data/curriculum";

export function generateStaticParams() {
  return grades.flatMap((grade) =>
    subjects.map((subject) => ({
      grade: grade.slug,
      subject: subject.slug,
    })),
  );
}

export async function generateMetadata({ params }) {
  const { grade: gradeSlug, subject: subjectSlug } = await params;
  const grade = getGrade(gradeSlug);
  const subject = getSubject(subjectSlug);
  if (!grade || !subject) return {};

  return {
    title: `${grade.label} ${subject.label} | Open House Sample Curriculum`,
    description: `Sample 36-week ${grade.label} ${subject.label} curriculum.`,
  };
}

export default async function CoursePage({ params }) {
  const { grade: gradeSlug, subject: subjectSlug } = await params;
  const grade = getGrade(gradeSlug);
  const subject = getSubject(subjectSlug);

  if (!grade || !subject) notFound();

  const code = courseCode(grade, subject);
  const canonicalPath = `/grades/${grade.slug}/${subject.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${grade.label} ${subject.label}`,
    description: `Sample ${grade.label} ${subject.label} curriculum for external provider testing.`,
    provider: {
      "@type": "Organization",
      name: "Open House Sample Curriculum",
    },
    educationalLevel: grade.label,
    identifier: code,
    url: canonicalPath,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="breadcrumbs">
        <a href="/">Home</a> / <a href={`/grades/${grade.slug}`}>{grade.label}</a> / {subject.label}
      </div>

      <p className="eyebrow">{code}</p>
      <h1>{grade.label} {subject.label}</h1>
      <p className="lede">
        Sample 36-week {grade.label} {subject.label} curriculum. The instructional
        paragraphs are dummy text, but the grade, subject, course, and unit headings
        are intentionally clear for external curriculum parsing tests.
      </p>

      <div className="meta">
        <span className="pill">Grade: {grade.label}</span>
        <span className="pill">Subject: {subject.label}</span>
        <span className="pill">36 instructional weeks</span>
        <span className="pill">5 days per week</span>
      </div>

      <section>
        <h2>Course Overview</h2>
        <p>
          This provider-hosted sample course is organized into nine units. Each unit
          represents four instructional weeks. Lesson content below is placeholder
          text so the site can be used safely for ingestion and discovery testing.
        </p>
      </section>

      <section>
        <h2>{grade.label} {subject.label} Units</h2>
        <div className="unit-list">
          {subject.units.map((title, index) => {
            const startWeek = index * 4 + 1;
            const endWeek = startWeek + 3;

            return (
              <article className="unit" key={title}>
                <p className="eyebrow">Weeks {startWeek}–{endWeek}</p>
                <h3>Unit {index + 1}: {title}</h3>
                <p>
                  Dummy instructional content for {grade.label} {subject.label},
                  Unit {index + 1}. Students practice age-appropriate skills connected
                  to the unit heading. Replace this paragraph with real curriculum
                  content if desired.
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
