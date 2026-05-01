import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Mission from './pages/Mission';
import Contact from './pages/Contact';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/catalog" element={<PageTransition><Catalog /></PageTransition>} />
        <Route path="/catalog/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/mission" element={<PageTransition><Mission /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Catalog /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const routerBasename = (() => {
  if (typeof window === 'undefined') return '/';

  const path = window.location.pathname;
  if (path === '/coeurdesire' || path.startsWith('/coeurdesire/')) {
    return '/coeurdesire';
  }

  return '/';
})();

const App = () => (
  <Router basename={routerBasename}>
    <Layout>
      <AnimatedRoutes />
    </Layout>
  </Router>
);

export default App;
