# CLAUDE.md — Solhaug Honninggård

Dette dokumentet beskriver prosjektet for AI-assistenten (Claude Code) slik at all videre kode følger samme retning. Original kravspesifikasjon ligger i [instruction.md](instruction.md).

---

## 1. Prosjektoversikt

**Navn:** Solhaug Honninggård
**Type:** Skoleprosjekt — enkel, responsiv presentasjonsside for et fiktivt lokalt birøkteri.
**Region (fiksjon):** Innlandet, Norge.
**Mål:** Vise frem honningsortimentet, fortelle historien til gården, gi besøksinformasjon og la kundene sende en enkel forespørsel/bestilling.

Dette er **ikke** en ekte e-handelsside. Ingen innlogging, betaling, backend, database, admin eller handlekurv.

---

## 2. Språk

**All synlig tekst på siden skal være på norsk bokmål.**

- Knapper, navigasjon, overskrifter, beskrivelser, feilmeldinger, form-labels, alt-tekster, meta-tagger osv. — alt på bokmål.
- Kommentarer i koden kan være på engelsk (kort og tydelig).
- Filnavn og kode-identifikatorer på engelsk (`HoneyCard.jsx`, `useScrollToTop`, osv.).
- Hvis Claude er i tvil om en oversettelse, bruk naturlig, varm og lokal tone — *ikke* maskinoversatt språk.

Sentrale ord som skal brukes konsekvent:
| Norsk | Bruk |
|---|---|
| Hjem | Forsiden |
| Honning | Produktside |
| Om oss | About-side |
| Hvor finner du oss | Lokasjonsside |
| Kontakt | Kontaktside |
| Bestill nå | CTA-knapp for forespørsel |
| Les mer | Sekundær CTA |
| Send melding | Submit-knapp på kontaktskjema |

---

## 3. Teknisk stack

- **React + Vite** (JavaScript, ikke TypeScript — for å holde det enkelt å forklare)
- **React Router DOM** for navigasjon mellom sider
- **Tailwind CSS** for styling
- **Google Fonts:** Playfair Display (overskrifter, serif) + Inter (brødtekst, sans-serif)
- **Bilder:** eksterne lenker (Unsplash eller tilsvarende). Alle `<img>` må ha `alt`-tekst på norsk og `loading="lazy"`.
- **Ingen** ekstra biblioteker (ingen UI-kit, ingen icon-pakker — bruk inline SVG hvis ikoner trengs, eller emoji 🍯 🐝 sparsomt).
- **Ingen** state-management bibliotek (Redux, Zustand osv.). Bruk lokal `useState` der det trengs.

---

## 4. Sidestruktur (React Router)

5 ruter:

| Path | Komponent | Innhold |
|---|---|---|
| `/` | `Home` | Hero, kort om gården, utvalgte produkter, CTA til `/honning` |
| `/honning` | `Honning` | Alle 6 honningsorter i grid, hver med navn, beskrivelse, pris, bilde, smaks-label |
| `/om-oss` | `OmOss` | Hvem vi er, hvor honningen kommer fra, hva som gjør den spesiell |
| `/hvor-finner-du-oss` | `HvorFinnerDuOss` | Adresse, åpningstider, enkelt kart-placeholder (iframe eller bilde) |
| `/kontakt` | `Kontakt` | Kontaktskjema (navn, e-post, melding) + kontaktinfo |

Felles layout (`Layout.jsx`): `<Header />` (nav) + `<Outlet />` + `<Footer />`.

---

## 5. Mappestruktur

```
solhaug-honning/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Layout.jsx
│  │  ├─ HoneyCard.jsx
│  │  ├─ Hero.jsx
│  │  └─ ContactForm.jsx
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Honning.jsx
│  │  ├─ OmOss.jsx
│  │  ├─ HvorFinnerDuOss.jsx
│  │  └─ Kontakt.jsx
│  ├─ data/
│  │  └─ honey.js          // array med 6 produkter
│  ├─ App.jsx              // Router-konfig
│  ├─ main.jsx
│  └─ index.css            // Tailwind directives + globale stiler
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
├─ index.html              // <html lang="nb">
├─ package.json
└─ README.md               // norsk installasjons- og utviklerguide
```

---

