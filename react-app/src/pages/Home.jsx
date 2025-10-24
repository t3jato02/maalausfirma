import { useEffect, useMemo, useState } from 'react'
import CountUp from '../components/CountUp'
import { Link } from 'react-router-dom'

export default function Home(){
  const BASE = import.meta.env.BASE_URL
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Prefill contact form message if a draft exists (from Urakka-arvio page)
    try {
      const draft = sessionStorage.getItem('estimateDraft')
      if (draft) {
        const ta = document.getElementById('message')
        if (ta) {
          const existing = ta.value || ''
          ta.value = existing ? existing + "\n\n" + draft : draft
          ta.focus()
        }
        sessionStorage.removeItem('estimateDraft')
      }
    } catch {}
  }, [])

  const galleryItems = useMemo(() => ([
    { cat:'painting', title:'Puutalon maalaus', desc:'Ulkomaalaus ja kunnostustyöt', img:`${BASE}assets/images/gallery/puutalon-maalaus-800x700-1920w.jpg`, alt:'Puutalon maalaus' },
    { cat:'painting', title:'Peltikaton maalaus', desc:'Kattoremontti ja maalaustyöt', img:`${BASE}assets/images/gallery/peltikaton-maalaus-800x700-1920w.jpg`, alt:'Peltikaton maalaus' },
    { cat:'plaster', title:'Rappaus ja maalaus', desc:'Julkisivurappaukset ja viimeistely', img:`${BASE}assets/images/gallery/rappaus-ja-maalaus-800x700-1920w.jpg`, alt:'Rappaus ja maalaus' },
    { cat:'plaster', title:'Uusi rappaus ja peltikatto', desc:'Kokonaisvaltaiset julkisivuremontit', img:`${BASE}assets/images/gallery/uusi-rappaus-ja-peltikaton-maalaus-800x700-1920w.jpg`, alt:'Uusi rappaus ja peltikaton maalaus' },
    { cat:'facade', title:'Julkisivurappaus', desc:'Ammattitason julkisivutyöt', img:`${BASE}assets/images/gallery/julkisivurappaus-800x700-1920w.jpg`, alt:'Julkisivurappaus' },
    { cat:'plaster', title:'Harkkotalon rappaus', desc:'Rappaustyöt ja pinnoitus', img:`${BASE}assets/images/gallery/harkkotalon-rappaus-800x700-1920w.jpg`, alt:'Harkkotalon rappaus' },
    { cat:'painting', title:'Ulkomaalaus', desc:'Talon ulkomaalaustyöt', img:`${BASE}assets/images/gallery/ulkomaalaus-800x700-1920w.jpg`, alt:'Ulkomaalaus' },
    { cat:'facade', title:'Lautavuorauksen uusiminen', desc:'Julkisivun kunnostustyöt', img:`${BASE}assets/images/gallery/lautavuorauksen-uusimista-ulkomaalaus-800x700-1920w.jpg`, alt:'Lautavuorauksen uusiminen' },
    { cat:'painting', title:'Maalin poisto ja maalaus', desc:'Vanhan maalin poisto ja uudelleenmaalaus', img:`${BASE}assets/images/gallery/maalin-poisto-ja-maalaus-800x700-1920w.jpg`, alt:'Maalin poisto ja maalaus' },
    { cat:'facade', title:'Oktalon remontti', desc:'Kokonaisvaltainen julkisivuremontti', img:`${BASE}assets/images/gallery/oktalon-remontti-800x700-1920w.jpg`, alt:'Oktalon remontti' },
    { cat:'plaster', title:'Paikkarappaus', desc:'Julkisivun korjaustyöt', img:`${BASE}assets/images/gallery/paikkarappaus-800x700-1920w.jpg`, alt:'Paikkarappaus' },
    { cat:'painting', title:'Kiimingin kirkon tapuli', desc:'Keittömaalaus historiallisiin kohteisiin', img:`${BASE}assets/images/gallery/kiimingin-kirkon-tapuli-keittomaalattu-800x700-1920w.jpg`, alt:'Kirkon tapulin maalaus' },
  ]), [])

  const visibleItems = galleryItems.filter(i => filter==='all' || i.cat===filter)

  return (
    <>
      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Teuvo Järvenpää Oy</h1>
          <p className="hero-description">Julkisivut ja maalaukset 40 vuoden kokemuksella. Oulussa ja Pohjois-Pohjanmaalla toimiva erityisesti julkisivutöihin, maalauksiin ja muihin pintakorjauksiin erikoistunut yritys.</p>
          <button className="cta-button" onClick={() => {
            const el = document.getElementById('contact'); if (el) el.scrollIntoView({behavior:'smooth'})
          }}>Pyydä ilmainen tarjous</button>
        </div>
        <div className="hero-image">
          <img src={`${BASE}assets/images/house-painting.jpg`} alt="Ammattitason ulkomaalaus" fetchPriority="high" decoding="async" style={{width:'90%', height:'auto', objectFit:'cover', borderRadius:15}} />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="gallery">
        <div className="container">
          <h2 className="section-title">Galleria</h2>
          <p className="section-description">Valikoima referenssikuvia eri työvaiheista: julkisivurappauksia, maalaustöitä ja parvekekorjauksia.</p>
          <div className="filter-buttons">
            <button className={`filter-btn ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>Kaikki</button>
            <button className={`filter-btn ${filter==='facade'?'active':''}`} onClick={() => setFilter('facade')}>Julkisivutyöt</button>
            <button className={`filter-btn ${filter==='painting'?'active':''}`} onClick={() => setFilter('painting')}>Maalaus</button>
            <button className={`filter-btn ${filter==='plaster'?'active':''}`} onClick={() => setFilter('plaster')}>Rappaus</button>
          </div>
          <div className="gallery-grid">
            {visibleItems.map((it, idx) => (
              <div className="gallery-item" data-category={it.cat} key={idx}>
                <div className="gallery-image">
                  <img src={it.img} alt={it.alt} loading="lazy" decoding="async" />
                </div>
                <div className="gallery-info">
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Tietoa Meistä</h2>
              <p>Teuvo Järvenpää Oy on Oulussa ja Pohjois-Pohjanmaalla toimiva julkisivutöiden, maalausten ja pinnoitusten asiantuntija. Perustettu vuonna 1984, olemme palvelleet alueemme asukkaita ja yrityksiä jo yli 40 vuoden ajan.</p>
              <p>Yhdistämme perinteisen käsityötaidon moderneihin materiaaleihin ja menetelmiin. Kokenut tiimimme on sitoutunut tuottamaan erinomaisia tuloksia, jotka kestävät Suomen vaativat sääolosuhteet.</p>
              <div className="stats">
                <div className="stat"><h3><CountUp end={500} suffix="+" /></h3><p>Valmiit projektit</p></div>
                <div className="stat"><h3><CountUp end={40} suffix="+" /></h3><p>Vuosien kokemus</p></div>
                <div className="stat"><h3><CountUp end={100} suffix="%" /></h3><p>Asiakastyytyväisyys</p></div>
              </div>
            </div>
            <div className="about-image">
              <img src={`${BASE}assets/images/plasterer-wall.jpg`} alt="Ammattirappaaja työssään" loading="lazy" decoding="async" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:15}} />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Palvelumme</h2>
          <p className="section-description">Tarjoamme monipuolisia rakennus- ja pintaurakointipalveluita Oulussa ja Pohjois-Pohjanmaalla.</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Maalaustyöt</h3>
              <p>Sisä- ja ulkomaalaukset sekä peltikattojen maalaukset – ruiskulla ja perinteisesti.</p>
              <Link className="card-link" to="/services/maalaustyot" aria-label="Lue lisää: Maalaustyöt" />
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Julkisivutyöt</h3>
              <p>Julkisivusaneeraukset ja -korjaukset taloyhtiöille ja muille kiinteistöille.</p>
              <Link className="card-link" to="/services/julkisivutyot" aria-label="Lue lisää: Julkisivutyöt" />
            </div>
            <div className="service-card">
              <div className="service-icon">🧱</div>
              <h3>Rappaustyöt</h3>
              <p>Julkisivurappaukset ja harkkotalojen rappaukset – näyttävä ja kestävä julkisivu.</p>
              <Link className="card-link" to="/services/rappaustyot" aria-label="Lue lisää: Rappaustyöt" />
            </div>
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Parvekekorjaukset</h3>
              <p>Parvekkeiden pintakorjaukset sekä hiekkapuhallus ja maalaus – kustannustehokkaasti.</p>
              <Link className="card-link" to="/services/parvekekorjaukset" aria-label="Lue lisää: Parvekekorjaukset" />
            </div>
            <div className="service-card">
              <div className="service-icon">🛠️</div>
              <h3>Parvekeremontit</h3>
              <p>Parvekkeiden laajat remontit taloyhtiöille ja muille kiinteistöille – kestävä lopputulos.</p>
              <Link className="card-link" to="/services/parvekeremontit" aria-label="Lue lisää: Parvekeremontit" />
            </div>
            <div className="service-card">
              <div className="service-icon">🪜</div>
              <h3>Kattoturvatuotteet</h3>
              <p>Kattotikkaat, kulkusillat, lumiesteet ja muut turvatuotteet määräysten mukaisesti asennettuna.</p>
              <Link className="card-link" to="/services/kattoturvatuotteet" aria-label="Lue lisää: Kattoturvatuotteet" />
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Tasoitetyöt</h3>
              <p>Levy-, betoni- ja harkkopintojen tasoitukset – pääasiassa koneellisesti maalivalmiiksi.</p>
              <Link className="card-link" to="/services/tasoitetyot" aria-label="Lue lisää: Tasoitetyöt" />
            </div>
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Huoneistoremontit</h3>
              <p>Kustannustehokkaat huoneistoremontit: pintojen korjaukset ja maalaukset, laatoitukset ja vesieristykset.</p>
              <Link className="card-link" to="/services/huoneistoremontit" aria-label="Lue lisää: Huoneistoremontit" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Pyydä ilmainen tarjous</h2>
          <p className="section-description">Täytä lomake niin otamme sinuun yhteyttä 24 tunnin kuluessa. Vastaamme mielellämme kysymyksiisi ja teemme räätälöidyn tarjouksen projektillesi.</p>
          <div className="contact-content">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><input type="text" id="name" name="name" placeholder="Nimesi" required /></div>
              <div className="form-group"><input type="email" id="email" name="email" placeholder="Sähköpostiosoitteesi" required /></div>
              <div className="form-group"><input type="tel" id="phone" name="phone" placeholder="Puhelinnumerosi" /></div>
              <div className="form-group">
                <select id="service" name="service" required style={{width:'100%', padding:15, border:'2px solid #e0e0e0', borderRadius:10, fontSize:'1rem'}}>
                  <option value="">Valitse palvelu</option>
                  <option value="facade">Julkisivutyöt</option>
                  <option value="painting">Maalaus</option>
                  <option value="skim-coating">Tasoitus</option>
                  <option value="balcony">Parvekekorjaukset</option>
                  <option value="balcony-renovation">Parvekeremontit</option>
                  <option value="roof-safety">Kattoturvatuotteet</option>
                  <option value="plastering">Rappaus / Pinnoitus</option>
                  <option value="renovation">Huoneistoremontit</option>
                  <option value="other">Muu</option>
                </select>
              </div>
              <div className="form-group"><textarea id="message" name="message" placeholder="Projektin kuvaus..." rows={5} required /></div>
              <button type="submit" className="submit-btn">Lähetä Viesti</button>
            </form>
            <div className="contact-info" style={{marginTop: '2rem'}}>
              <div className="contact-item"><h3>📍 Osoite</h3><p>PL 497<br/>90100 Oulu</p></div>
              <div className="contact-item"><h3>📞 Puhelin</h3><p>0400 580 172</p></div>
              <div className="contact-item"><h3>✉️ Sähköposti</h3><p>teuvo.jarvenpaa@luukku.com</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
