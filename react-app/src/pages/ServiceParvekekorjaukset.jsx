import { Link } from 'react-router-dom'

export default function ServiceParvekekorjaukset(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">Parvekekorjaukset</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">Parvekekorjaukset</h1>
            <p className="section-description">Parvekekorjaukset kerrostaloihin ja muihin rakennuksiin. Teemme kustannustehokkaasti laajoja ja monipuolisia parvekekorjauksia Oulun ja Pohjois-Pohjanmaan alueella.</p>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon">🧱</div><h3>Parvekkeiden pintakorjaukset</h3><p>Elementti- ja ulokeparvekkeiden pintojen korjaukset – oikeat pinnoitteet ja materiaalit Suomen olosuhteisiin.</p></div>
              <div className="service-card"><div className="service-icon">🧼</div><h3>Hiekkapuhallus ja maalaus</h3><p>Puhdistusta vaativille pinnoille hiekkapuhallus sekä kestävä pintakäsittely.</p></div>
              <div className="service-card"><div className="service-icon">🎯</div><h3>Kestävä lopputulos</h3><p>Huolellinen esikäsittely, pinnoitus ja maalaus takaavat pitkäikäisyyden.</p></div>
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
