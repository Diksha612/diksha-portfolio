import { useEffect, useRef, useState } from 'react';
import { isImageType } from '../utils/certificateValidation.js';

// Loads the heavy document only when the card scrolls near the viewport.
export default function CertificatePreview({ cert, onFail }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: '300px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="cert-preview">
      {near && (isImageType(cert.fileType) ? (
        <img src={cert.filePath} alt={`Preview of ${cert.title}`} loading="lazy" onError={onFail} />
      ) : (
        <object data={`${cert.filePath}#toolbar=0&navpanes=0&view=FitH`} type="application/pdf" aria-label={`Preview of ${cert.title}`}>
          <p className="muted">This browser can't show the PDF inline. Use Enlarge or Download below.</p>
        </object>
      ))}
    </div>
  );
}
