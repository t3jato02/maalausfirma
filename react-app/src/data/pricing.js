// Very rough painter pricing heuristics for chatbot responses
// All values are indicative ranges, exclude materials unless noted, and vary by site conditions.

export const HOURLY_RATE = { min: 49, max: 65, currency: '€', note: '+ alv 25.5% (tyypillinen vaihteluväli)' }

// Per-unit rough ranges (labor) — extremely coarse, for quick ballpark only
export const PRICE_RANGES = {
  sisaseinat: { unit: 'm²', min: 7, max: 14, label: 'Sisäseinien maalaus (1–2 krt, kevyt esikäsittely)' },
  sisakatot: { unit: 'm²', min: 8, max: 16, label: 'Sisäkattojen maalaus' },
  ruiskukatto: { unit: 'm²', min: 9, max: 18, label: 'Ruiskukaton maalaus' },
  tapetointi: { unit: 'm²', min: 15, max: 30, label: 'Tapetointi (tasainen alusta)' },
  tapetin_poisto_tasoitus: { unit: 'm²', min: 12, max: 25, label: 'Tapetin poisto ja taustan tasoitus' },
  peltikatto: { unit: 'm²', min: 15, max: 30, label: 'Peltikaton maalaus (pesu + pohjat)' },
  julkisivu_puu: { unit: 'm²', min: 12, max: 24, label: 'Julkisivu, puu (pintamaalaus)' },
  julkisivu_rappaus: { unit: 'm²', min: 14, max: 28, label: 'Julkisivu, rappaus (pintamaalaus)' },
  betonilattia: { unit: 'm²', min: 12, max: 25, label: 'Betonilattian maalaus/pinnoitus' },
  kipsi_maalivalmis: { unit: 'm²', min: 18, max: 35, label: 'Kipsilevystä valmiiseen maalipintaan (tasoitus + maalaus)' },
  kipsi_ruiskukatto: { unit: 'm²', min: 16, max: 32, label: 'Kipsilevystä valmiiseen ruiskukattopintaan' },
  ovi: { unit: 'kpl', min: 60, max: 120, label: 'Ovien maalaus' },
  ikkuna: { unit: 'kpl', min: 80, max: 160, label: 'Ikkunoiden maalaus (sisä/ulkop.)' }
}

const KEYWORDS = [
  { id: 'sisaseinat', words: ['sisämaalaus','sisäsein','seinä','seinän maalaus'] },
  { id: 'sisakatot', words: ['katto','sisäkatto','katon maalaus'] },
  { id: 'ruiskukatto', words: ['ruiskukatto','ruiskupinta','struktuurikato','ruiskukaton maalaus'] },
  { id: 'tapetointi', words: ['tapetti','tapetointi','tapetoida'] },
  { id: 'tapetin_poisto_tasoitus', words: ['tapetin poisto','tapetinpoisto','taustan tasoitus','pohjatasoitus','tapetti pois'] },
  { id: 'peltikatto', words: ['peltikatto','peltikaton','katon maalaus peltikatto'] },
  { id: 'julkisivu_puu', words: ['julkisivu','puujulkisivu','paneeli','hirsiseinä'] },
  { id: 'julkisivu_rappaus', words: ['rappaus','rapattu','mineraalipinta','julkisivu rappaus'] },
  { id: 'betonilattia', words: ['betonilattia','lattian maalaus','lattiapinnoitus','epoksi','polyuretaani'] },
  { id: 'kipsi_maalivalmis', words: ['kipsilevy','kipsilevystä','maalivalmis','tasoitus ja maalaus','saumaus','hionta','pohjamaalaus'] },
  { id: 'kipsi_ruiskukatto', words: ['kipsilevy ruiskukatto','ruiskukatto valmis','ruiskukaton teko','ruiskukatto kipsi'] },
  { id: 'ovi', words: ['ovi','ovien maalaus'] },
  { id: 'ikkuna', words: ['ikkuna','ikkunoiden maalaus'] }
]

const PRICE_INTENT_WORDS = ['hinta','hinnat','maksaa','kustannus','kustannusarvio','€/','euro','urakka','tuntiveloitus','tuntihinta']

