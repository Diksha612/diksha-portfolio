import { useState } from 'react';
import { Send } from 'lucide-react';
import { siteConfig } from '../config/siteConfig.js';

const EMPTY = { name: '', email: '', subject: '', message: '' };
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const { serviceId, templateId, publicKey } = siteConfig.emailjs;
const configured = Boolean(serviceId && templateId && publicKey);

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const mailto = () =>
    `mailto:${siteConfig.email}?subject=${encodeURIComponent(values.subject || 'Portfolio enquiry')}&body=${encodeURIComponent(`${values.message}\n\n${values.name} (${values.email})`)}`;

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = 'Please enter your name.';
    if (!values.email.trim()) e.email = 'Please enter your email address.';
    else if (!emailOk(values.email)) e.email = 'Please enter a valid email address.';
    if (!values.subject.trim()) e.subject = 'Please enter a subject.';
    if (!values.message.trim()) e.message = 'Please enter a message.';
    return e;
  };

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    if (!configured) return; // never attempt a send without credentials
    setStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: { from_name: values.name, reply_to: values.email, subject: values.subject, message: values.message },
        }),
      });
      if (!res.ok) throw new Error(`EmailJS responded with ${res.status}`);
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={`cf-${name}`}>{label}</label>
      {props.textarea ? (
        <textarea id={`cf-${name}`} name={name} rows="5" value={values[name]} onChange={onChange} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `cf-${name}-err` : undefined} />
      ) : (
        <input id={`cf-${name}`} name={name} type={props.type || 'text'} autoComplete={props.autoComplete} value={values[name]} onChange={onChange} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `cf-${name}-err` : undefined} />
      )}
      {errors[name] && <p id={`cf-${name}-err`} className="error">{errors[name]}</p>}
    </div>
  );

  return (
    <form className="card contact-form" onSubmit={onSubmit} noValidate>
      {!configured && (
        <p className="notice" role="note">
          Email delivery isn't configured on this site yet, so the form can't send messages. Use the email button below, which opens your mail app.
        </p>
      )}
      {field('name', 'Name', { autoComplete: 'name' })}
      {field('email', 'Email address', { type: 'email', autoComplete: 'email' })}
      {field('subject', 'Subject')}
      {field('message', 'Message', { textarea: true })}
      <div className="form-actions">
        {configured ? (
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            <Send size={16} aria-hidden="true" /> {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        ) : (
          <a className="btn btn-primary" href={mailto()} onClick={(e) => { const er = validate(); setErrors(er); if (Object.keys(er).length) e.preventDefault(); }}>
            <Send size={16} aria-hidden="true" /> Send via email app
          </a>
        )}
      </div>
      <div role="status" aria-live="polite">
        {status === 'success' && <p className="success">Thanks, your message was sent.</p>}
        {status === 'error' && (
          <p className="error">
            The message couldn't be sent. Please try again, or <a href={mailto()}>email me directly</a>.
          </p>
        )}
      </div>
    </form>
  );
}
