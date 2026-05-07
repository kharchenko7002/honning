import { Link } from 'react-router-dom';

// Three short blocks: who we are, where the honey comes from, what makes it special.
const blokker = [
  {
    tittel: 'Hvem vi er',
    tekst:
      'Vi er familien Solhaug — Marit, Olav og to ungdommer som elsker å være på gården. I 1998 satte besteforeldrene opp de første kubene, og siden har vi drevet honninggården sammen.',
    emoji: '👨‍👩‍👧‍👦',
  },
  {
    tittel: 'Hvor honningen kommer fra',
    tekst:
      'Biene våre samler nektar fra enger, skogkanter, lyngheier og fjellblomster i nærområdet. Vi flytter kubene etter sesongen, slik at hver sort virkelig smaker av landskapet.',
    emoji: '🌼',
  },
  {
    tittel: 'Hva som gjør den spesiell',
    tekst:
      'Vi varmebehandler ikke honningen, og vi blander aldri ulike høstinger. Hver krukke kommer fra én enkelt høst og ett bestemt landskap — derfor smaker hver sort så tydelig som den gjør.',
    emoji: '🍯',
  },
];

export default function OmOss() {
  return (
    <>
      {/* Page header with image */}
      <section className="container-page py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-honey-700">
              Om oss
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-wax-900 sm:text-5xl">
              En liten honninggård med stor kjærlighet til biene
            </h1>
            <p className="mt-4 max-w-prose text-wax-800">
              Solhaug Honninggård ble startet i 1998 og drives i dag av andre
              generasjon. Vi tror på rolig drift, små partier og honning som
              smaker av stedet den kommer fra.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1568526381923-caf3fd520382?auto=format&fit=crop&w=1000&q=70"
            alt="Birøkter inspiserer en bikube i ettermiddagssolen"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
          />
        </div>
      </section>

      {/* Three info cards */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {blokker.map((blokk) => (
            <article
              key={blokk.tittel}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div aria-hidden="true" className="text-3xl">{blokk.emoji}</div>
              <h2 className="mt-3 font-serif text-xl font-bold text-wax-900">
                {blokk.tittel}
              </h2>
              <p className="mt-2 text-sm text-wax-800">{blokk.tekst}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-12 md:py-16">
        <div className="rounded-2xl bg-honey-500/20 p-8 text-center sm:p-12">
          <h2 className="font-serif text-2xl font-bold text-wax-900 sm:text-3xl">
            Vil du smake honningen vår?
          </h2>
          <p className="mx-auto mt-2 max-w-prose text-wax-800">
            Vi sender gjerne en liten smakspakke. Si hei på kontaktsiden, så
            finner vi noe som passer deg.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/honning" className="btn-primary">
              Se alle sortene
            </Link>
            <Link to="/kontakt" className="btn-secondary">
              Ta kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
