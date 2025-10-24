import { Link } from 'react-router-dom'

export default function ServiceRappaustyot(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">Rappaustyöt</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">Rappaustyöt</h1>
            <p className="section-description">Rappaustyöt ammattilaisten tekemänä Pohjois-Pohjanmaalla. Toteutamme rappaukset saneeraus- ja uudiskohteisiin Oulussa ja lähialueilla huolellisten suunnitelmien pohjalta.</p>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon">🏢</div><h3>Julkisivurappaus</h3><p>Kestävä ja näyttävä ratkaisu rakennuksen ulkopinnan suojaamiseksi – panostamme virheettömään lopputulokseen.</p></div>
              <div className="service-card"><div className="service-icon">🧱</div><h3>Harkkotalojen rappaus</h3><p>Rappaukset Siporex-, kevytsora- ja EPS-pinnoille ammattitaidolla.</p></div>
              <div className="service-card"><div className="service-icon">🔧</div><h3>Sujuva projektinhallinta</h3><p>Sovitamme rapparityöt yhteen muiden työvaiheiden kanssa kitkattoman läpiviennin varmistamiseksi.</p></div>
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
