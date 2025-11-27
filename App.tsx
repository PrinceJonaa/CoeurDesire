import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Mission from './pages/Mission';
import Contact from './pages/Contact';

// Wrapper to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          } 
        />
        <Route 
          path="/services" 
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          } 
        />
        <Route 
          path="/mission" 
          element={
            <PageTransition>
              <Mission />
            </PageTransition>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          } 
        />
        {/* Reuse Services/Contact for simplified routing demonstration */}
        <Route 
          path="/products" 
          element={
            <PageTransition>
              <Home /> 
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

// Component to wrap pages with entrance/exit animations
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;