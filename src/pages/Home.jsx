import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import HoneyCard from '../components/HoneyCard.jsx';
import honeys from '../data/honey.js';

// Homepage: hero, short story, three featured products, CTA to /honning.
export default function Home() {
  // Show the first three products as "featured".
  const featured = honeys.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Short intro section */}
      <section className="container-page py-12 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1568526381923-caf3fd520382?auto=format&fit=crop&w=1000&q=70"
            alt="Birøkter går mellom bikuber på en blomstereng"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
          />
          <div>
            <h2 className="font-serif text-3xl font-bold text-wax-900">
              En liten gård med store bier
            </h2>
            <p className="mt-4 max-w-prose text-wax-800">
              Solhaug Honninggård ligger i Innlandet, omgitt av enger, skog og
              fjell. Vi har drevet med birøkt siden 1998, og hver eneste krukke
              honning blir tappet for hånd her hjemme på gården.
            </p>
            <p className="mt-3 max-w-prose text-wax-800">
              Vi tror på rolig drift, friske bier og honning som smaker av
              stedet den kommer fra.
            </p>
            <Link to="/om-oss" className="btn-secondary mt-6">
              Les mer om gården
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-bold text-wax-900">
                Utvalgte honningsorter
              </h2>
              <p className="mt-2 max-w-prose text-wax-800">
                Et lite knippe av favorittene våre — de fleste foretrekker å
                smake seg gjennom hele utvalget.
              </p>
            </div>
            <Link to="/honning" className="btn-primary">
              Se alle 6 sorter
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((honey) => (
              <HoneyCard key={honey.id} honey={honey} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
