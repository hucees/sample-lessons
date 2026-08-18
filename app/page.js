import { grades, subjects } from "../data/curriculum";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">K–4 curriculum provider</p>
        <h1>Open House Sample Curriculum</h1>
        <p className="lede">
          A deliberately simple curriculum website built to test external curriculum
          discovery, repository parsing, normalization, and provider-hosted course links.
        </p>
        <div className="meta">
          <span className="pill">Grades K–4</span>
          <span className="pill">4 subjects per grade</span>
          <span className="pill">20 course pages</span>
          <span className="pill">36 weeks per course</span>
        </div>
        <p className="notice">
          This site contains sample curriculum structure and dummy instructional text.
          It is intended for testing only.
        </p>
      </section>

      <section>
        <h2>Browse by grade</h2>
        <div className="grid grade-grid">
          {grades.map((grade) => (
            <article className="card" key={grade.slug}>
              <p className="eyebrow">Grade {grade.short}</p>
              <h3>{grade.label}</h3>
              <p>{subjects.length} subjects available.</p>
              <a href={`/grades/${grade.slug}`}>View {grade.label} curriculum →</a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Subjects offered at every grade</h2>
        <div className="grid course-grid">
          {subjects.map((subject) => (
            <article className="card" key={subject.slug}>
              <h3>{subject.label}</h3>
              <p>Available for Kindergarten through 4th Grade.</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
