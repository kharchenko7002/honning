import ContactForm from '../components/ContactForm.jsx';

// Contact page — form + business contact info.
export default function Kontakt() {
  return (
    <section className="container-page py-12 md:py-16">
      <header className="max-w-prose">
        <p className="text-sm font-medium uppercase tracking-wide text-honey-700">
          Kontakt
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-wax-900 sm:text-5xl">
          Si hei til Solhaug
        </h1>
        <p className="mt-4 text-wax-800">
          Har du spørsmål, ønsker du å bestille honning, eller bare lurer på
          hvordan biene har det? Skriv til oss — vi svarer så fort vi kan.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Form takes two columns on desktop */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Sidebar with business contact info */}
        <aside className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-wax-900">
              Kontaktinformasjon
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-wax-800">
              <li>
                <span className="font-medium">E-post: </span>
                <a href="mailto:post@solhaug-honning.no" className="text-honey-700 hover:underline">
                  post@solhaug-honning.no
                </a>
              </li>
              <li>
                <span className="font-medium">Telefon: </span>
                <a href="tel:+4790000000" className="text-honey-700 hover:underline">
                  +47 900 00 000
                </a>
              </li>
              <li>
                <span className="font-medium">Adresse: </span>
                Solhaugvegen 12, 2670 Innlandet
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-honey-500/20 p-6">
            <h2 className="font-serif text-lg font-bold text-wax-900">
              Litt om svartiden
            </h2>
            <p className="mt-2 text-sm text-wax-800">
              Vi leser e-post hver morgen og svarer vanligvis innen 1–2
              virkedager. I høysesongen kan det ta litt lenger — biene har
              forkjørsrett.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
