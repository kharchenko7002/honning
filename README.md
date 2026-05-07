# Solhaug Honninggård 🍯

Skoleprosjekt — en enkel, responsiv presentasjonsside for det fiktive birøkteriet **Solhaug Honninggård** i Innlandet.

Bygget med **React + Vite + Tailwind CSS**. All synlig tekst er på norsk bokmål. Kommentarer i koden er korte og på engelsk.

---

## Innhold

- [Funksjoner](#funksjoner)
- [Teknisk stack](#teknisk-stack)
- [Komme i gang](#komme-i-gang)
- [Mappestruktur](#mappestruktur)
- [Sider og ruter](#sider-og-ruter)
- [Forslag til neste fase](#forslag-til-neste-fase)

---

## Funksjoner

- 5 sider: **Hjem**, **Honning**, **Om oss**, **Hvor finner du oss**, **Kontakt**
- Responsiv navigasjon med hamburger-meny på mobil
- 6 honningsorter med navn, smaks-label, beskrivelse, pris og bilde
- "Bestill nå"-knapp som tar deg til kontaktsiden og forhåndsfyller meldingen med produktnavnet
- Kontaktskjema med klient-side validering (navn, e-post, melding) som åpner mailto-lenke
- Tilgjengelighet: semantisk HTML, `lang="nb"`, alt-tekster, label-koblede skjemafelter, synlig fokus-ring
- Mobil først, varm honnings-palett, Playfair Display + Inter

---

## Teknisk stack

| Verktøy | Bruk |
|---|---|
| React 18 | Komponentmodell |
| Vite | Dev-server og bygging |
| React Router DOM 6 | Navigasjon mellom sider |
| Tailwind CSS 3 | Styling med utility-klasser |
| Google Fonts | Playfair Display + Inter |
| Unsplash | Eksterne produktbilder |

Ingen ekstra biblioteker, ingen state-management, ingen icon-pakker — kun inline SVG og emoji.

---

## Komme i gang

Du trenger **Node.js 18+** og **npm**.

```bash
# 1. Installer avhengigheter
npm install

# 2. Start dev-server (åpnes på http://localhost:5173)
npm run dev

# 3. Bygg produksjonsversjon
npm run build

# 4. Forhåndsvis byggen lokalt
npm run preview
```

---

## Mappestruktur

```
solhaug-honning/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx        # Sticky topp-meny + mobil hamburger
│  │  ├─ Footer.jsx        # Tre kolonner: merke, lenker, kontakt
│  │  ├─ Layout.jsx        # Header + <Outlet /> + Footer + scroll-to-top
│  │  ├─ Hero.jsx          # Hero-seksjon på forsiden
│  │  ├─ HoneyCard.jsx     # Produktkort med "Bestill nå"
│  │  └─ ContactForm.jsx   # Skjema med validering + mailto
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Honning.jsx
│  │  ├─ OmOss.jsx
│  │  ├─ HvorFinnerDuOss.jsx
│  │  └─ Kontakt.jsx
│  ├─ data/
│  │  └─ honey.js          # Array med 6 honningsorter
│  ├─ App.jsx              # Router-konfig
│  ├─ main.jsx             # Mount + BrowserRouter
│  └─ index.css            # Tailwind directives + globale stiler
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
├─ index.html              # <html lang="nb">
└─ package.json
```

---

## Sider og ruter

| Path | Komponent | Innhold |
|---|---|---|
| `/` | `Home` | Hero, kort om gården, utvalgte produkter, CTA |
| `/honning` | `Honning` | Alle 6 honningsorter i grid |
| `/om-oss` | `OmOss` | Hvem vi er, hvor honningen kommer fra, hva som gjør den spesiell |
| `/hvor-finner-du-oss` | `HvorFinnerDuOss` | Adresse, åpningstider, OpenStreetMap-iframe |
| `/kontakt` | `Kontakt` | Kontaktskjema + bedriftsinfo |

Alle sider deler samme `Layout` (header + footer).

---

## Brukerhistorier (utvalg)

- *Som besøkende vil jeg se alle honningsorter slik at jeg kan velge en jeg liker.*
- *Som besøkende vil jeg lese om gården slik at jeg vet hvem jeg kjøper fra.*
- *Som besøkende vil jeg finne adresse og åpningstider slik at jeg kan komme innom.*
- *Som besøkende vil jeg sende en forespørsel slik at jeg kan bestille honning.*
- *Som besøkende vil jeg trykke "Bestill nå" på et produkt slik at meldingen er ferdig utfylt.*

Disse brukes som grunnlag for use cases og use case-diagram i Fase 2.

---

## Forslag til neste fase

Disse er bevisst **ikke** implementert i Fase 1 — de er beskrevet her som utviklingsforslag for skoleprosjektets Fase 2:

1. **Filtrering og søk på honning-siden** — la besøkende filtrere etter smak (mild, kraftig, urteaktig) eller pris.
2. **Bedre skjemavalidering og bekreftelsesside** — eksplisitt bekreftelsesside etter sending, lagring i `localStorage` for å huske utkast.
3. **Detaljside per honningsort** (`/honning/:id`) — egen rute med større bilde, smaksprofil og forslag til bruk.
4. **Tilgjengelighetsforbedringer** — "skip to content"-lenke, forbedrede ARIA-attributter på mobilmeny, full WCAG AA-revisjon.
5. **Backend-integrasjon** — koble kontaktskjemaet til en e-posttjeneste (Formspree, EmailJS) i stedet for `mailto`.
6. **i18n** — legge til engelsk versjon for turister.

---

## Lisens

Skoleprosjekt — kun for utdanningsformål. Bilder er hentet fra Unsplash under deres frie lisens. All forretningsinformasjon er fiktiv.
