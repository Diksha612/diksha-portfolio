import SectionHeading from '../components/SectionHeading.jsx';
import ExperienceTimeline from '../components/ExperienceTimeline.jsx';
import { experience } from '../data/experience.js';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container narrow">
        <SectionHeading id="experience-title" title="Experience" />
        <ExperienceTimeline items={experience} />
      </div>
    </section>
  );
}
