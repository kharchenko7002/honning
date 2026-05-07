// Location page — address, opening hours and a simple map iframe.
const apningstider = [
  { dag: 'Mandag – fredag', tid: '09:00 – 17:00' },
  { dag: 'Lørdag', tid: '10:00 – 15:00' },
  { dag: 'Søndag', tid: 'Stengt' },
];

export default function HvorFinnerDuOss() {
  return (
    <section className="container-page py-12 md:py-16">
      <header className="max-w-prose">
        <p className="text-sm font-medium uppercase tracking-wide text-honey-700">
          Hvor finner du oss
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-wax-900 sm:text-5xl">
          Velkommen til gården
        </h1>
        <p className="mt-4 text-wax-800">
          Du finner oss i Innlandet, en kort biltur fra E6. Gårdsbutikken er
          åpen i sesongen, og du er hjertelig velkommen innom for å smake.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Address + hours */}
        <div className="space-y-6">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-wax-900">Adresse</h2>
            <address className="mt-2 not-italic text-wax-800">
              Solhaug Honninggård<br />
              Solhaugvegen 12<br />
              2670 Innlandet
            </address>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-wax-900">
              Åpningstider i gårdsbutikken
            </h2>
            <ul className="mt-3 divide-y divide-cream-100">
              {apningstider.map((rad) => (
                <li
                  key={rad.dag}
                  className="flex items-center justify-between py-2 text-wax-800"
                >
                  <span className="font-medium">{rad.dag}</span>
                  <span>{rad.tid}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-wax-800">
              Avvikende åpningstider i ferier — ta gjerne kontakt før du
              reiser langt.
            </p>
          </article>
        </div>

        {/* Map iframe */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <iframe
            title="Kart over Solhaug Honninggård"
            src="https://www.openstreetmap.org/export/embed.html?bbox=10.30%2C60.78%2C10.50%2C60.92&layer=mapnik&marker=60.85%2C10.40"
            className="aspect-square w-full lg:aspect-auto lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p className="border-t border-cream-100 px-4 py-2 text-xs text-wax-800">
            Kartdata © OpenStreetMap-bidragsyterne.
          </p>
        </div>
      </div>
    </section>
  );
}
