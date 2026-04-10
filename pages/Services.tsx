import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ANIMATION_VARIANTS, SERVICES } from '../constants';
import { Check, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';

const Services: React.FC = () => {
  return (
    <>
      <SEO title="Services" description="CoeurDesire beauty and wellness services including virtual consultations and aromatherapy. Select in-person offerings coming soon." url="https://coeurdesire.com/services" />

      <div className="min-h-screen bg-coeur-50 pb-24">
        <div className="bg-coeur-900 text-white pt-32 pb-20 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-serif mb-6">
              Our Offerings
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-xl text-coeur-200 max-w-2xl mx-auto mb-6">
              Curated experiences for the hair, skin, and spirit.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-coeur-800/60 backdrop-blur-sm border border-coeur-600/30 rounded-full px-5 py-2.5 text-sm text-coeur-200">
              <Clock size={14} className="text-gold-400" />
              Virtual & shipping services available now · In-person offerings coming soon
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
          <motion.div variants={ANIMATION_VARIANTS.container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <motion.div key={service.id} variants={ANIMATION_VARIANTS.item}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative ${service.comingSoon ? 'opacity-80' : ''}`}>

                {/* Coming Soon overlay */}
                {service.comingSoon && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-coeur-800/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg z-20">
                      <Clock size={12} />Coming Soon
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-52 overflow-hidden ${service.comingSoon ? 'saturate-50' : ''}`}
                  style={{ background: service.cardBg || 'linear-gradient(145deg, #f5ede0, #d4a96a)' }}
                >
                  {/* Decorative rings */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-white/40" />
                    <div className="absolute top-4 right-10 w-16 h-16 rounded-full border border-white/30" />
                  </div>
                  {/* Center icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40">
                    <service.icon size={28} className="text-white drop-shadow" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 flex items-center gap-3">
                    <h2 className="text-white font-serif text-2xl drop-shadow">{service.title}</h2>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
                </div>

                <div className="p-7">
                  <p className="text-stone-500 mb-5 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      {service.comingSoon ? (
                        <span className="text-coeur-400 font-serif italic text-base">In-Person · Coming Soon</span>
                      ) : (
                        <>
                          <span className="text-gold-500 font-bold text-xl">{service.price}</span>
                          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                            <Check size={12} /> Available Virtually / Ships Nationwide
                          </div>
                        </>
                      )}
                    </div>
                    {service.comingSoon ? (
                      <Link to="/contact"
                        className="text-sm border-2 border-coeur-200 text-coeur-600 px-5 py-2 rounded-full hover:border-coeur-400 hover:bg-coeur-50 transition-all">
                        Notify Me
                      </Link>
                    ) : (
                      <Link to="/contact"
                        className="text-sm bg-coeur-800 text-white px-6 py-2.5 rounded-full hover:bg-coeur-700 transition-colors shadow">
                        Book Now
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;
