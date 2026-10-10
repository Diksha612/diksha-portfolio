import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, Maximize2, ShieldCheck } from 'lucide-react';
import CertificatePreview from './CertificatePreview.jsx';
import CertificateModal from './CertificateModal.jsx';
import { checkFileAvailable } from '../utils/certificateValidation.js';
import { downloadNameFor } from '../utils/certificateFiles.js';

export default function CertificateCard({ cert }) {
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const openerRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let alive = true;
    checkFileAvailable(cert.filePath, cert.fileType).then((ok) => alive && setAvailable(ok));
    return () => { alive = false; };
  }, [cert.filePath, cert.fileType]);

  // Missing or unsupported file: render nothing (no broken preview, no dead links).
  if (!available) return null;

  return (
    <article className="cert-card" aria-label={cert.title}>
      <h4>{cert.title}</h4>
      <p className="muted small">
        {[cert.organization, cert.issueDate && `Issued ${cert.issueDate}`].filter(Boolean).join(' · ')}
        {cert.credentialId && <span className="block">Credential ID: {cert.credentialId}</span>}
      </p>
      <CertificatePreview cert={cert} onFail={() => setAvailable(false)} />
      <div className="cert-actions">
        <button ref={openerRef} type="button" className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>
          <Maximize2 size={16} aria-hidden="true" /> Enlarge Certificate
        </button>
        <a className="btn btn-outline btn-sm" href={cert.filePath} download={downloadNameFor(cert)}>
          <Download size={16} aria-hidden="true" /> Download Certificate
        </a>
        {cert.verificationUrl && (
          <a className="btn btn-outline btn-sm" href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">
            <ShieldCheck size={16} aria-hidden="true" /> Verify Certificate
          </a>
        )}
      </div>
      {open && <CertificateModal cert={cert} onClose={close} returnFocusRef={openerRef} />}
    </article>
  );
}
