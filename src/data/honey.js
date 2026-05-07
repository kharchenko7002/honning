// Single source of truth for the 6 honey products.
// Imported by Home (featured) and Honning (full grid).
// Images are external Unsplash links — keep alt text on the consumer side.

const honeys = [
  {
    id: 'blomster',
    navn: 'Blomsterhonning',
    beskrivelse:
      'Mild og blomstrete honning fra enger og frukthager rundt gården. En myk start om du er ny til lokal honning.',
    pris: 129,
    bilde:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=70',
    smak: 'Mild og blomstrete',
  },
  {
    id: 'skog',
    navn: 'Skogshonning',
    beskrivelse:
      'Mørk og fyldig, med tydelig preg av gran og bringebærkratt. Passer godt til ost, te og mørkt brød.',
    pris: 149,
    bilde:
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=70',
    smak: 'Kraftig og skogspreget',
  },
  {
    id: 'lyng',
    navn: 'Lynghonning',
    beskrivelse:
      'En av Norges mest særegne honninger. Tykk konsistens og en frisk, lett bitter ettersmak fra røsslyng.',
    pris: 179,
    bilde:
      'https://images.unsplash.com/photo-1558640476-437a2b9438a2?auto=format&fit=crop&w=800&q=70',
    smak: 'Kraftig og særpreget',
  },
  {
    id: 'sommer',
    navn: 'Sommerhonning',
    beskrivelse:
      'Lys, klar og søt — høstet midt i juli når engene står i full blomst. Vår favoritt på en skive.',
    pris: 139,
    bilde:
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=70',
    smak: 'Søt og frisk',
  },
  {
    id: 'fjell',
    navn: 'Fjellhonning',
    beskrivelse:
      'Aromatisk honning fra kuber satt opp mot snaufjellet. Tydelige urtenoter og en lang, ren ettersmak.',
    pris: 169,
    bilde:
      'https://images.unsplash.com/photo-1582126892906-5ba111ea25b3?auto=format&fit=crop&w=800&q=70',
    smak: 'Urteaktig og ren',
  },
  {
    id: 'krem',
    navn: 'Kremhonning',
    beskrivelse:
      'Rørt honning med myk, smørbar konsistens. Smelter fint på ferskt brød eller i en kopp varm te.',
    pris: 139,
    bilde:
      'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=800&q=70',
    smak: 'Mild og smørbar',
  },
];

export default honeys;
