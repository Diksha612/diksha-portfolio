import manifest from '../data/certificates.json';

const all = manifest.certificates;

export function getCertificatesFor(entryId) {
  return all.filter((c) => c.linkedEntryId === entryId);
}

export function downloadNameFor(cert) {
  return `${cert.id}.${cert.fileType === 'jpeg' ? 'jpg' : cert.fileType}`;
}
