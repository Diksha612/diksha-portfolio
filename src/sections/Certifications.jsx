import SectionHeading from '../components/SectionHeading.jsx';
import CertificationCard from '../components/CertificationCard.jsx';
import { courses } from '../data/education.js';

export default function Certifications() {
  return (
    <section id="certifications" className="section" aria-labelledby="cert-title">
      <div className="container narrow">
        <SectionHeading id="cert-title" title="Certifications" />
        <div className="stack">
          {courses.map((c) => <CertificationCard key={c.id} course={c} />)}
        </div>
      </div>
    </section>
  );
}
