import { Link } from 'react-router-dom'

export default function ServiceKattoturvatuotteet(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">Kattoturvatuotteet</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">Kattoturvatuotteet</h1>
            <p className="section-description">Asennamme kattoturvatuotteet määräysten mukaisesti Oulussa ja Pohjois-Pohjanmaalla. Kattotikkaat, kulkusillat, lumiesteet ja muut turvalliset ratkaisut eri kattomateriaaleille.</p>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon">🪜</div><h3>Kattotikkaat</h3><p>Seinä- ja kattotikkaiden toimitus ja asennus. Turvallinen pääsy katolle huoltoja ja tarkastuksia varten.</p></div>
              <div className="service-card"><div className="service-icon">🛤️</div><h3>Kulkusillat</h3><p>Kulkusillat helpottavat liikkumista kattopinnalla ja suojaavat kattoa kulumiselta.</p></div>
              <div className="service-card"><div className="service-icon">❄️</div><h3>Lumiesteet</h3><p>Mitoitetut lumiesteet ehkäisevät lumen ja jään hallitsematonta putoamista.</p></div>
            </div>
            <div style={{textAlign:'center', marginTop:'2rem'}}>
              <Link className="cta-button" to={{ pathname: '/', hash: '#contact' }}>Pyydä ilmainen tarjous</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