function parseNumberWithUnit(text){
  const t = text.toLowerCase()
  // area
  const m2 = /([0-9]+(?:[\.,][0-9]+)?)\s*(m2|m\^2|m²)/i.exec(t)
  if (m2) return { type: 'area', value: parseFloat(m2[1].replace(',', '.')) }
  // pieces
  const kpl = /([0-9]+)\s*(kpl|kappale)/i.exec(t)
  if (kpl) return { type: 'pieces', value: parseFloat(kpl[1]) }
  // rooms (approximate area per room 12 m² if not stated)
  const huone = /([0-9]+)\s*(huone|huonetta)/i.exec(t)
  if (huone) return { type: 'area', value: parseFloat(huone[1]) * 12, approx: true }
  // apartment (assume 1h+k ~35 m², 2h+k ~50 m², 3h+k ~70 m² if numbers present)
  const asunto = /([1-4])\s*h\s*\+\s*k/i.exec(t)
  if (asunto) {
    const map = {1:35,2:50,3:70,4:85}
    const rooms = parseInt(asunto[1],10)
    return { type: 'area', value: map[rooms]||50, approx: true }
  }
  return null
}

function detectCategory(text){
  const t = text.toLowerCase()
  for (const k of KEYWORDS){
    if (k.words.some(w => t.includes(w))) return k.id
  }
  return null
}

export function estimatePricing(userText){
  const t = (userText||'').toLowerCase()
  const hasPriceIntent = PRICE_INTENT_WORDS.some(w => t.includes(w))
  const qty = parseNumberWithUnit(t)
  const cat = detectCategory(t)

  if (!hasPriceIntent && !qty && !/tunti(hinta|veloitus)/.test(t)) return null

  // If user asks directly for hourly rate
  if (/tunti(hinta|veloitus)/.test(t)){
    return [
      `Maalarin tuntiveloitus: noin ${HOURLY_RATE.min}–${HOURLY_RATE.max}${HOURLY_RATE.currency} ${HOURLY_RATE.note}.`,
      'Hinta tarkentuu kohteen mukaan; pienissä töissä minimiveloitus voi soveltua.'
    ].join('\n')
  }

  // Category-based estimate
  if (cat){
    const cfg = PRICE_RANGES[cat]
    if (cfg){
      if (qty && ((qty.type==='area' && cfg.unit==='m²') || (qty.type==='pieces' && cfg.unit==='kpl'))){
        const min = Math.round(qty.value * cfg.min)
        const max = Math.round(qty.value * cfg.max)
        return [
          `${cfg.label}: ${cfg.min}–${cfg.max} ${HOURLY_RATE.currency}/${cfg.unit} (työ)`,
          `Arvioitu työ: ~${min}–${max} ${HOURLY_RATE.currency} ${qty.approx ? '(pinta-ala arvioitu)' : ''}`,
          'Materiaalit ja mahdolliset suojaukset/telineet erikseen. Karkea arvio – tarkentuu katselmuksessa.'
        ].join('\n')
      }
      // No quantity provided
      return [
        `${cfg.label}: ${cfg.min}–${cfg.max} ${HOURLY_RATE.currency}/${cfg.unit} (työ).`,
        `Tuntiveloitus: ${HOURLY_RATE.min}–${HOURLY_RATE.max}${HOURLY_RATE.currency} ${HOURLY_RATE.note}.`,
        'Pyydä tarjous – annamme tarkan arvion kohteen tietojen perusteella.'
      ].join('\n')
    }
  }

  // Generic fallback summary if only price intent present
  return [
    `Tuntiveloitus: ${HOURLY_RATE.min}–${HOURLY_RATE.max}${HOURLY_RATE.currency} ${HOURLY_RATE.note}.`,
    'Yleisimmät karkeat työhinnat:',
    `• Sisäseinät: ${PRICE_RANGES.sisaseinat.min}–${PRICE_RANGES.sisaseinat.max} ${HOURLY_RATE.currency}/m²`,
    `• Sisäkatot: ${PRICE_RANGES.sisakatot.min}–${PRICE_RANGES.sisakatot.max} ${HOURLY_RATE.currency}/m²`,
    `• Ruiskukatto: ${PRICE_RANGES.ruiskukatto.min}–${PRICE_RANGES.ruiskukatto.max} ${HOURLY_RATE.currency}/m²`,
    `• Tapetointi: ${PRICE_RANGES.tapetointi.min}–${PRICE_RANGES.tapetointi.max} ${HOURLY_RATE.currency}/m²`,
    `• Tapetin poisto + tasoitus: ${PRICE_RANGES.tapetin_poisto_tasoitus.min}–${PRICE_RANGES.tapetin_poisto_tasoitus.max} ${HOURLY_RATE.currency}/m²`,
    `• Peltikatto: ${PRICE_RANGES.peltikatto.min}–${PRICE_RANGES.peltikatto.max} ${HOURLY_RATE.currency}/m²`,
    `• Julkisivu (puu): ${PRICE_RANGES.julkisivu_puu.min}–${PRICE_RANGES.julkisivu_puu.max} ${HOURLY_RATE.currency}/m²`,
    `• Julkisivu (rappaus): ${PRICE_RANGES.julkisivu_rappaus.min}–${PRICE_RANGES.julkisivu_rappaus.max} ${HOURLY_RATE.currency}/m²`,
    `• Kipsilevy → maalivalmis (tasoitus+maalaus): ${PRICE_RANGES.kipsi_maalivalmis.min}–${PRICE_RANGES.kipsi_maalivalmis.max} ${HOURLY_RATE.currency}/m²`,
    `• Kipsilevy → ruiskukattopinta: ${PRICE_RANGES.kipsi_ruiskukatto.min}–${PRICE_RANGES.kipsi_ruiskukatto.max} ${HOURLY_RATE.currency}/m²`,
    `• Ovet: ${PRICE_RANGES.ovi.min}–${PRICE_RANGES.ovi.max} ${HOURLY_RATE.currency}/kpl`,
    `• Ikkunat: ${PRICE_RANGES.ikkuna.min}–${PRICE_RANGES.ikkuna.max} ${HOURLY_RATE.currency}/kpl`,
    'Huom: Arviot erittäin karkeita; materiaalit, telineet ja esikäsittelyt vaikuttavat. Tarjous täsmentää.'
  ].join('\n')
}

