import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { siteConfig } from '../config/siteConfig.js';

export default function Contact() {
  return (
    <section id="contact" className="section alt" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading id="contact-title" title="Contact" />
        <div className="contact-grid">
          <div className="contact-info">
            <ul className="contact-list">
              <li><Mail size={20} aria-hidden="true" /><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
              <li><Phone size={20} aria-hidden="true" /><span>{siteConfig.phone}</span></li>
              <li><Linkedin size={20} aria-hidden="true" /><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn profile<span className="sr-only"> (opens in a new tab)</span></a></li>
              <li><Github size={20} aria-hidden="true" /><a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub profile<span className="sr-only"> (opens in a new tab)</span></a></li>
              <li><MapPin size={20} aria-hidden="true" /><span>{siteConfig.location}</span></li>
            </ul>
            <a className="btn btn-primary call-btn" href={siteConfig.phoneHref}><Phone size={18} aria-hidden="true" /> Call Me</a>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
