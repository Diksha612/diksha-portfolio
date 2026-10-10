import CertificateList from './CertificateList.jsx';

export default function CertificationCard({ course }) {
  return (
    <article className="card course-card">
      <h3>{course.title}</h3>
      <p>{course.provider}</p>
      {course.duration && <p className="muted small">Duration: {course.duration}</p>}
      <CertificateList entryId={course.id} />
    </article>
  );
}
