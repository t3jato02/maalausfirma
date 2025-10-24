// Paraphrased knowledge base built from the official site content
export const KNOWLEDGE = [
  {
    id: 'maalaustyot',
    title: 'Maalaustyöt',
    summary: 'Maalaustyöt sisällä ja ulkona Oulussa ja Pohjois-Pohjanmaalla. Teemme sekä ruiskumaalauksia että perinteisiä maalauksia eri pinnoille.',
    bullets: [
      'Sisämaalaus: katot, seinät, lattiat, märkätilat, ikkunat, ovet ja kalusteet. Pinnan ikä ja kunto huomioidaan.',
      'Ulkomaalaus: parvekkeet, katot, seinät, metallipinnat, sokkelit sekä piharakenteet.',
      'Peltikattojen maalaus: pesu, pohjatyöt ja maalaus kestävällä lopputuloksella.',
      'Homepesu: tarvittaessa ennen maalausta, käsittely homeensuojalla.'
    ],
    keywords: ['maalaus','sisämaalaus','ulkomaalaus','peltikatto','homepesu','ruiskumaalaus']
  },
  {
    id: 'kattoturvatuotteet',
    title: 'Kattoturvatuotteet',
    summary: 'Kattotikkaat, kulkusillat, lumiesteet ja muut kattoturvatuotteet asennettuna määräysten mukaisesti Oulussa ja Pohjois-Pohjanmaalla.',
    bullets: [
      'Kattotikkaat: turvallinen kulku katolle huoltoa ja tarkastuksia varten.',
      'Kulkusillat: liikkuminen katolla turvallisesti ja katon pintaa säästäen.',
      'Lumiesteet: lumen ja jään hallittu pysäyttäminen suojaten alapuolisia kulkuväyliä.'
    ],
    keywords: ['kattoturvatuotteet','kattotikkaat','kulkusilta','lumieste','turvatuote']
  },
  {
    id: 'julkisivutyot',
    title: 'Julkisivutyöt',
    summary: 'Laadukkaat julkisivukorjaukset taloyhtiöille ja muille kiinteistöille Oulussa ja koko Pohjois-Pohjanmaalla.',
    bullets: [
      'Kerrostalojen ja rivitalojen julkisivutyöt työselostusten mukaisesti.',
      'Toimintamalli: suunnittelu ja toteutus yhteistyössä hallituksen ja isännöitsijän kanssa.',
      'Julkisivusaneeraus kohottaa kiinteistön ilmettä ja arvoa.',
      'Saneerausten yhteydessä on järkevää puhdistaa ja maalata myös katot ja parvekkeet.'
    ],
    keywords: ['julkisivu','saneeraus','taloyhtiö','korjaus','isännöitsijä']
  },
  {
    id: 'tasoitetyot',
    title: 'Tasoitetyöt',
    summary: 'Levy-, betoni- ja harkkopintojen tasoitukset ok-taloihin, rivitaloihin ja kerrostaloihin. Työt tehdään pääasiassa koneellisesti.',
    bullets: [
      'Koneellinen tasoitus nopeuttaa ja tasalaatuistaa työn.',
      'Pinnat oikaistaan maalivalmiiksi, kulmat ja liitokset huolellisesti.'
    ],
    keywords: ['tasoitus','koneellinen','levy','betoni','harkko','maalivalmis']
  },
  {
    id: 'rappaustyot',
    title: 'Rappaustyöt',
    summary: 'Rappaustyöt saneeraus- ja uudiskohteisiin Oulussa ja lähialueella.',
    bullets: [
      'Julkisivurappaus: kestävä ja näyttävä ulkopinnan suojaus.',
      'Harkkotalojen rappaus: Siporex-, kevytsora- ja EPS-pinnat.',
      'Työvaiheiden yhteensovitus takaa sujuvan projektin.'
    ],
    keywords: ['rappaus','julkisivurappaus','harkkotalo','siporex','eps']
  },
  {
    id: 'parvekekorjaukset',
    title: 'Parvekekorjaukset',
    summary: 'Parvekekorjaukset kerrostaloihin ja muihin rakennuksiin kustannustehokkaasti Oulun seudulla.',
    bullets: [
      'Parvekkeiden pintakorjaukset elementti- ja ulokeparvekkeisiin.',
      'Hiekkapuhallus ja maalaus puhdistusta vaativille pinnoille.',
      'Oikeat pinnoitteet ja materiaalit Suomen olosuhteisiin.'
    ],
    keywords: ['parveke','parvekekorjaus','hiekkapuhallus','pinnoitus']
  },
  {
    id: 'huoneistoremontti',
    title: 'Huoneistoremontti',
    summary: 'Huoneistoremontit kustannustehokkaasti Pohjois-Pohjanmaalla.',
    bullets: [
      'Pintojen korjaus- ja maalaustyöt.',
      'Pienimuotoiset sähkö- ja putkityöt.',
      'Keittiöiden ja kylpyhuoneiden vesieristykset ja laatoitukset.',
      'Pintaremontti nostaa ilmettä ja arvoa — ammattilaisen tekemänä ilman yllätyksiä.'
    ],
    keywords: ['huoneistoremontti','pintaremontti','vesieristys','laatoitus','sähkö','putki']
  },
]

export function findKnowledge(text) {
  const q = (text||'').toLowerCase()
  let best = null
  let bestScore = 0
  for (const s of KNOWLEDGE) {
    const content = [s.title, s.summary, ...(s.bullets||[])].join(' ').toLowerCase()
    const sScore = score(q, content) + score(q, (s.keywords||[]).join(' '))
    if (sScore > bestScore) { bestScore = sScore; best = s }
  }
  return { section: best, score: bestScore }
}

function score(a, b) {
  const as = a.split(/[^a-zA-ZåäöÅÄÖ0-9-]+/).filter(Boolean)
  const bs = new Set(b.split(/[^a-zA-ZåäöÅÄÖ0-9-]+/).filter(Boolean))
  if (!as.length || !bs.size) return 0
  let match = 0
  for (const t of as) if (bs.has(t)) match++
  return match / Math.max(as.length, bs.size)
}
