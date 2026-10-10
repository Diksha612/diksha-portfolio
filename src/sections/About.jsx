import SectionHeading from '../components/SectionHeading.jsx';

export default function About() {
  return (
    <section id="about" className="section alt" aria-labelledby="about-title">
      <div className="container narrow">
        <SectionHeading id="about-title" title="About" />
        <p>
          I'm a Computer Engineering graduate (BE, University of Mumbai, 2026). I program in Java and Python and
          work with MySQL, MongoDB and SQL for data storage, using Git and GitHub for version control.
        </p>
        <p>
          My software experience spans academic and personal projects as well as internships in Java full stack
          development, Microsoft Azure and web development. I enjoy building practical applications and 
          continuing to strengthen my software development skills.
        </p>
      </div>
    </section>
  );
}