## 6. Produkter (6 honningsorter)

Alle ligger i [src/data/honey.js](src/data/honey.js) som ett array. Hvert objekt:

```js
{
  id: 'blomster',
  navn: 'Blomsterhonning',
  beskrivelse: '...',     // 1–2 setninger, varm tone
  pris: 129,               // NOK, heltall
  bilde: 'https://...',    // Unsplash-URL
  smak: 'Mild og blomstrete' // label til badge
}
```

De 6 sortene: **Blomsterhonning, Skogshonning, Lynghonning, Sommerhonning, Fjellhonning, Kremhonning.**

---

## 7. Designspråk

### Fargepalett (Tailwind custom colors i `tailwind.config.js`)

| Rolle | Hex | Tailwind-navn |
|---|---|---|
| Honningsgul (primary) | `#E8A93C` | `honey-500` |
| Mørk honning | `#B8791F` | `honey-700` |
| Lys krem | `#FBF5E9` | `cream-50` |
| Beige bakgrunn | `#F4E8D0` | `cream-100` |
| Voks-brun | `#7A5230` | `wax-800` |
| Tekst mørk | `#2B1F12` | `wax-900` |
| Aksent grønn (natur) | `#6B8E4E` | `leaf-500` |

Bakgrunn på siden: `cream-50`. Korter kort: hvit med myk skygge. Knapper: `honey-500` med hover `honey-700`.

### Typografi

- Overskrifter (`h1`–`h3`): **Playfair Display**, semi-bold/bold
- Brødtekst, knapper, navigasjon: **Inter**, regular/medium
- Linjehøyde: 1.6 for brødtekst
- Maks linjebredde for tekst: `max-w-prose`

### Stilfølelse

Mykt, varmt, lokalt, naturnært. Avrundede hjørner (`rounded-2xl`), generøs whitespace, ingen aggressive animasjoner. Subtile hover-effekter (skygge/farge), ingen parallax eller tunge bilder.

---

## 8. Funksjonelle krav

- **Navigasjon:** alle lenker fungerer via `<NavLink>`. Aktiv side får tydelig markering.
- **Mobilmeny:** hamburger-knapp under `md`-breakpoint, åpner enkel dropdown.
- **Kontaktskjema:**
  - Felter: `Navn`, `E-post`, `Melding` — alle påkrevd, label-koblet via `htmlFor`/`id`.
  - Klient-side validering (HTML5 + enkel JS): tom verdi og e-post-format.
  - Submit-knapp åpner `mailto:post@solhaug-honning.no` med `subject` og `body` forhåndsutfylt.
  - Ved gyldig submit: vis kort takke-melding *over* skjemaet (uten å miste innholdet før mail-klienten åpner).
- **"Bestill nå"-knapp** på produktkort: navigerer til `/kontakt` og forhåndsfyller `Melding` med produktnavnet (via `useNavigate` + `state` eller query-param).
- **Responsivitet:** mobil først. Brytepunkter Tailwind-default (`sm`, `md`, `lg`).
- **Tilgjengelighet:**
  - `<html lang="nb">`
  - Semantisk HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` for produktkort)
  - Kontrast minst WCAG AA
  - Alle `img` med `alt`
  - Alle skjemafelter med `<label>`
  - Fokus-stil synlig (`focus-visible:ring`)

---

## 9. Kodekvalitet

- Komponenter er små og rene — én komponent per fil.
- Funksjonelle komponenter med React hooks. Ingen klassekomponenter.
- Bruk destructurering for props.
- Korte engelske kommentarer over ikke-trivielle blokker (`// Build mailto link with prefilled order text`).
- Ingen `console.log` i ferdig kode.
- Ingen ubrukte imports.
- Konsekvente filnavn: `PascalCase.jsx` for komponenter, `camelCase.js` for data/utils.
- Tailwind-klasser i logisk rekkefølge: layout → spacing → typografi → farge → state.

---

## 10. Hva som **ikke** skal bygges

For å holde scope realistisk for et skoleprosjekt:

