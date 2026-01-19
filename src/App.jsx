import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import PageTransition from './components/PageTransition.jsx';

import CinematicBackground from './components/CinematicBackground.jsx';
import Cursor from './components/Cursor.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import CinematicLoader from './components/CinematicLoader.jsx';
import LoginSelection from './pages/LoginSelection.jsx';
import VisitorLogin from './pages/VisitorLogin.jsx';
import ClientDashboard from './pages/ClientDashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';

export default function App() {
  const location = useLocation();

  // Hide navbar and footer only on client dashboard
  const hideNavAndFooter = location.pathname === '/dashboard';

  return (
    <div className="flex min-h-screen flex-col relative overflow-x-hidden max-w-full">
      <CinematicLoader />
      <ScrollToTop />
      {/* <Cursor /> */}
      <CinematicBackground />
      {!hideNavAndFooter && <Navbar />}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<PageTransition><Home /></PageTransition>}
            />
            <Route path="/login" element={<PageTransition><LoginSelection /></PageTransition>} />
            <Route path="/visitor-login" element={<PageTransition><VisitorLogin /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><ClientDashboard /></PageTransition>} />
            <Route path="/admin-access" element={<PageTransition><AdminPanel /></PageTransition>} />
            <Route
              path="/portfolio"
              element={<PageTransition><Portfolio /></PageTransition>}
            />
            <Route
              path="/services"
              element={<PageTransition><Services /></PageTransition>}
            />
            <Route
              path="/about"
              element={<PageTransition><About /></PageTransition>}
            />
            <Route
              path="/contact"
              element={<PageTransition><Contact /></PageTransition>}
            />
          </Routes>
        </AnimatePresence>
      </div>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}
