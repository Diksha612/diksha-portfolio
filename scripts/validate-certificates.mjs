// Validates src/data/certificates.json against files in public/ and writes
// reports/certificate-validation-report.md. Never creates placeholder files.
import { existsSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SUPPORTED = ['pdf', 'jpg', 'jpeg', 'png'];
const STATUSES = ['pending', 'uploaded', 'verified'];
const CATEGORIES = ['internship', 'course'];
const REQUIRED = ['id', 'category', 'linkedEntryId', 'title', 'filePath', 'fileType', 'status'];

const manifest = JSON.parse(readFileSync(join(root, 'src/data/certificates.json'), 'utf8'));
const { experience } = await import(pathToFileURL(join(root, 'src/data/experience.js')).href);
const { courses } = await import(pathToFileURL(join(root, 'src/data/education.js')).href);
const entryIds = { internship: new Set(experience.map((e) => e.id)), course: new Set(courses.map((c) => c.id)) };
const entryNames = new Map([...experience.map((e) => [e.id, `${e.organization} — ${e.role}`]), ...courses.map((c) => [c.id, `${c.title} — ${c.provider}`])]);

const seen = new Map();
const rows = manifest.certificates.map((c) => {
  const errors = [];
  const warnings = [];
  const missing = REQUIRED.filter((k) => c[k] === undefined || c[k] === null || c[k] === '');
  if (missing.length) errors.push(`Invalid configuration: missing field(s) ${missing.join(', ')}.`);
  if (c.id) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.id)) errors.push(`Invalid configuration: id "${c.id}" must be lowercase letters, numbers and hyphens.`);
    seen.set(c.id, (seen.get(c.id) || 0) + 1);
  }
  if (c.category && !CATEGORIES.includes(c.category)) errors.push(`Invalid configuration: category "${c.category}" must be internship or course.`);
  else if (c.category && c.linkedEntryId && !entryIds[c.category].has(c.linkedEntryId)) errors.push(`Invalid configuration: linkedEntryId "${c.linkedEntryId}" is not a ${c.category} entry id.`);
  if (c.status && !STATUSES.includes(c.status)) errors.push(`Invalid configuration: status "${c.status}" must be pending, uploaded or verified.`);

  let ext = '';
  let exists = false;
  let format = 'n/a';
  if (c.filePath) {
    if (!c.filePath.startsWith('/')) errors.push('Invalid configuration: filePath must start with "/" (a URL relative to public/).');
    ext = (c.filePath.match(/\.([A-Za-z0-9]+)$/) || [])[1]?.toLowerCase() || '';
    if (!SUPPORTED.includes(ext)) { format = 'unsupported'; errors.push(`Unsupported format: ".${ext}" — use PDF, JPG, JPEG or PNG.`); }
    else format = 'supported';
    const disk = join(root, 'public', c.filePath);
    exists = existsSync(disk) && statSync(disk).isFile();
    if (!exists) errors.push(`Missing certificate file: put the file at public${c.filePath}.`);
    else if (statSync(disk).size === 0) { exists = false; errors.push('Missing certificate file: file is empty (0 bytes).'); }
  }
  if (c.fileType && ext && SUPPORTED.includes(ext) && c.fileType.toLowerCase() !== ext) errors.push(`File/type mismatch: fileType is "${c.fileType}" but the filename ends in ".${ext}".`);
  if (c.fileType && !SUPPORTED.includes(String(c.fileType).toLowerCase())) errors.push(`Unsupported format: fileType "${c.fileType}".`);

  let verification = 'No verification URL or credential ID recorded';
  if (c.verificationUrl) {
    try { new URL(c.verificationUrl); verification = 'Verification URL recorded (not contacted by this script)'; }
    catch { errors.push('Invalid configuration: verificationUrl is not a valid URL.'); verification = 'Invalid verification URL'; }
  } else if (c.credentialId) verification = 'Credential ID recorded; no verification URL';
  if (c.status === 'verified' && !c.verificationUrl && !c.credentialId) warnings.push('Marked verified but no verification URL or credential ID is recorded.');
  if (c.status === 'pending' && exists) warnings.push('File exists but status is still "pending" — set it to "uploaded" after reviewing it.');
  if (c.status === 'uploaded' && !c.verificationUrl) warnings.push('File present but certificate details are not verified.');
  if (c.status === 'uploaded' && !c.organization) warnings.push('Issuing organization is not set (leave empty until confirmed).');

  return { c, exists, format, verification, errors, warnings };
});
for (const [id, n] of seen) if (n > 1) rows.filter((r) => r.c.id === id).forEach((r) => r.errors.push(`Invalid configuration: duplicate id "${id}".`));

const verdict = (r) => (r.errors.length ? 'FAIL' : r.c.status === 'pending' ? 'PENDING' : r.warnings.length ? 'PASS (with warnings)' : 'PASS');
const action = (r) => (r.errors.length ? r.errors.join(' ') : r.warnings.length ? r.warnings.join(' ') : 'None.');

const total = rows.length;
const failed = rows.filter((r) => verdict(r) === 'FAIL').length;
const pending = rows.filter((r) => verdict(r) === 'PENDING').length;
const passed = total - failed - pending;
const count = (s) => rows.filter((r) => r.c.status === s).length;

let md = `# Certificate Validation Report\n\nGenerated: ${new Date().toISOString()}\n\n## Summary\n\n- Total records: ${total}\n- Passed (file present, configuration valid): ${passed}\n- Failed: ${failed}\n- Pending: ${pending}\n- Status counts — pending: ${count('pending')}, uploaded: ${count('uploaded')}, verified: ${count('verified')}\n\n`;
md += 'Passing means the file exists, has a supported extension that matches `fileType`, and the configuration is valid. It does not prove the PDF contents are valid and does not verify the certificate with its issuer.\n\n';
if (pending === total) md += '**All certificates are pending.** Add the real files to the folders below and set each record\'s status to `uploaded`.\n\n';
md += '## Certificates\n\n';
for (const r of rows) {
  const c = r.c;
  md += `### ${c.title || c.id || '(untitled)'}\n\n| Field | Value |\n|---|---|\n`;
  md += `| Certificate ID | ${c.id ?? '—'} |\n| Matching entry | ${entryNames.get(c.linkedEntryId) || c.linkedEntryId || '—'} (${c.category ?? '—'}) |\n`;
  md += `| Expected filename | ${c.filePath ? c.filePath.split('/').pop() : '—'} |\n| Expected path | public${c.filePath ?? ''} |\n| Configured file type | ${c.fileType ?? '—'} |\n`;
  md += `| Tracking status | ${c.status ?? '—'} |\n| File exists | ${r.exists ? 'Yes' : 'No'} |\n| Format validation | ${r.format} |\n| Verification information | ${r.verification} |\n`;
  md += `| Overall result | **${verdict(r)}** |\n| Required action | ${action(r)} |\n\n`;
}
mkdirSync(join(root, 'reports'), { recursive: true });
writeFileSync(join(root, 'reports/certificate-validation-report.md'), md);

for (const r of rows) console.log(`${verdict(r).padEnd(20)} ${r.c.id}${r.errors.length ? '\n   - ' + r.errors.join('\n   - ') : ''}${r.warnings.length ? '\n   ! ' + r.warnings.join('\n   ! ') : ''}`);
console.log(`\nTotal ${total} | passed ${passed} | failed ${failed} | pending ${pending}`);
console.log('Report written to reports/certificate-validation-report.md');
process.exit(failed ? 1 : 0);
