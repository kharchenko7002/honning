import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Simple email regex — good enough for client-side validation.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialErrors = { navn: '', epost: '', melding: '' };

export default function ContactForm() {
  const location = useLocation();

  // If the user came from a "Bestill nå" button, prefill the message.
  const prefillProduct = location.state?.produkt || '';

  const [form, setForm] = useState({
    navn: '',
    epost: '',
    melding: prefillProduct
      ? `Hei! Jeg vil gjerne bestille ${prefillProduct}. `
      : '',
  });
  const [errors, setErrors] = useState(initialErrors);
  const [sent, setSent] = useState(false);

  // If product info arrives after first render (e.g. back navigation), update message once.
  useEffect(() => {
    if (prefillProduct && !form.melding) {
      setForm((prev) => ({
        ...prev,
        melding: `Hei! Jeg vil gjerne bestille ${prefillProduct}. `,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error as soon as user starts editing.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Returns true when all fields are valid.
  const validate = () => {
    const next = { ...initialErrors };
    if (!form.navn.trim()) next.navn = 'Vennligst skriv inn navnet ditt.';
    if (!form.epost.trim()) {
      next.epost = 'Vennligst skriv inn e-postadressen din.';
    } else if (!EMAIL_PATTERN.test(form.epost.trim())) {
      next.epost = 'E-postadressen ser ikke gyldig ut.';
    }
    if (!form.melding.trim()) next.melding = 'Vennligst skriv en kort melding.';
    setErrors(next);
    return Object.values(next).every((value) => value === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    // Build mailto link with prefilled subject and body.
    const subject = encodeURIComponent('Forespørsel fra solhaug-honning.no');
    const body = encodeURIComponent(
      `Navn: ${form.navn}\nE-post: ${form.epost}\n\n${form.melding}`
    );
    const mailto = `mailto:post@solhaug-honning.no?subject=${subject}&body=${body}`;

    setSent(true);
    // Open the user's mail client.
    window.location.href = mailto;
  };

  // Field-level helper so JSX stays small.
  const fieldClass = (hasError) =>
    [
      'mt-1 w-full rounded-2xl border bg-white px-4 py-3 text-base text-wax-900',
      'placeholder:text-wax-800/50 focus:outline-none focus:ring-2',
      hasError
        ? 'border-red-500 focus:ring-red-500'
        : 'border-cream-200 focus:ring-honey-500',
    ].join(' ');

  return (
    <div>
      {/* Thank-you message shown above the form on successful submit */}
      {sent && (
        <div
          role="status"
          className="mb-6 rounded-2xl border border-leaf-500 bg-leaf-500/10 px-5 py-4 text-leaf-700"
        >
          <p className="font-medium">Takk for meldingen!</p>
          <p className="text-sm">
            E-postklienten din skal nå åpne med meldingen din ferdig utfylt.
            Hvis ingenting skjer, send oss gjerne en e-post direkte til
            post@solhaug-honning.no.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Navn */}
        <div>
          <label htmlFor="navn" className="font-medium text-wax-900">
            Navn <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="navn"
            name="navn"
            required
            value={form.navn}
            onChange={handleChange}
            aria-invalid={Boolean(errors.navn)}
            aria-describedby={errors.navn ? 'navn-feil' : undefined}
            className={fieldClass(Boolean(errors.navn))}
            placeholder="Ola Nordmann"
          />
          {errors.navn && (
            <p id="navn-feil" className="mt-1 text-sm text-red-600">
              {errors.navn}
            </p>
          )}
        </div>

        {/* E-post */}
        <div>
          <label htmlFor="epost" className="font-medium text-wax-900">
            E-post <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="epost"
            name="epost"
            required
            value={form.epost}
            onChange={handleChange}
            aria-invalid={Boolean(errors.epost)}
            aria-describedby={errors.epost ? 'epost-feil' : undefined}
            className={fieldClass(Boolean(errors.epost))}
            placeholder="ola@example.com"
          />
          {errors.epost && (
            <p id="epost-feil" className="mt-1 text-sm text-red-600">
              {errors.epost}
            </p>
          )}
        </div>

        {/* Melding */}
        <div>
          <label htmlFor="melding" className="font-medium text-wax-900">
            Melding <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <textarea
            id="melding"
            name="melding"
            required
            rows={5}
            value={form.melding}
            onChange={handleChange}
            aria-invalid={Boolean(errors.melding)}
            aria-describedby={errors.melding ? 'melding-feil' : undefined}
            className={fieldClass(Boolean(errors.melding))}
            placeholder="Skriv hva du lurer på, eller hvilke honningsorter du ønsker."
          />
          {errors.melding && (
            <p id="melding-feil" className="mt-1 text-sm text-red-600">
              {errors.melding}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-wax-800">
            Vi svarer vanligvis innen 1–2 virkedager.
          </p>
          <button type="submit" className="btn-primary">
            Send melding
          </button>
        </div>
      </form>
    </div>
  );
}
