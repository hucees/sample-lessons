export const grades = [
  { slug: "kindergarten", short: "K", label: "Kindergarten" },
  { slug: "grade-1", short: "1", label: "1st Grade" },
  { slug: "grade-2", short: "2", label: "2nd Grade" },
  { slug: "grade-3", short: "3", label: "3rd Grade" },
  { slug: "grade-4", short: "4", label: "4th Grade" },
];

export const subjects = [
  {
    slug: "mathematics",
    code: "MATH",
    label: "Mathematics",
    units: [
      "Numbers & Counting",
      "Addition Concepts",
      "Subtraction Concepts",
      "Shapes & Geometry",
      "Measurement",
      "Place Value",
      "Patterns & Data",
      "Money & Time",
      "Review & Math Project",
    ],
  },
  {
    slug: "language-arts",
    code: "ELA",
    label: "Language Arts",
    units: [
      "Phonics & Word Study",
      "Reading Comprehension",
      "Vocabulary",
      "Grammar & Conventions",
      "Sentence Writing",
      "Narrative Writing",
      "Informational Text",
      "Speaking & Listening",
      "Review & Writing Portfolio",
    ],
  },
  {
    slug: "science",
    code: "SCI",
    label: "Science",
    units: [
      "Scientific Practices",
      "Life Science",
      "Plants & Animals",
      "Earth & Space",
      "Weather & Climate",
      "Matter & Materials",
      "Forces & Motion",
      "Environment & Habitats",
      "Review & Investigation",
    ],
  },
  {
    slug: "social-studies",
    code: "SS",
    label: "Social Studies",
    units: [
      "Families & Communities",
      "Geography & Maps",
      "Rules & Citizenship",
      "Past & Present",
      "Culture & Traditions",
      "Economics Basics",
      "Government & Leaders",
      "New Mexico & the United States",
      "Review & Community Project",
    ],
  },
];

export function getGrade(slug) {
  return grades.find((grade) => grade.slug === slug) ?? null;
}

export function getSubject(slug) {
  return subjects.find((subject) => subject.slug === slug) ?? null;
}

export function courseCode(grade, subject) {
  return `SAMPLE-${grade.short}-${subject.code}`;
}

export function buildCatalog() {
  return grades.flatMap((grade) =>
    subjects.map((subject) => ({
      course_key: courseCode(grade, subject),
      title: `${grade.label} ${subject.label}`,
      grade: grade.label,
      grade_slug: grade.slug,
      subject: subject.label,
      subject_slug: subject.slug,
      instructional_weeks: 36,
      days_per_week: 5,
      description: `Sample ${grade.label} ${subject.label} curriculum for external provider testing.`,
      path: `/grades/${grade.slug}/${subject.slug}`,
      units: subject.units.map((title, index) => ({
        unit_number: index + 1,
        title,
        weeks: `${index * 4 + 1}-${index * 4 + 4}`,
      })),
    })),
  );
}
