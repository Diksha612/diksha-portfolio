export default function SectionHeading({ id, title, subtitle }) {
  return (
    <header className="section-heading">
      <h2 id={id}>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
