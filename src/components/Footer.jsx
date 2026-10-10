import { Github, Linkedin } from 'lucide-react';
import { siteConfig } from '../config/siteConfig.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>Copyright © 2026 {siteConfig.name}</p>
        <div className="footer-links">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)"><Github size={20} aria-hidden="true" /></a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><Linkedin size={20} aria-hidden="true" /></a>
          <a href="#home">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
