import SectionHeading from '../components/SectionHeading.jsx';
import EducationCard from '../components/EducationCard.jsx';
import { education } from '../data/education.js';

export default function Education() {
  return (
    <section id="education" className="section alt" aria-labelledby="education-title">
      <div className="container narrow">
        <SectionHeading id="education-title" title="Education" />
        <EducationCard data={education} />
      </div>
    </section>
  );
}
