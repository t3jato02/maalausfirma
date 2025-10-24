import { findKnowledge } from './knowledge'
import { estimatePricing, HOURLY_RATE, PRICE_RANGES } from './pricing'
import { SOURCES, METHODOLOGY_STEPS } from './sources'

export const FAQS = [
  {
    q: "Mitä palveluja tarjoatte?",
    a: "Tarjoamme julkisivutyöt, maalaustyöt (sisä- ja ulko), peltikattojen maalaukset, tasoitetyöt, rappaustyöt, parvekekorjaukset ja parvekeremontit sekä huoneistoremontit.",
    keywords: ["palvelut", "mitä teette", "tarjoatte", "remontit", "maalaus", "rappaus", "julkisivu", "tasoitus", "parveke"]
  },
  {
    q: "Mikä on maalarin tuntiveloitus?",
    a: `Maalarin tuntiveloitus on tyypillisesti noin ${HOURLY_RATE.min}–${HOURLY_RATE.max}${HOURLY_RATE.currency} ${HOURLY_RATE.note}. Hinta tarkentuu kohteen mukaan; pienissä töissä minimiveloitus voi soveltua.` ,
    keywords: ["tuntiveloitus","tuntihinta","€","hinta"]
  },
  {
    q: "Karkea kustannusarvio yleisimmille töille?",
    a: [
      `Tuntiveloitus: ${HOURLY_RATE.min}–${HOURLY_RATE.max}${HOURLY_RATE.currency} ${HOURLY_RATE.note}.`,
      `• Sisäseinät: ${PRICE_RANGES.sisaseinat.min}–${PRICE_RANGES.sisaseinat.max} ${HOURLY_RATE.currency}/m²`,
      `• Sisäkatot: ${PRICE_RANGES.sisakatot.min}–${PRICE_RANGES.sisakatot.max} ${HOURLY_RATE.currency}/m²`,
      `• Tapetointi: ${PRICE_RANGES.tapetointi.min}–${PRICE_RANGES.tapetointi.max} ${HOURLY_RATE.currency}/m²`,
      `• Peltikatto: ${PRICE_RANGES.peltikatto.min}–${PRICE_RANGES.peltikatto.max} ${HOURLY_RATE.currency}/m²`,
      `• Julkisivu (puu): ${PRICE_RANGES.julkisivu_puu.min}–${PRICE_RANGES.julkisivu_puu.max} ${HOURLY_RATE.currency}/m²`,
      `• Julkisivu (rappaus): ${PRICE_RANGES.julkisivu_rappaus.min}–${PRICE_RANGES.julkisivu_rappaus.max} ${HOURLY_RATE.currency}/m²`,
      `• Ovet: ${PRICE_RANGES.ovi.min}–${PRICE_RANGES.ovi.max} ${HOURLY_RATE.currency}/kpl`,
      `• Ikkunat: ${PRICE_RANGES.ikkuna.min}–${PRICE_RANGES.ikkuna.max} ${HOURLY_RATE.currency}/kpl`,
      'Huom: Arviot erittäin karkeita; materiaalit, telineet ja esikäsittelyt vaikuttavat. Pyydä tarjous.'
    ].join('\n'),
    keywords: ["kustannusarvio","hinta","paljonko maksaa","urakka","€","m2","m²"]
  },
  {
    q: "Mistä löydän oikean käsittely-yhdistelmän?",
    a: [
      'Käytä RYL/Tikkurila/Teknos -ohjeita alustan ja maalityypin mukaan:',
      `• MaalausRYL: ${SOURCES.find(s=>s.id==='maalausryl').url}`,
      `• Tikkurila PRO: ${SOURCES.find(s=>s.id==='tikkurila').url}`,
      `• Teknos ohjeet: ${SOURCES.find(s=>s.id==='teknos').url}`
    ].join('\n'),
    keywords: ["käsittely-yhdistelmä","ryl","tikkurila","teknos","menetelmä","työseloste"]
  },
  {
    q: "Mistä löydän menekit (tuottavuus)?",
    a: [
      'Menekit löytyvät Ratu-korteista (tuottavuus m²/h):',
      `• Ratu-kortit: ${SOURCES.find(s=>s.id==='ratu').url}`,
      `• Esimerkki: ${SOURCES.find(s=>s.id==='ratu').example}`
    ].join('\n'),
    keywords: ["menekki","ratu","tuottavuus","m2/h","maalaus menekit"]
  },
  {
    q: "Miten teette hinta-arvion?",
    a: [
      'Hinta-arvio muodostetaan näin:',
      ...METHODOLOGY_STEPS,
      '',
      `TES-urakat: ${SOURCES.find(s=>s.id==='tes').url}`,
      `Esimerkkihinnat: ${SOURCES.find(s=>s.id==='urakkamaailma').url}`
    ].join('\n'),
    keywords: ["hinta","arvio","kustannus","tes","urakkamaailma","budjetti","takuu"]
  },
  {
    q: "Miten teen indeksikorjauksen?",
    a: [
      'Indeksikorjaus: sovella Tilastokeskuksen RKI:n muutosprosenttia lähtöhintaan (sopimusehdon mukaan).',
      `• Rakennuskustannusindeksi (RKI): ${SOURCES.find(s=>s.id==='rki').url}`
    ].join('\n'),
    keywords: ["indeksi","rki","tilastokeskus","indeksikorjaus","rakennuskustannusindeksi"]
  },
  {
    q: "Teettekö budjettiarvion?",
    a: [
      'Kyllä. Voimme laatia budjettitason arvion kohteen tiedoilla ja Haahtelan kustannuspohjaa hyödyntäen.',
      `• Haahtela TAKU: ${SOURCES.find(s=>s.id==='haahtela').url}`
    ].join('\n'),
    keywords: ["budjetti","haahtela","taku","budjetointiin","tavoitehinta"]
  },
  {
    q: "Mitkä ovat lähteet?",
    a: [
      'Keskeiset lähteet (linkit):',
      ...SOURCES.map(s => `• ${s.title}: ${s.url}`)
    ].join('\n'),
    keywords: ["lähde","lähteet","linkit","ohje","missä"]
  },
  {
    q: "Teettekö homepesuja?",
    a: "Kyllä. Teemme homepesun ja käsittelyn homeensuoja-aineella tarvittaessa ennen maalausta.",
    keywords: ["homepesu","home","pesu","homeen suoja"]
  },
  {
    q: "Miten julkisivusaneeraus etenee?",
    a: "Julkisivusaneeraus suunnitellaan kohdekohtaisesti ja toteutetaan työselostusten mukaisesti yhteistyössä taloyhtiön hallituksen ja isännöitsijän kanssa.",
    keywords: ["julkisivusaneeraus","työselostus","hallitus","isännöitsijä"]
  },
  {
    q: "Teettekö harkkotalojen rappauksia?",
    a: "Kyllä. Rappaamme Siporex-, kevytsora- ja EPS-pinnat ammattitaidolla.",
    keywords: ["harkkotalo","siporex","kevytsora","eps","rappaus"]
  },
  {
    q: "Mitä parvekekorjaukset sisältävät?",
    a: "Parvekkeiden pintakorjaukset elementti- ja ulokeparvekkeisiin sekä hiekkapuhallus ja maalaus puhdistusta vaativille pinnoille.",
    keywords: ["parveke","pintakorjaus","hiekkapuhallus","maalaus"]
  },
  {
    q: "Teettekö vesieristyksiä ja laatoituksia?",
    a: "Kyllä. Huoneistoremonteissa teemme kylpyhuoneiden ja keittiöiden vesieristykset ja laatoitukset.",
    keywords: ["vesieristys","laatoitus","kylpyhuone","keittiö"]
  },
  {
    q: "Millä alueella toimitte?",
    a: "Toimimme Oulussa ja koko Pohjois-Pohjanmaan alueella.",
    keywords: ["alue", "missä", "oulu", "pohjois-pohjanmaa", "toimialue"]
  },
  {
    q: "Miten voin pyytää tarjouksen?",
    a: "Voit lähettää viestin chatin kautta (Ota yhteyttä), täyttää etusivun lomakkeen tai soittaa numeroon 0400 580 172.",
    keywords: ["tarjous", "pyyntö", "hinta", "ota yhteyttä", "viesti"]
  },
  {
    q: "Teettekö peltikattojen maalauksia?",
    a: "Kyllä. Teemme peltikattojen maalaukset alusta loppuun pesuineen ja pohjatöineen kestävää jälkeä varten.",
    keywords: ["peltikatto", "katto", "maalaus", "katon maalaus"]
  },
  {
    q: "Asennatteko kattoturvatuotteita (kattotikkaat, kulkusillat, lumiesteet)?",
    a: "Kyllä. Asennamme kattoturvatuotteet (kattotikkaat, kulkusillat, lumiesteet) määräysten mukaisesti Oulussa ja koko Pohjois-Pohjanmaalla. Ota yhteyttä tarjousta varten.",
    keywords: ["kattoturvatuotteet","kattotikkaat","kulkusilta","lumieste","katto turvatuote","turvatuote"]
  },
  {
    q: "Teettekö parvekekorjauksia tai parvekeremontteja?",
    a: "Kyllä. Teemme parvekkeiden pintakorjaukset, hiekkapuhallukset ja maalaukset sekä laajempia parvekeremontteja taloyhtiöille ja muille kiinteistöille.",
    keywords: ["parveke", "parvekekorjaus", "parvekeremontti", "hiekkapuhallus"]
  },
  {
    q: "Käytättekö koneellista tasoitusta?",
    a: "Kyllä. Tasoitetyöt tehdään pääasiassa koneellisesti levy-, betoni- ja harkkopinnoille.",
    keywords: ["tasoitus", "koneellinen", "maalivalmis", "levy", "betoni", "harkko"]
  },
  {
    q: "Kuinka nopeasti työnne valmistuvat?",
    a: "Aikataulut sovitaan kohdekohtaisesti. Suunnittelemme työt etukäteen ja pidämme kiinni sovituista aikatauluista.",
    keywords: ["aikataulu", "kauanko", "nopeus", "valmistuu", "valmistuminen"]
  },
  {
    q: "Onko työllä takuu?",
    a: "Kyllä. Laadukas työnjälki ja kestävät materiaalit ovat keskiössä. Työlle myönnetään kohdekohtainen takuu.",
    keywords: ["takuu", "laatu", "kestävyys", "vastuu"]
  },
  {
    q: "Miten hinnoittelu toimii?",
    a: "Hinnoittelu perustuu kohteen laajuuteen, materiaaleihin ja työmenetelmiin. Saat tarkan arvion tarjouksen yhteydessä.",
    keywords: ["hinta", "hinnoittelu", "maksu", "budjetti"]
  }
]

