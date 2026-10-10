import { X } from 'lucide-react';

export default function ProjectFilters({ options, selected, onToggle, onReset, count, total }) {
  return (
    <div className="filters">
      <div role="group" aria-label="Filter projects by technology" className="chips">
        {options.map((t) => (
          <button key={t} type="button" className={`chip chip-btn${selected.includes(t) ? ' on' : ''}`} aria-pressed={selected.includes(t)} onClick={() => onToggle(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="filter-status">
        {selected.length > 0 && (
          <ul className="chips" aria-label="Selected filters">
            {selected.map((t) => (
              <li key={t} className="chip chip-selected">
                {t}
                <button type="button" onClick={() => onToggle(t)} aria-label={`Remove ${t} filter`}><X size={14} aria-hidden="true" /></button>
              </li>
            ))}
          </ul>
        )}
        <p role="status" aria-live="polite" className="muted small">Showing {count} of {total} projects</p>
        <button type="button" className="btn btn-outline btn-sm" onClick={onReset} disabled={!selected.length}>All Projects</button>
      </div>
    </div>
  );
}