// Room bundle estimate: walls + ceiling, optional floor, from floor area and wall height
export function estimateRoomAllSurfaces(floorAreaM2, wallHeightM = 2.6, includeFloor = false){
  const A = Math.max(0, Number(floorAreaM2)||0)
  const h = Math.max(2, Number(wallHeightM)||2.6)
  if (!A) return null
  const side = Math.sqrt(A)
  const perimeter = 4 * side
  const wallArea = Math.round(perimeter * h)
  const ceilingArea = Math.round(A)
  const floorArea = includeFloor ? Math.round(A) : 0
  const w = PRICE_RANGES.sisaseinat
  const c = PRICE_RANGES.sisakatot
  const f = PRICE_RANGES.betonilattia
  const wallMin = wallArea * w.min, wallMax = wallArea * w.max
  const ceilMin = ceilingArea * c.min, ceilMax = ceilingArea * c.max
  const floorMin = floorArea ? floorArea * f.min : 0
  const floorMax = floorArea ? floorArea * f.max : 0
  const totalMin = Math.round(wallMin + ceilMin + floorMin)
  const totalMax = Math.round(wallMax + ceilMax + floorMax)
  const lines = [
    `Huoneen kaikki pinnat (arvio):`,
    `• Seinät ~${wallArea} m² × ${w.min}–${w.max} €/m² → ~${Math.round(wallMin)}–${Math.round(wallMax)} €`,
    `• Katto ~${ceilingArea} m² × ${c.min}–${c.max} €/m² → ~${Math.round(ceilMin)}–${Math.round(ceilMax)} €`,
  ]
  if (includeFloor) lines.push(`• Lattia ~${floorArea} m² × ${f.min}–${f.max} €/m² → ~${Math.round(floorMin)}–${Math.round(floorMax)} €`)
  lines.push(
    `Yhteensä (työ, ilman materiaaleja): ~${totalMin}–${totalMax} €`,
    `Huom: Erittäin karkea arvio. Esikäsittelyt, materiaalit ja suojaukset/telineet erikseen.`
  )
  return lines.join('\n')
}
