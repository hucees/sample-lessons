import { buildCatalog } from "../../data/curriculum";

export const metadata = {
  title: "Curriculum Catalog | Open House Sample Curriculum",
};

export default function CatalogPage() {
  const courses = buildCatalog();

  return (
    <>
      <p className="eyebrow">Full catalog</p>
      <h1>K–4 Curriculum Catalog</h1>
      <p className="lede">
        Twenty sample provider-hosted courses. Each course has its own stable URL,
        title, grade, subject, and 36-week unit structure.
      </p>

      <div className="grid course-grid">
        {courses.map((course) => (
          <article className="card" key={course.course_key} data-course-key={course.course_key}>
            <p className="eyebrow">{course.grade} · {course.subject}</p>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className="meta">
              <span className="pill">36 weeks</span>
              <span className="pill">5 days/week</span>
            </div>
            <a href={course.path}>Open course →</a>
          </article>
        ))}
      </div>
    </>
  );
}
