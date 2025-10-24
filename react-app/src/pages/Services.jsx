import { Link } from 'react-router-dom'

export default function Services(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <span className="current">Palvelut</span>
        </nav>
      </div>

      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Palvelumme</h2>
          <p className="section-description">Tarjoamme monipuolisia rakennus- ja pintaurakointipalveluita Oulussa ja Pohjois-Pohjanmaalla.</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Maalaustyöt</h3>
              <p>Sisä- ja ulkomaalaukset sekä peltikattojen maalaukset. Ruiskumaalaukset ja perinteiset maalausmenetelmät ammattitaidolla.</p>
              <Link className="card-link" to="/services/maalaustyot" aria-label="Lue lisää: Maalaustyöt" />
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Julkisivutyöt</h3>
              <p>Julkisivusaneeraukset ja -korjaukset taloyhtiöille ja muille kiinteistöille – laadukas ja kestävä lopputulos.</p>
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
    </>
  )
}
