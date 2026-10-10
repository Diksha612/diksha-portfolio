import { useEffect, useRef } from 'react';
import { Download, X } from 'lucide-react';
import { isImageType } from '../utils/certificateValidation.js';
import { downloadNameFor } from '../utils/certificateFiles.js';

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

export default function CertificateModal({ cert, onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const opener = returnFocusRef?.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [onClose, returnFocusRef]);

  const titleId = `modal-title-${cert.id}`;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(e) => e.stopPropagation()}>
        <div className="modal-bar">
          <h3 id={titleId}>{cert.title}</h3>
          <div className="modal-actions">
            <a className="btn btn-outline btn-sm" href={cert.filePath} download={downloadNameFor(cert)}>
              <Download size={16} aria-hidden="true" /> Download
            </a>
            <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close certificate viewer">
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="modal-body">
          {isImageType(cert.fileType) ? (
            <img src={cert.filePath} alt={`${cert.title}`} />
          ) : (
            <iframe title={`${cert.title} (full view)`} src={`${cert.filePath}#view=FitH`} />
          )}
        </div>
      </div>
    </div>
  );
}
