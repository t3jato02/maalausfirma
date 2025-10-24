export const FAQS = [
  {
    q: "Mitä palveluja tarjoatte?",
    a: "Tarjoamme julkisivutyöt, maalaustyöt (sisä- ja ulko), peltikattojen maalaukset, tasoitetyöt, rappaustyöt, parvekekorjaukset ja parvekeremontit sekä huoneistoremontit.",
    keywords: ["palvelut", "mitä teette", "tarjoatte", "remontit", "maalaus", "rappaus", "julkisivu", "tasoitus", "parveke"]
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
  let best = null
  let bestScore = 0
  for (const item of FAQS) {
    const qScore = score(text, item.q.toLowerCase())
    const kwScore = (item.keywords||[]).reduce((acc, kw) => acc + (text.includes(kw.toLowerCase()) ? 1 : 0), 0)
    const total = qScore + kwScore
    if (total > bestScore) { bestScore = total; best = item }
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
