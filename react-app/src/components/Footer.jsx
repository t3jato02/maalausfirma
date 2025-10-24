export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Teuvo Järvenpää Oy</h3>
            <p>Julkisivutöiden, maalausten ja pinnoitusten asiantuntija Oulussa ja Pohjois-Pohjanmaalla. Perustettu vuonna 1984 – yli 40 vuotta kokemusta laadusta.</p>
          </div>
          <div className="footer-section">
            <h4>Palvelut</h4>
            <ul>
              <li><a href="#services">Julkisivutyöt</a></li>
              <li><a href="#services">Maalaus</a></li>
              <li><a href="#services">Rappaus</a></li>
              <li><a href="#services">Parvekekorjaukset</a></li>
              <li><a href="#services">Tasoitus</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Yhteystiedot</h4>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-0.125em', marginRight:6}}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              0400 580 172
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-0.125em', marginRight:6}}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              teuvo.jarvenpaa@luukku.com
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:'-0.125em', marginRight:6}}>
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              PL 497, 90100 Oulu
            </p>
          </div>
        </div>
        <div className="footer-bottom"><p>&copy; 2025 Teuvo Järvenpää Oy. Kaikki oikeudet pidätetään.</p></div>
      </div>
    </footer>
  )
}