export function findBestAnswer(userText) {
  const text = (userText||"").toLowerCase()
  // Try dynamic very rough pricing first if the user asks about costs
  const pricing = estimatePricing(text)
  if (pricing) return { answer: pricing, confidence: 1 }
  let best = null
  let bestScore = 0
  for (const item of FAQS) {
    const qScore = score(text, item.q.toLowerCase())
    const kwScore = (item.keywords||[]).reduce((acc, kw) => acc + (text.includes(kw.toLowerCase()) ? 1 : 0), 0)
    const total = qScore + kwScore
    if (total > bestScore) { bestScore = total; best = item }
  }
  // If FAQ confidence is low, search the knowledge base
  if (!best || bestScore < 0.4) {
    const { section, score } = findKnowledge(text)
    if (section && score > 0) {
      const bullets = (section.bullets||[]).map(b => `• ${b}`).join('\n')
      const answer = `${section.title}: ${section.summary}${bullets ? `\n${bullets}` : ''}`
      return { answer, confidence: Math.max(bestScore, score) }
    }
  }
  return {answer: best?.a || null, confidence: bestScore}
}

function score(a, b) {
  // simple token overlap score
  const as = a.split(/[^a-zA-ZåäöÅÄÖ-]+/).filter(Boolean)
  const bs = new Set(b.split(/[^a-zA-ZåäöÅÄÖ-]+/).filter(Boolean))
  if (!as.length || !bs.size) return 0
  let match = 0
  for (const t of as) if (bs.has(t)) match++
  return match / Math.max(as.length, bs.size)
}
