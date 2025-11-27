import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShoppingBag, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Mission', path: '/mission' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="text-coeur-600"
          >
            <Heart fill="currentColor" size={28} className="opacity-80" />
          </motion.div>
          <span className={`text-2xl font-serif font-bold tracking-wide transition-colors ${scrolled ? 'text-coeur-900' : 'text-coeur-900'}`}>
            Coeur<span className="text-coeur-500">Desire</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => `text-sm uppercase tracking-widest font-medium relative hover:text-coeur-500 transition-colors ${isActive ? 'text-coeur-600' : 'text-stone-600'}`}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="underline" 
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-coeur-400" 
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-coeur-800 text-white px-6 py-2 rounded-full font-serif italic hover:bg-coeur-700 transition-colors shadow-lg shadow-coeur-200"
          >
            Book Now
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-coeur-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-coeur-50 border-t border-coeur-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path}
                  className="text-xl font-serif text-coeur-900 hover:text-coeur-600"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-coeur-900 text-coeur-100 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif font-bold text-white">CoeurDesire</h3>
          <p className="text-coeur-200 leading-relaxed">
            Where beauty meets the soul. Healing through self-love, natural care, and divine aesthetics.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Explore</h4>
          <ul className="space-y-3">
            <li><NavLink to="/services" className="hover:text-white transition-colors">Services</NavLink></li>
            <li><NavLink to="/mission" className="hover:text-white transition-colors">Our Mission</NavLink></li>
            <li><NavLink to="/products" className="hover:text-white transition-colors">Shop Oils</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white transition-colors">Contact</NavLink></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Connect</h4>
          <div className="flex space-x-4">
            <motion.a href="#" whileHover={{ y: -5 }} className="bg-coeur-800 p-2 rounded-full text-white hover:bg-coeur-700">
              <Instagram size={20} />
            </motion.a>
            <motion.a href="#" whileHover={{ y: -5 }} className="bg-coeur-800 p-2 rounded-full text-white hover:bg-coeur-700">
              <Facebook size={20} />
            </motion.a>
            <motion.a href="#" whileHover={{ y: -5 }} className="bg-coeur-800 p-2 rounded-full text-white hover:bg-coeur-700">
              <Twitter size={20} />
            </motion.a>
          </div>
        </div>
        <div>
           <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
           <p className="mb-4 text-sm text-coeur-200">Receive love notes and beauty tips.</p>
           <form className="flex">
             <input type="email" placeholder="Your email" className="bg-coeur-800 border-none rounded-l-md px-4 py-2 w-full focus:ring-1 focus:ring-coeur-400 outline-none placeholder-coeur-400" />
             <button className="bg-coeur-400 text-coeur-900 font-bold px-4 py-2 rounded-r-md hover:bg-coeur-300 transition-colors">Join</button>
           </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-coeur-800 text-center text-sm text-coeur-400">
        © {new Date().getFullYear()} CoeurDesire. All rights reserved. Woman Owned & Operated.
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 md:pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};