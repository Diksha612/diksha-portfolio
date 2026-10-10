import { GraduationCap } from 'lucide-react';

export default function EducationCard({ data }) {
  return (
    <article className="card education-card">
      <GraduationCap size={28} className="accent" aria-hidden="true" />
      <div>
        <h3>{data.degree}</h3>
        <p>{data.institution}</p>
        <p className="muted">{data.university}</p>
        <dl className="facts">
          <div><dt>Graduation year</dt><dd>{data.graduationYear}</dd></div>
          <div><dt>CGPI</dt><dd>{data.cgpi}</dd></div>
        </dl>
      </div>
    </article>
  );
}
