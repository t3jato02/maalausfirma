import { Link } from 'react-router-dom'

export default function ServiceParvekeremontit(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">Parvekeremontit</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">Parvekeremontit</h1>
            <p className="section-description">Parvekeremontit taloyhtiöille ja muille kiinteistöille Oulussa ja Pohjois-Pohjanmaalla. Toteutamme kustannustehokkaasti laajat ja monipuoliset parvekkeiden remontit kestävillä ratkaisuilla.</p>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon">🏗️</div><h3>Rakenteelliset ja pintaremontit</h3><p>Parvekkeiden pintojen korjaukset, kaiteiden käsittelyt sekä kestävä pinnoitus Suomen sääolosuhteisiin.</p></div>
              <div className="service-card"><div className="service-icon">🧼</div><h3>Hiekkapuhallus ja esikäsittely</h3><p>Puhdistusta vaativille pinnoille hiekkapuhallus ja muut esikäsittelyt laadukasta lopputulosta varten.</p></div>
              <div className="service-card"><div className="service-icon">🎨</div><h3>Maalaus ja pinnoitus</h3><p>Viimeistelyt, jotka varmistavat parvekkeen pitkäikäisyyden ja huolitellun ulkonäön.</p></div>
            </div>
            <div style={{textAlign:'center', marginTop:'2rem'}}><Link className="cta-button" to="/#contact">Pyydä ilmainen tarjous</Link></div>
          </div>
        </section>
      </main>
    </>
  )
}
