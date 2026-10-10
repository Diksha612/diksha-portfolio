# Diksha Vilas Mane — Portfolio

A single-page portfolio built with React, Vite and custom CSS (no UI framework). Sections: Home, About, Skills, Projects, Experience, Education, Certifications, Contact.

## Features
Light/dark theme (follows the OS, manual override saved), sticky nav with active indicator, filterable projects, internship and course certificates with inline preview, enlarge modal and download, EmailJS contact form with mailto fallback, SEO metadata, print styles.

## Stack
React 18, Vite 5, `lucide-react`, custom CSS, Node script for certificate validation.

## Folder structure
`public/` (photo, resume, certificates, favicon, OG image) · `src/components`, `src/sections`, `src/data` (all editable content), `src/config/siteConfig.js`, `src/styles`, `src/utils` · `scripts/validate-certificates.mjs` · `reports/`

## Prerequisites
Node.js 18+ (https://nodejs.org) and Git.

## Install and run (Windows PowerShell or any terminal, from the project folder)
```
npm install
npm run dev
```
Open the printed `http://localhost:5173`. Production build: `npm run build` (output `dist/`), preview with `npm run preview`.

## Profile photo and resume
Your photo is at `public/images/profile.jpg` and the resume at `public/resume.pdf`. To replace, overwrite those files. If the photo fails to load a "DM" avatar appears. The Download Resume button is controlled by `siteConfig.resume.enabled` in `src/config/siteConfig.js` (currently `true`; set `false` to hide).

## Certificates
Internship and course files live in `public/certificates/internships/` and `public/certificates/courses/`, described in `src/data/certificates.json`. See **CERTIFICATE_GUIDE.md** for filenames, fields, adding/replacing, privacy review and validation.

```
npm run validate:certificates
```
Writes `reports/certificate-validation-report.md` and exits non-zero on blocking errors. Files in `public/` are publicly downloadable once deployed.

## EmailJS
1. Create an account at emailjs.com, add an email service and a template using the variables `from_name`, `reply_to`, `subject`, `message`.
2. Copy `.env.example` to `.env` and fill in `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Restart `npm run dev`.
3. Test by sending a message. Until configured, the form shows a notice and offers a mail-app link instead; it never claims a message was sent.

## Editing content
Projects: `src/data/projects.js`. Skills: `src/data/skills.js`. Experience: `src/data/experience.js`. Education and courses: `src/data/education.js`. Colors: `src/styles/variables.css` (accent `#4F46E5`).

## GitHub and Vercel
```
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Diksha612/<repo-name>.git
git push -u origin main
```
In Vercel: Add New → Project → import the repo. Framework Vite, build `npm run build`, output `dist` (already in `vercel.json`). Under Settings → Environment Variables add the three `VITE_EMAILJS_*` values, then redeploy.

## After deploying
Add your real URL to `index.html` (a `canonical` link, `og:url`, and an absolute `og:image` such as `https://YOUR-URL/og-image.svg`), and a `Sitemap:` line in `public/robots.txt`. Note some social networks prefer PNG/JPG over SVG for previews. Then test every section, certificate and the contact form on the live URL.

## Troubleshooting
- Certificate card missing: file absent or wrong `filePath`/`fileType`; run the validator.
- Contact form shows "not configured": `.env` missing or dev server not restarted; on Vercel redeploy after adding variables.
- Blank PDF on mobile: use Enlarge or Download.
- `npm` not found: install Node.js and reopen the terminal.
