import { Github } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <article className="card project-card">
      <div className="project-visual" aria-hidden="true">
        {project.technologies.map((t) => <span key={t}>{t}</span>)}
      </div>
      <h3>{project.name}</h3>
      <p>{project.overview}</p>
      <ul className="chips">
        {project.technologies.map((t) => <li key={t} className="chip">{t}</li>)}
      </ul>
      <a className="btn btn-outline btn-sm" href={project.repo} target="_blank" rel="noopener noreferrer">
        <Github size={16} aria-hidden="true" /> GitHub
        <span className="sr-only"> repository for {project.name} (opens in a new tab)</span>
      </a>
    </article>
  );
}
