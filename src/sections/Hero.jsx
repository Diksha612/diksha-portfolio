import { useState } from 'react';
import { Download, FolderGit2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig.js';

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const { resume } = siteConfig;
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        {photoFailed ? (
          <div className="avatar avatar-fallback" role="img" aria-label={`${siteConfig.name} initials`}>{siteConfig.initials}</div>
        ) : (
          <img className="avatar" src={siteConfig.profilePhoto} alt={`Portrait of ${siteConfig.name}`} width="176" height="176" onError={() => setPhotoFailed(true)} />
        )}
        <h1 id="hero-title">{siteConfig.name}</h1>
        <p className="hero-role">{siteConfig.title}</p>
        <p className="hero-tagline">“{siteConfig.tagline}”</p>
        <p className="hero-intro">{siteConfig.intro}</p>
        <div className="hero-buttons">
          <a className="btn btn-primary" href="#projects"><FolderGit2 size={18} aria-hidden="true" /> View Projects</a>
          {resume.enabled && (
            <a className="btn btn-outline" href={resume.path} download={resume.downloadName}><Download size={18} aria-hidden="true" /> Download Resume</a>
          )}
        </div>
        <div className="terminal" aria-hidden="true">
          <div className="terminal-bar"><i /><i /><i /></div>
          <pre>{`class Developer {
  languages = ["Java", "Python"];
  databases = ["MySQL", "MongoDB"];
}`}</pre>
        </div>
      </div>
    </section>
  );
}
