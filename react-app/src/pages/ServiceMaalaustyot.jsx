import { Link } from 'react-router-dom'

export default function ServiceMaalaustyot(){
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs">
          <Link to="/">Etusivu</Link>
          <span className="sep">›</span>
          <Link to="/services">Palvelut</Link>
          <span className="sep">›</span>
          <span className="current">Maalaustyöt</span>
        </nav>
      </div>

      <main>
        <section className="services">
          <div className="container">
            <h1 className="section-title">Maalaustyöt</h1>
            <p className="section-description">Maalaustyöt sisällä ja ulkona – ruiskumaalauksia ja perinteisiä menetelmiä rakennusten ulko- ja sisäpinnoille Oulun ja Pohjois-Pohjanmaan alueella. Jäsenyys Pintaurakoitsija ry:ssä takaa laadun ja ajantasaiset työkäytännöt.</p>
            <div className="services-grid">
              <div className="service-card"><div className="service-icon">🎨</div><h3>Sisämaalaus</h3><p>Haastavatkin sisämaalaustyöt kattoihin, seiniin, lattioihin, märkätiloihin, ikkunoihin, oviin ja kalusteisiin. Pinnan ikä ja kunto huomioiden – kaunis ja kestävä lopputulos.</p></div>
              <div className="service-card"><div className="service-icon">🏠</div><h3>Ulkomaalaus</h3><p>Kattavat ulkomaalaukset pienille ja suurille kiinteistöille: parvekkeet, katot, seinät, metallipinnat, sokkelit, ikkunat, ovet ym. Oikeat materiaalit ja menetelmät säälle.</p></div>
              <div className="service-card"><div className="service-icon">�</div><h3>Peltikattojen maalaukset</h3><p>Peltikattojen pesu, pohjatyöt ja maalaus asiantuntevasti – pysyvyys ja kestävyys varmistetaan.</p></div>
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
