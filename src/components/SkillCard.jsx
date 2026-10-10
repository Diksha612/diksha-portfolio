import { Code2, Database, GitBranch, Smartphone } from 'lucide-react';

const icons = { Code2, Database, GitBranch, Smartphone };

export default function SkillCard({ category }) {
  const Icon = icons[category.icon] || Code2;
  return (
    <article className="card skill-card">
      <Icon size={26} className="accent" aria-hidden="true" />
      <h3>{category.title}</h3>
      <ul className="chips">
        {category.items.map((i) => <li key={i} className="chip">{i}</li>)}
      </ul>
    </article>
  );
}
