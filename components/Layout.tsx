import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/catalog' },
  { name: 'Services', path: '/services' },
  { name: 'Mission', path: '/mission' },
  { name: 'Contact', path: '/contact' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isCatalogPage = location.pathname === '/catalog';
  const isProductDetailPage = location.pathname.startsWith('/catalog/');
  const isServicesPage = location.pathname === '/services';

  // Pages with light backgrounds need dark nav text; dark-hero pages use light text
  const isHome = location.pathname === '/';
  const isLightHero = isHome || location.pathname.startsWith('/catalog/') || location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const logoColor = scrolled ? 'text-coeur-50' : isLightHero ? 'text-coeur-900' : 'text-coeur-50';
  const logoSubColor = scrolled ? 'text-coeur-300' : isLightHero ? 'text-coeur-600' : 'text-coeur-300';
  const linkColor = scrolled ? 'text-coeur-200' : isLightHero ? 'text-coeur-700' : 'text-coeur-200';
  const linkHoverColor = 'hover:text-gold-400';
  const mobileIconColor = scrolled ? 'text-coeur-200' : isLightHero ? 'text-coeur-700' : 'text-coeur-200';

  return (
    <div className="min-h-screen bg-coeur-50 font-sans">
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] text-center py-2 text-[11px] uppercase tracking-[0.22em] font-medium text-white" style={{ background: 'linear-gradient(135deg, #3d2010, #563830)' }}>
        <span className="hidden sm:inline">✦ Free shipping on orders over $75 &nbsp;·&nbsp; </span>
        <span>Handcrafted in small batches &nbsp;·&nbsp; Ships nationwide ✦</span>
      </div>

      {/* Navbar */}
      <header
        className={`fixed left-0 right-0 z-50 top-[34px] transition-all duration-500 ${
          scrolled
            ? 'bg-coeur-900/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className={`font-serif text-2xl tracking-wide group-hover:text-gold-400 transition-colors duration-300 ${logoColor}`}>
              CoeurDesire
            </span>
            <span className={`text-[10px] uppercase tracking-widest group-hover:text-gold-400 transition-colors duration-300 ${logoSubColor}`}>
              Beauty & Healing
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path ||
                (link.path === '/catalog' && location.pathname.startsWith('/catalog'));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-widest transition-all duration-300 relative group ${
                    isActive ? 'text-gold-400' : `${linkColor} ${linkHoverColor}`
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              to="/contact"
              className={`ml-2 px-5 py-2 text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-lg ${
                scrolled || !isLightHero
                  ? 'bg-coeur-700 hover:bg-coeur-600 text-coeur-50'
                  : 'bg-coeur-800 hover:bg-coeur-700 text-white'
              }`}
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden ${mobileOpen ? 'text-coeur-200' : mobileIconColor} hover:text-gold-400 transition-colors duration-300 p-1`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-coeur-900/98 backdrop-blur-md border-t border-coeur-800 overflow-hidden"
            >
              <nav className="flex flex-col px-6 py-6 gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path ||
                    (link.path === '/catalog' && location.pathname.startsWith('/catalog'));
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`py-3 text-sm uppercase tracking-widest border-b border-coeur-800 last:border-0 transition-colors duration-300 ${
                        isActive ? 'text-gold-400' : 'text-coeur-200 hover:text-gold-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <Link
                  to="/contact"
                  className="mt-4 py-3 text-center bg-coeur-700 hover:bg-coeur-600 text-coeur-50 text-sm uppercase tracking-widest rounded-full transition-all duration-300"
                >
                  Book Now
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Mobile Sticky Shop Bar — only shown on mobile, hidden on md+ */}
      {!isCatalogPage && !isProductDetailPage && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
          <div className="flex gap-3 px-4 py-3 bg-white/95 backdrop-blur-md border-t border-coeur-100 shadow-2xl">
            {!isServicesPage && (
              <Link
                to="/catalog"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #6b4226, #4a2e18)' }}
              >
                Shop Collection
              </Link>
            )}
            <Link
              to="/contact"
              className={`flex items-center justify-center ${isServicesPage ? 'flex-1 py-3.5' : 'w-14'} rounded-full border-2 border-coeur-300 text-coeur-700 text-xs font-medium shrink-0`}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-coeur-900 text-coeur-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="inline-block mb-4">
                <span className="font-serif text-3xl text-coeur-50">CoeurDesire</span>
                <div className="text-[10px] uppercase tracking-widest text-coeur-400 mt-1">Beauty & Healing</div>
              </Link>
              <p className="text-sm text-coeur-400 leading-relaxed max-w-xs">
                Luxury natural hair care and wellness oils, handcrafted with intention for your self-love ritual. Because true beauty begins within.
              </p>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://instagram.com/coeurdesire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-coeur-700 flex items-center justify-center text-coeur-400 hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@coeurdesire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-coeur-700 flex items-center justify-center text-coeur-400 hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
                  aria-label="TikTok"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-coeur-50 mb-5 font-medium">Navigate</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-coeur-400 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop & Contact */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-coeur-50 mb-5 font-medium">Shop & Connect</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/catalog" className="text-sm text-coeur-400 hover:text-gold-400 transition-colors duration-300">
                    Shop Oils
                  </Link>
                </li>
                <li>
                  <Link to="/catalog?filter=Hair" className="text-sm text-coeur-400 hover:text-gold-400 transition-colors duration-300">
                    Hair Care
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-sm text-coeur-400 hover:text-gold-400 transition-colors duration-300">
                    Services
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:inquiry@coeurdesire.com"
                    className="text-sm text-coeur-400 hover:text-gold-400 transition-colors duration-300"
                  >
                    inquiry@coeurdesire.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+15551234567"
                    className="text-sm text-coeur-400 hover:text-gold-400 transition-colors duration-300"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-coeur-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-coeur-600 tracking-wide">
              &copy; {new Date().getFullYear()} CoeurDesire. All rights reserved.
            </p>
            <p className="text-xs text-coeur-700 tracking-widest uppercase">
              Handcrafted with love &amp; intention
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
