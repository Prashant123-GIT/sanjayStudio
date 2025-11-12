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

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<PageTransition><Home /></PageTransition>}
            />
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
      <Footer />
    </div>
  );
}
