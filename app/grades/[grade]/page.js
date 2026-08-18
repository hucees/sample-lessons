import { notFound } from "next/navigation";
import { grades, subjects, getGrade, courseCode } from "../../../data/curriculum";

export function generateStaticParams() {
  return grades.map((grade) => ({ grade: grade.slug }));
}

export async function generateMetadata({ params }) {
  const { grade: gradeSlug } = await params;
  const grade = getGrade(gradeSlug);
  return grade ? { title: `${grade.label} Curriculum | Open House Sample Curriculum` } : {};
}

export default async function GradePage({ params }) {
  const { grade: gradeSlug } = await params;
  const grade = getGrade(gradeSlug);
  if (!grade) notFound();

  return (
    <>
      <div className="breadcrumbs"><a href="/">Home</a> / {grade.label}</div>
      <p className="eyebrow">Grade catalog</p>
      <h1>{grade.label} Curriculum</h1>
      <p className="lede">
        Four sample subjects for {grade.label}. Each subject opens to its own
        36-week provider-hosted course page.
      </p>

      <div className="grid course-grid">
        {subjects.map((subject) => (
          <article className="card" key={subject.slug} data-course-key={courseCode(grade, subject)}>
            <p className="eyebrow">{courseCode(grade, subject)}</p>
            <h2>{grade.label} {subject.label}</h2>
            <p>Sample course structure with nine four-week units.</p>
            <a href={`/grades/${grade.slug}/${subject.slug}`}>
              View {subject.label} →
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
