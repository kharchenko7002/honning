import { Link } from 'react-router-dom';

// Hero section used on the homepage.
// Two-column on desktop, stacked on mobile.
export default function Hero() {
  return (
    <section className="bg-cream-50">
      <div className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-honey-700">
            Lokal honning fra Innlandet
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-wax-900 sm:text-5xl">
            Honning rett fra <span className="text-honey-700">gården</span>
          </h1>
          <p className="mt-4 max-w-prose text-lg text-wax-800">
            Hos Solhaug Honninggård steller vi bikubene selv og høster kun det
            biene kan unnvære. Hver krukke smaker av engene, skogen og
            fjellet rundt oss.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/honning" className="btn-primary">
              Se alle honningsorter
            </Link>
            <Link to="/om-oss" className="btn-secondary">
              Les mer
            </Link>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1000&q=70"
            alt="Glasskrukke med gyllen honning på et trebord"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
          />
          {/* Decorative badge */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 rounded-2xl bg-honey-500 px-4 py-2 font-serif text-sm font-bold text-wax-900 shadow-md"
          >
            🐝 Siden 1998
          </div>
        </div>
      </div>
    </section>
  );
}