- ❌ Innlogging / autentisering
- ❌ Betaling / Stripe / Vipps
- ❌ Backend-server (Node/Express/Next API)
- ❌ Database (SQL, Mongo, Firebase)
- ❌ Admin-dashboard
- ❌ Handlekurv med checkout
- ❌ i18n-system (siden er bare på norsk)
- ❌ Testing-rammeverk (Vitest/Jest) — med mindre eksplisitt bedt om
- ❌ TypeScript
- ❌ SSR/Next.js
- ❌ Animasjonsbiblioteker (Framer Motion osv.)

Disse skal nevnes som *forslag til neste fase* i README, ikke implementeres nå.

---

## 11. Utviklingsfaser

Prosjektet bygges i to faser slik at det er enkelt å forklare og dokumentere for skolen.

**Fase 1 — Grunnleggende nettside**
- Enkel, tidlig versjon av honning-nettsiden
- Grunnleggende navigasjon
- Sidene: Hjem, Honning, Om oss, Hvor finner du oss, Kontakt
- Enkelt, men ryddig design

**Fase 2 — Skoleforbedringer**
- Videreutvikle *samme* prosjekt basert på brukerhistorier og use cases
- Eksempler: bedre navigasjon, skjemavalidering, tilgjengelighet, tydeligere struktur, mobilforbedringer, bedre produktvisning

Hver forbedring i Fase 2 skal innledes med malen i seksjon 12.

---

## 12. Arbeidsflyt for Claude

Når Claude jobber i dette prosjektet:

1. Følg rekkefølgen i [instruction.md](instruction.md) seksjon "What I want from you":
   1) kort prosjektplan → 2) mappestruktur → 3) full kode → 4) forklaring per fil → 5) 3–5 forbedringsforslag.
2. Lever **komplett** kode per fil — ingen `// ...` placeholders.
3. Hold koden enkel nok til at en lærer kan lese og forstå hver linje.
4. Hvis et valg er uklart, foreslå det enkleste alternativet før noe komplekst legges til.
5. Når noe legges til som ikke står i denne filen, oppdater `CLAUDE.md` slik at dokumentet alltid speiler prosjektets faktiske tilstand.

### Use case-drevet implementasjon (spesielt Fase 2)

Før hver meningsfull forbedring skriver Claude kort i denne strukturen, og *deretter* implementerer endringen:

```
User story:
Som <type bruker>
ønsker jeg <å gjøre noe>
slik at <verdi / løser et problem>

Use case:
<kort verb-basert use case>

Improvement:
<hva som legges til eller forbedres nå>
```

### Git / GitHub-arbeidsflyt

- Claude lager en git commit etter hver meningsfull arbeidsenhet.
- Claude pusher til GitHub når repo-tilgang / auth er tilgjengelig. Hvis push ikke er mulig, lag likevel lokal commit og si tydelig fra at push var utilgjengelig.
- Commit-meldinger skal være korte, tydelige og følge conventional commits.

Eksempler:
- `feat: create homepage layout`
- `feat: add honey product cards`
- `feat: add about us section`
- `feat: add contact section`
- `fix: improve mobile navigation`
- `feat: add form validation`
- `refactor: clean up section structure`

Etter hver commit skriver Claude en kort forklaring:
- hva som ble endret
- hvilken user story / use case dette støtter

### Ærlighet

- Ikke fals forfatterskap, commit-historikk eller datoer.
- Organiser arbeidet som *faser*, ikke som en oppdiktet tidslinje.

### Minimal endring

- Ved oppdatering av denne filen eller eksisterende kode: gjør de minste rene endringene som trengs.
- Ikke dupliser seksjoner som allerede finnes — flett og forbedre i stedet.

---

## 13. Skole-leveranse

Prosjektet skal være lett å bruke til:
- Brukerhistorier (user stories)
- Aktører (actors)
- Use cases + use case-diagram
- Refleksjon over forbedringer

Derfor skal hver synlige funksjon kunne beskrives som en klar brukerhandling (f.eks. *"Som besøkende vil jeg se alle honningsorter slik at jeg kan velge en jeg liker"*).

Hele leveransedokumentet — user stories, aktører, use case-diagram, funksjonelle krav, læringsmål og KI-logg — ligger samlet i [PRODUKTDOKUMENTASJON.md](PRODUKTDOKUMENTASJON.md). Når nye Fase 2-forbedringer legges til, skal tilhørende user story / use case / commit-referanse også oppdateres der.
