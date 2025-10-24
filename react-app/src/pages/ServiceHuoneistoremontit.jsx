import { Link } from 'react-router-dom'

export default function ServiceHuoneistoremontit(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">Huoneistoremontit</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">Huoneistoremontit</h1>
            <p className="section-description">Huoneistoremontit kustannustehokkaasti Pohjois-Pohjanmaalla. Teemme pintojen korjaus- ja maalaustyöt, pienimuotoiset sähkö- ja putkityöt sekä kalustukseen liittyvät ratkaisut Oulun seudulla.</p>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon">🛠️</div><h3>Pintaremontit</h3><p>Huoneiston ilmeen päivitys ja arvon nosto – ammattilaisen tekemänä ilman ikäviä yllätyksiä.</p></div>
              <div className="service-card"><div className="service-icon">🧰</div><h3>Laatoitukset ja vesieristykset</h3><p>Kylpyhuoneiden ja keittiöiden vesieristykset ja laatoitukset huolellisesti.</p></div>
              <div className="service-card"><div className="service-icon">🔌</div><h3>Pienet sähkö- ja putkityöt</h3><p>Kokonaisuuteen kuuluvat pienimuotoiset asennus- ja muutostyöt.</p></div>
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
