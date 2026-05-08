import HoneyCard from '../components/HoneyCard.jsx';
import honeys from '../data/honey.js';

// Product page — full grid of all 6 honeys.
export default function Honning() {
  return (
    <section className="container-page py-12 md:py-16">
      <header className="max-w-prose">
        <p className="text-sm font-medium uppercase tracking-wide text-honey-900">
          Sortimentet vårt
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-wax-900 sm:text-5xl">
          Honning fra Solhaug
        </h1>
        <p className="mt-4 text-wax-800">
          Seks ulike honningsorter, alle høstet på gården. Velg en favoritt
          eller smak deg gjennom hele utvalget — vi sender gjerne en
          smakspakke om du er i tvil.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {honeys.map((honey) => (
          <HoneyCard key={honey.id} honey={honey} />
        ))}
      </div>
    </section>
  );
}
