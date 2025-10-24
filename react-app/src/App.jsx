import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
const Services = React.lazy(() => import('./pages/Services'))
const ServiceJulkisivutyot = React.lazy(() => import('./pages/ServiceJulkisivutyot'))
const ServiceMaalaustyot = React.lazy(() => import('./pages/ServiceMaalaustyot'))
const ServiceRappaustyot = React.lazy(() => import('./pages/ServiceRappaustyot'))
const ServiceParvekekorjaukset = React.lazy(() => import('./pages/ServiceParvekekorjaukset'))
const ServiceTasoitetyot = React.lazy(() => import('./pages/ServiceTasoitetyot'))
const ServiceHuoneistoremontit = React.lazy(() => import('./pages/ServiceHuoneistoremontit'))
const ServiceParvekeremontit = React.lazy(() => import('./pages/ServiceParvekeremontit'))
const ServiceKattoturvatuotteet = React.lazy(() => import('./pages/ServiceKattoturvatuotteet'))
const Urakkaarvio = React.lazy(() => import('./pages/Urakkaarvio'))

export default function App() {
  const location = useLocation()

  // Scroll to hash targets on route/hash change to preserve anchor UX
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#','')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.pathname, location.hash])

  return (
    <div>
      <Navbar />
      <Suspense fallback={<div style={{padding:'2rem', textAlign:'center'}}>Ladataan…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/julkisivutyot" element={<ServiceJulkisivutyot />} />
          <Route path="/services/maalaustyot" element={<ServiceMaalaustyot />} />
          <Route path="/services/rappaustyot" element={<ServiceRappaustyot />} />
          <Route path="/services/parvekekorjaukset" element={<ServiceParvekekorjaukset />} />
          <Route path="/services/parvekeremontit" element={<ServiceParvekeremontit />} />
          <Route path="/services/kattoturvatuotteet" element={<ServiceKattoturvatuotteet />} />
          <Route path="/services/tasoitetyot" element={<ServiceTasoitetyot />} />
          <Route path="/services/huoneistoremontit" element={<ServiceHuoneistoremontit />} />
          <Route path="/urakka-arvio" element={<Urakkaarvio />} />
          <Route path="/urakkaarvio" element={<Urakkaarvio />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingContact />
      <Chatbot />
    </div>
  )
}
