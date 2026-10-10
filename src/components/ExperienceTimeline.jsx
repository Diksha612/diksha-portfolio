import CertificateList from './CertificateList.jsx';

export default function ExperienceTimeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li key={item.id} className="timeline-item">
          <h3>{item.role}</h3>
          <p className="org">{item.organization}</p>
          <p className="muted small">{item.dates}</p>
          {item.summary && <p>{item.summary}</p>}
          <CertificateList entryId={item.id} />
        </li>
      ))}
    </ol>
  );
}
