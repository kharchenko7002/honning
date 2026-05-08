import { useNavigate } from 'react-router-dom';

// Single product card.
// "Bestill nå" navigates to /kontakt and passes the honey name through router state,
// so the Kontakt page can prefill the message field.
export default function HoneyCard({ honey }) {
  const navigate = useNavigate();
  const { navn, beskrivelse, pris, bilde, smak } = honey;

  // Build navigation handler — keeps JSX clean.
  const handleOrder = () => {
    navigate('/kontakt', { state: { produkt: navn } });
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md">
      <img
        src={bilde}
        alt={`Krukke med ${navn.toLowerCase()}`}
        loading="lazy"
        width="800"
        height="600"
        className="aspect-[4/3] w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-5">
        {/* Smaks-badge */}
        <span className="inline-flex w-fit rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-wax-800">
          {smak}
        </span>

        <h3 className="mt-3 font-serif text-xl font-bold text-wax-900">
          {navn}
        </h3>

        <p className="mt-2 flex-1 text-sm text-wax-800">{beskrivelse}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-honey-900">
            {pris} kr
          </span>
          <button
            type="button"
            onClick={handleOrder}
            aria-label={`Bestill ${navn} — gå til kontaktskjema`}
            className="btn-primary px-4 py-2 text-sm"
          >
            Bestill nå
          </button>
        </div>
      </div>
    </article>
  );
}
