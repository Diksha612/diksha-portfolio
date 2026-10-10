import CertificateCard from './CertificateCard.jsx';
import { getCertificatesFor } from '../utils/certificateFiles.js';

export default function CertificateList({ entryId }) {
  const certs = getCertificatesFor(entryId);
  if (!certs.length) return null;
  return (
    <div className="cert-list">
      {certs.map((c) => <CertificateCard key={c.id} cert={c} />)}
    </div>
  );
}
