// Central site configuration. Edit values here, not inside components.
export const siteConfig = {
  name: 'Diksha Vilas Mane',
  title: 'Computer Engineer',
  initials: 'DM',
  tagline: 'Learning, problem-solving, and building software that matters.',
  intro:
    'I enjoy turning ideas into working applications, solving problems through code, and continuously improving my skills in backend engineering.',
  location: 'Dombivli, Thane, Maharashtra, India',
  email: 'dikshamane612@gmail.com',
  phone: '+91 8879077198',
  phoneHref: 'tel:+918879077198',
  github: 'https://github.com/Diksha612',
  linkedin: 'https://www.linkedin.com/in/diksha-mane-3184353a3/',
  profilePhoto: '/images/profile.jpg',
  resume: {
    // Set to true only when public/resume.pdf is the real file.
    enabled: true,
    path: '/resume.pdf',
    downloadName: 'Diksha-Vilas-Mane-Resume.pdf',
  },
  theme: { default: 'system', lightColor: '#F8FAFC', darkColor: '#0B1220' },
  seo: {
    title: 'Diksha Vilas Mane | Computer Engineer',
    description:
      'Portfolio of Diksha Vilas Mane, a Computer Engineer working with Java, Python and databases, with projects, internships and certifications.',
    // Add your real Vercel URL in index.html (canonical / og:url / og:image) after deployment.
    siteUrl: '',
  },
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];
