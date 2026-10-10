import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectFilters from '../components/ProjectFilters.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  const [selected, setSelected] = useState([]);
  const options = useMemo(() => [...new Set(projects.flatMap((p) => p.technologies))], []);
  const visible = useMemo(
    () => projects.filter((p) => selected.every((t) => p.technologies.includes(t))),
    [selected]
  );
  const toggle = (t) => setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  return (
    <section id="projects" className="section alt" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" title="Projects" />
        <ProjectFilters options={options} selected={selected} onToggle={toggle} onReset={() => setSelected([])} count={visible.length} total={projects.length} />
        {visible.length ? (
          <div className="projects-grid">
            {visible.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <div className="card empty" role="status">
            <p>No project uses all of the selected technologies together.</p>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelected([])}>All Projects</button>
          </div>
        )}
      </div>
    </section>
  );
}
