// Authoritative sources for painting methods, productivities, pricing, indices, and budgeting
// Provided by user, used by the chatbot to reference methodology and links.

export const SOURCES = [
  {
    id: 'maalausryl',
    title: 'MaalausRYL 2012 – yleisohje',
    url: 'https://www.rakennustietokauppa.fi/sivu/tuote/maalausryl-2012/115430',
    what: 'Menetelmät, käsittely-yhdistelmät, laatuvaatimukset.',
    whereToSearch: ['käsittely-yhdistelmät', 'alusta + maalityyppi', 'laatuvaatimukset'],
    notes: 'RYL on maksullinen/tilattava, käytä myös valmistajien ohjeita (Tikkurila/Teknos) RYL-pohjaisesti.'
  },
  {
    id: 'ratu',
    title: 'Ratu-kortit – menekit',
    url: 'https://kortistot.rakennustieto.fi/',
    example: 'https://kortistot.rakennustieto.fi/kortit/Ratu%2073-0092',
    what: 'Työmenetelmät ja menekit (tuottavuus) tunti- ja €/m²-laskentaan.',
    whereToSearch: ['Ratu + maalaus menekit', 'sisämaalaus', 'tapetointi', 'julkisivu']
  },
  {
    id: 'tes',
    title: 'Maalausalan TES 2025–2028 – urakkahinnoittelu',
    url: 'https://www.pintaurakoitsijat.fi/site/assets/files/4485/maalausalantes_2025_2028_netti.pdf',
    what: 'Perushintataulukot ja työlajikohtaiset urakkaohjeet (seinä/katto, ovet, ikkunat, julkisivut).',
    whereToSearch: ['Perushintataulukko', 'Seinä- ja kattopintojen maalaustyöt', 'Urakkatyön mittaaminen']
  },
  {
    id: 'urakkamaailma',
    title: 'Urakkamaailma – toteutuneiden urakoiden hintahaarukat',
    url: 'https://www.urakkamaailma.fi/remonttien-hinnat/maalaustyot',
    extra: 'https://www.urakkamaailma.fi/remonttien-hinnat/maalaustyot/sisamaalaus',
    what: 'Markkinatason esimerkkihinnat ja hintahaarukat.',
    whereToSearch: ['Maalaustyöt – katso hinta', 'sisämaalaus', 'julkisivu', 'katto']
  },
  {
    id: 'haahtela',
    title: 'Haahtela – Kustannustieto / TAKU',
    url: 'https://www.haahtela.fi/tuotteet',
    what: 'Budjetointiin ja tavoitehintoihin soveltuva kustannuspohja (maksullinen).',
    whereToSearch: ['Kustannustieto TAKU', 'budjetointi', 'tavoitehinta']
  },
  {
    id: 'rki',
    title: 'Tilastokeskus – Rakennuskustannusindeksi (RKI)',
    url: 'https://stat.fi/tilasto/rki',
    what: 'Kustannustason muutos kuukausittain; käytä hintojen indeksikorjaukseen.',
    whereToSearch: ['Rakennuskustannusindeksi', 'viimeisin kuukausi', 'aineistot/taulukot']
  },
  {
    id: 'tikkurila',
    title: 'Tikkurila PRO – RYL-pohjaiset käsittely-yhdistelmät',
    url: 'https://tikkurila.fi/pro',
    what: 'Käsittely-yhdistelmät ja työselosteet sekä tuotekortit.',
    whereToSearch: ['MaalausRYL (hakutyökalu)', 'maalausmenetelmät', 'tuotekortit']
  },
  {
    id: 'teknos',
    title: 'Teknos – maalausohjeet',
    url: 'https://www.teknos.com/fi-FI/kuluttajat-ja-ammattilaiset/maalausohjeet/',
    what: 'Sisä- ja ulkomaalauksen vaiheittaiset menetelmät ja työohjeet.',
    whereToSearch: ['Sisämaalausohjeet', 'Ulkomaalausohjeet', 'materiaalikohtaiset sivut']
  }
]

export const METHODOLOGY_STEPS = [
  '1) Menetelmä: poimi RYL/Tikkurila/Teknos -ohjeista oikea käsittely-yhdistelmä alustan ja maalityypin mukaan.',
  '2) Menekki: arvioi Ratu-korteista (tuottavuus) työn menekki tunti- ja m²-tasolla.',
  '3) Hinta-arvio: perusta TES-urakkahinnoitteluun tai urakkaesimerkkeihin (Urakkamaailma).',
  '4) Indeksikorjaus: korjaa hintataso viimeisimmällä RKI:llä (Tilastokeskus).',
  '5) Budjetti: tarjoa budjettitason vaihtoehto Haahtelan kustannuspohjalla (TAKU).' 
]
