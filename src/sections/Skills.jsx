import SectionHeading from '../components/SectionHeading.jsx';
import SkillCard from '../components/SkillCard.jsx';
import { skillCategories } from '../data/skills.js';

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" title="Skills" />
        <div className="skills-grid">
          {skillCategories.map((c) => <SkillCard key={c.id} category={c} />)}
        </div>
      </div>
    </section>
  );
}
