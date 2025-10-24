import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // close menus on route change
    setOpen(false)
    setDropdownOpen(false)
  }, [location])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" aria-label="Etusivu" className="brand-link">
            <h2>Teuvo Järvenpää Oy</h2>
          </Link>
        </div>
        <ul className={`nav-menu ${open ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${location.pathname === '/' && (!location.hash || location.hash === '#home') ? 'active' : ''}`}
              end
            >Etusivu</NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={{ pathname: '/', hash: '#gallery' }}
              className={() => `nav-link ${location.pathname === '/' && location.hash === '#gallery' ? 'active' : ''}`}
            >Galleria</NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={{ pathname: '/', hash: '#about' }}
              className={() => `nav-link ${location.pathname === '/' && location.hash === '#about' ? 'active' : ''}`}
            >Meistä</NavLink>
          </li>
          <li
            className="nav-item dropdown"
            onMouseEnter={() => !isMobile && setDropdownOpen(true)}
            onMouseLeave={() => !isMobile && setDropdownOpen(false)}
          >
            <NavLink to="/services" className={({isActive}) => `nav-link dropdown-toggle ${isActive ? 'active' : ''}`}
              onClick={(e) => { if (isMobile) { e.preventDefault(); setDropdownOpen(v => !v) } }}
            >Palvelut</NavLink>
            <ul className="dropdown-menu" style={ isMobile ? { display: dropdownOpen ? 'block' : 'none' } : undefined }>
              <li><Link to="/services/julkisivutyot">Julkisivutyöt</Link></li>
              <li><Link to="/services/maalaustyot">Maalaustyöt</Link></li>
              <li><Link to="/services/rappaustyot">Rappaustyöt</Link></li>
              <li><Link to="/services/parvekekorjaukset">Parvekekorjaukset</Link></li>
              <li><Link to="/services/parvekeremontit">Parvekeremontit</Link></li>
              <li><Link to="/services/kattoturvatuotteet">Kattoturvatuotteet</Link></li>
              <li><Link to="/services/tasoitetyot">Tasoitetyöt</Link></li>
              <li><Link to="/services/huoneistoremontit">Huoneistoremontit</Link></li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink to="/urakka-arvio" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Urakka-arvio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={{ pathname: '/', hash: '#contact' }}
              className={() => `nav-link ${location.pathname === '/' && location.hash === '#contact' ? 'active' : ''}`}
            >Yhteystiedot</NavLink>
          </li>
        </ul>
        <div className="hamburger" onClick={() => setOpen(v => !v)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}
