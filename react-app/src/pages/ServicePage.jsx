import { Link } from 'react-router-dom'

const contentMap = {
  'Maalaustyöt': {
    desc: 'Ulkomaalaukset, sisämaalaukset ja kattojen maalaukset ammattitaidolla. Perinteiset ja koneelliset menetelmät kohteen mukaan.',
    cards: [
      { icon:'🎨', title:'Ulkomaalaus', text:'Julkisivujen, puu- ja peltipintojen maalaus. Huolelliset pohjatyöt ja kestävä pintakäsittely.' },
      { icon:'🧰', title:'Sisämaalaukset', text:'Seinät, katot ja listat – siistit pinnat nopeasti ja pölyt halliten.' },
      { icon:'🧪', title:'Materiaalit', text:'Laadukkaat maalit ja pinnoitteet kohteen ja olosuhteiden mukaan.' },
    ],
  },
  'Julkisivutyöt': {
    desc: 'Julkisivusaneeraukset ja -korjaukset taloyhtiöille sekä liike- ja asuinkiinteistöihin. Kestävät ratkaisut Pohjolan oloihin.',
    cards: [
      { icon:'🏢', title:'Saneeraukset', text:'Koko julkisivun uusiminen tai osakorjaukset kohteen tarpeen mukaan.' },
      { icon:'🧱', title:'Pohjatyöt', text:'Puhdistukset, hionnat ja alustan kunnostus pitkäikäistä pintaa varten.' },
      { icon:'🛠️', title:'Pinnoitukset', text:'Säänkestävät pinnoitteet ja maalaukset takuutyönä.' },
    ],
  },
  'Rappaustyöt': {
    desc: 'Rappaukset ja pinnoitukset sekä tasoitetyöt sisällä ja ulkona. Levy-, betoni- ja harkkopintojen tasoitukset.',
    cards: [
      { icon:'🧱', title:'Kivirappaus', text:'Perinteiset ja modernit rappaustekniikat kohteen mukaan.' },
      { icon:'🧽', title:'Paikkarappaukset', text:'Halkeamien ja vaurioiden korjaus huomaamattomasti.' },
      { icon:'🎯', title:'Viimeistely', text:'Tasaiset ja siistit pinnat valmiiksi maalaukseen.' },
    ],
  },
  'Parvekekorjaukset': {
    desc: 'Parvekkeiden pintakorjaukset, hiekkapuhallus ja maalaus taloyhtiöille. Ammattitason saneerauspalvelut.',
    cards: [
      { icon:'🏗️', title:'Hiekkapuhallus', text:'Ruosteenpoisto ja tartuntapinnan valmistus.' },
      { icon:'🧴', title:'Korroosiosuojaus', text:'Metalliosien suojaus kestävillä pinnoitteilla.' },
      { icon:'🧰', title:'Pintakäsittely', text:'Kestävät maalaukset ja pinnoitukset säälle alttiisiin kohteisiin.' },
    ],
  },
  'Tasoitetyöt': {
    desc: 'Levy-, betoni- ja harkkopintojen tasoitukset – pääosin koneellisesti maalivalmiiksi.',
    cards: [
      { icon:'🔧', title:'Koneellinen tasoitus', text:'Nopea ja tasalaatuinen lopputulos suuriinkin kohteisiin.' },
      { icon:'🧱', title:'Alustat', text:'Levy-, betoni- ja harkkopintojen tasoitus.' },
      { icon:'✨', title:'Pinnat', text:'Maalivalmis pinta tehokkaasti ja siististi.' },
    ],
  },
  'Huoneistoremontit': {
    desc: 'Kattavat huoneistoremontit: maalaus, rappaus ja viimeistelytyöt – avaimet käteen.',
    cards: [
      { icon:'🏠', title:'Pintaremontit', text:'Seinät, katot ja listat uuteen uskoon.' },
      { icon:'🎯', title:'Viimeistely', text:'Saumaukset, paikkaukset ja tarkka viimeistely.' },
      { icon:'🧰', title:'Yhteistyö', text:'Tarvittaessa yhteistyössä muiden urakoitsijoiden kanssa.' },
    ],
  },
}

export default function ServicePage({ title, icon }){
  const data = contentMap[title] || { desc: '', cards: [] }
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">{title}</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">{title}</h1>
            <p className="section-description">{data.desc}</p>
            <div className="services-grid">
              {data.cards.map((c, i) => (
                <div className="service-card" key={i}>
                  <div className="service-icon">{c.icon || icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center', marginTop:'2rem'}}>
              <Link className="cta-button" to="/#contact">Pyydä ilmainen tarjous</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
