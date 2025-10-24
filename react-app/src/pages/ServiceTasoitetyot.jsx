import { Link } from 'react-router-dom'

export default function ServiceTasoitetyot(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">Tasoitetyöt</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">Tasoitetyöt</h1>
            <p className="section-description">Tasoitetyöt Oulussa ja Pohjois-Pohjanmaalla. Teemme levy-, betoni- ja harkkopintojen tasoitukset ok-taloihin, rivitaloihin ja kerrostaloihin – pääasiassa koneellisesti.</p>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon">🔧</div><h3>Koneelliset tasoitukset</h3><p>Nopea ja tasalaatuinen lopputulos suurillekin pinnoille.</p></div>
              <div className="service-card"><div className="service-icon">📏</div><h3>Pintojen oikaisu</h3><p>Suorat pinnat ja huolelliset kulmat maalivalmiiksi.</p></div>
              <div className="service-card"><div className="service-icon">🧪</div><h3>Materiaalit</h3><p>Laadukkaat tasoitteet ja työmenetelmät kestävään lopputulokseen.</p></div>
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
