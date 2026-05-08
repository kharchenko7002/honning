import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Simple email regex — good enough for client-side validation.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation rules
const NAVN_MIN = 2;
const MELDING_MIN = 10;
const MELDING_MAX = 1000;

// localStorage key for the draft
const STORAGE_KEY = 'solhaug-contact-draft';

const emptyForm = { navn: '', epost: '', melding: '' };
const initialErrors = { navn: '', epost: '', melding: '' };
const initialTouched = { navn: false, epost: false, melding: false };

// --- localStorage helpers (wrapped in try/catch for private mode / quota) -----

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const hasContent = parsed?.navn || parsed?.epost || parsed?.melding;
    return hasContent ? parsed : null;
  } catch {
    return null;
  }
}

function saveDraft(form) {
  try {
    const hasContent = form.navn || form.epost || form.melding;
    if (hasContent) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore — draft saving is best-effort only
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// --- Field validators — return Norwegian error string or empty string ---------

const validators = {
  navn: (value) => {
    const v = value.trim();
    if (!v) return 'Vennligst skriv inn navnet ditt.';
    if (v.length < NAVN_MIN) return `Navnet må være minst ${NAVN_MIN} tegn.`;
    return '';
  },
  epost: (value) => {
    const v = value.trim();
    if (!v) return 'Vennligst skriv inn e-postadressen din.';
    if (!EMAIL_PATTERN.test(v)) return 'E-postadressen ser ikke gyldig ut.';
    return '';
  },
  melding: (value) => {
    const v = value.trim();
    if (!v) return 'Vennligst skriv en kort melding.';
    if (v.length < MELDING_MIN) return `Meldingen må være minst ${MELDING_MIN} tegn.`;
    if (value.length > MELDING_MAX) return `Meldingen kan ikke være lengre enn ${MELDING_MAX} tegn.`;
    return '';
  },
};

export default function ContactForm() {
  const location = useLocation();

  // If the user came from a "Bestill nå" button, prefill the message.
  const prefillProduct = location.state?.produkt || '';

  // Initial form state: prefill takes priority, otherwise restore draft from localStorage.
  const [form, setForm] = useState(() => {
    if (prefillProduct) {
      return {
        navn: '',
        epost: '',
        melding: `Hei! Jeg vil gjerne bestille ${prefillProduct}. `,
      };
    }
    return loadDraft() || emptyForm;
  });

  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [sent, setSent] = useState(false);
  // Honeypot field — only bots fill this in, real users never see it.
  const [honeypot, setHoneypot] = useState('');
  // True only on first mount when a saved draft was actually restored.
  const [draftRestored, setDraftRestored] = useState(
    () => !prefillProduct && Boolean(loadDraft())
  );

  const navnRef = useRef(null);

  // Persist draft on every change, but not after a successful send.
  useEffect(() => {
    if (sent) return;
    saveDraft(form);
  }, [form, sent]);

  // If product prefill arrives after first render (back navigation), apply it once.
  useEffect(() => {
    if (prefillProduct && !form.melding) {
      setForm((prev) => ({
        ...prev,
        melding: `Hei! Jeg vil gjerne bestille ${prefillProduct}. `,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillProduct]);

  // --- Event handlers --------------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Re-validate live only after the field has been touched, so we don't yell
    // at users while they're typing for the first time.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const validateAll = () => {
    const next = {
      navn: validators.navn(form.navn),
      epost: validators.epost(form.epost),
      melding: validators.melding(form.melding),
    };
    setErrors(next);
    setTouched({ navn: true, epost: true, melding: true });
    return Object.values(next).every((value) => value === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Honeypot tripped — silently pretend it succeeded so the bot moves on.
    // We never open the mail client and never save anything.
    if (honeypot) {
      setSent(true);
      clearDraft();
      setDraftRestored(false);
      return;
    }

    if (!validateAll()) return;

    // Build mailto link with prefilled subject and body.
    const subject = encodeURIComponent('Forespørsel fra solhaug-honning.no');
    const body = encodeURIComponent(
      `Navn: ${form.navn}\nE-post: ${form.epost}\n\n${form.melding}`
    );
    const mailto = `mailto:post@solhaug-honning.no?subject=${subject}&body=${body}`;

    setSent(true);
    clearDraft();
    setDraftRestored(false);
    window.location.href = mailto;
  };

  // Reset the form to start over after a successful send.
  const handleNewMessage = () => {
    setForm(emptyForm);
    setErrors(initialErrors);
    setTouched(initialTouched);
    setSent(false);
    clearDraft();
    setDraftRestored(false);
    navnRef.current?.focus();
  };

  // Discard a restored draft without sending.
  const handleDiscardDraft = () => {
    setForm(emptyForm);
    setErrors(initialErrors);
    setTouched(initialTouched);
    clearDraft();
    setDraftRestored(false);
  };

  // --- Derived UI helpers ----------------------------------------------------

  const fieldClass = (hasError) =>
    [
      'mt-1 w-full rounded-2xl border bg-white px-4 py-3 text-base text-wax-900',
      'placeholder:text-wax-800/50 focus:outline-none focus:ring-2',
      hasError
        ? 'border-red-500 focus:ring-red-500'
        : 'border-cream-200 focus:ring-honey-500',
    ].join(' ');

  const meldingLength = form.melding.length;
  const meldingOverLimit = meldingLength > MELDING_MAX;

  // --- Render ----------------------------------------------------------------

  return (
    <div>
      {/* Notice when we restored a saved draft from localStorage */}
      {draftRestored && !sent && (
        <div
          role="status"
          className="mb-4 flex flex-col gap-2 rounded-2xl border border-honey-500 bg-honey-500/10 px-5 py-4 text-wax-900 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm">
            Vi fant et utkast du jobbet med tidligere — det er fylt inn igjen for deg.
          </p>
          <button
            type="button"
            onClick={handleDiscardDraft}
            className="self-start rounded-xl border border-wax-800/30 px-3 py-1 text-sm font-medium text-wax-900 hover:bg-cream-100 sm:self-auto"
          >
            Slett utkast
          </button>
        </div>
      )}

      {/* Thank-you panel shown above the form on successful submit */}
      {sent && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 rounded-2xl border border-leaf-500 bg-leaf-500/10 px-5 py-4 text-leaf-700"
        >
          <p className="font-medium">Takk for meldingen!</p>
          <p className="mt-1 text-sm">
            E-postklienten din skal nå åpne med meldingen din ferdig utfylt.
            Hvis ingenting skjer, send oss gjerne en e-post direkte til{' '}
            <a href="mailto:post@solhaug-honning.no" className="underline">
              post@solhaug-honning.no
            </a>
            .
          </p>
          <button
            type="button"
            onClick={handleNewMessage}
            className="mt-3 rounded-xl border border-leaf-500 px-4 py-2 text-sm font-medium text-leaf-700 hover:bg-leaf-500 hover:text-cream-50"
          >
            Skriv ny melding
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Honeypot — visually hidden and out of the tab order. Real users
            never see this field; bots that fill in every input will trip it
            and we silently drop their submission. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
          <label htmlFor="nettsted">Nettside (la stå tom)</label>
          <input
            type="text"
            id="nettsted"
            name="nettsted"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        {/* Navn */}
        <div>
          <label htmlFor="navn" className="font-medium text-wax-900">
            Navn <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="navn"
            name="navn"
            ref={navnRef}
            required
            value={form.navn}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.navn)}
            aria-describedby={errors.navn ? 'navn-feil' : undefined}
            className={fieldClass(Boolean(errors.navn))}
            placeholder="Ola Nordmann"
            autoComplete="name"
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
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.epost)}
            aria-describedby={errors.epost ? 'epost-feil' : undefined}
            className={fieldClass(Boolean(errors.epost))}
            placeholder="ola@example.com"
            autoComplete="email"
          />
          {errors.epost && (
            <p id="epost-feil" className="mt-1 text-sm text-red-600">
              {errors.epost}
            </p>
          )}
        </div>

        {/* Melding */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <label htmlFor="melding" className="font-medium text-wax-900">
              Melding <span aria-hidden="true" className="text-red-600">*</span>
            </label>
            <span
              id="melding-teller"
              className={[
                'text-xs',
                meldingOverLimit ? 'text-red-600' : 'text-wax-800',
              ].join(' ')}
              aria-live="polite"
            >
              {meldingLength} / {MELDING_MAX} tegn
            </span>
          </div>
          <textarea
            id="melding"
            name="melding"
            required
            rows={5}
            value={form.melding}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.melding)}
            aria-describedby={
              [
                'melding-hjelp',
                errors.melding ? 'melding-feil' : null,
                'melding-teller',
              ]
                .filter(Boolean)
                .join(' ')
            }
            className={fieldClass(Boolean(errors.melding))}
            placeholder="Skriv hva du lurer på, eller hvilke honningsorter du ønsker."
          />
          <p id="melding-hjelp" className="mt-1 text-xs text-wax-800">
            Minst {MELDING_MIN} tegn. Vi leser hver eneste melding.
          </p>
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
