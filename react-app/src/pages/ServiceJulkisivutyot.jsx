import { Link } from 'react-router-dom'

export default function ServiceJulkisivutyot(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">Julkisivutyöt</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">Julkisivutyöt</h1>
            <p className="section-description">Laadukkaat julkisivutyöt Pohjois-Pohjanmaalla. Teemme julkisivukorjauksia taloyhtiöille (kerrostalot, rivitalot), toimistorakennuksille ja muille kiinteistöille Oulussa ja sen lähialueilla.</p>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon">🏢</div><h3>Julkisivutyöt kerrostaloille</h3><p>Työt tehdään annettujen korjaustyöselostusten mukaisesti yhteistyössä taloyhtiön hallituksen ja isännöitsijän kanssa.</p></div>
              <div className="service-card"><div className="service-icon">�</div><h3>Julkisivusaneeraus</h3><p>Saneeraus viestii huolenpidosta ja kohottaa kohteen imagoa. Suunnittelemme kokonaisuutena – usein samalla on järkevää puhdistaa ja maalata katto sekä parvekkeet.</p></div>
              <div className="service-card"><div className="service-icon">✅</div><h3>Laadukas lopputulos</h3><p>Kokemus ja oikeat menetelmät takaavat kestävän ja siistin julkisivun.</p></div>
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
