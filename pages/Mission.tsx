import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Heart, Sun, Feather } from 'lucide-react';

const Mission = () => {
  return (
    <>
      <SEO title="Our Mission" description="CoeurDesire exists to honor the connection between outer beauty and inner healing. Learn about our philosophy of self-love and natural wellness." url="https://coeurdesire.com/mission" />
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-stone-900 overflow-hidden">
        <img 
          src="https://picsum.photos/1920/1080?random=42" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" 
          alt="Peaceful texture" 
        />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
            className="w-20 h-20 bg-coeur-500 rounded-full mx-auto mb-8 flex items-center justify-center text-white"
          >
            <Heart size={40} fill="currentColor" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-4"
          >
            Healing Through Self Love
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif text-coeur-900 mb-6">Our Philosophy</h2>
            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              CoeurDesire was born from a simple yet profound truth: <span className="italic text-coeur-600 font-serif">You cannot pour from an empty cup.</span>
            </p>
            <p className="text-stone-600 mb-6 leading-relaxed">
              We operate as a woman-owned sanctuary designed to reclaim the narrative of beauty. It is not about covering up flaws, but about revealing the divine essence that resides within. Through our natural hair care, well-scented oils, and therapeutic modalities, we aim to be a conduit for your healing journey.
            </p>
            <div className="flex gap-4 mt-8">
               <div className="flex flex-col items-center gap-2">
                 <div className="w-12 h-12 rounded-full bg-coeur-100 flex items-center justify-center text-coeur-600">
                   <Sun size={24} />
                 </div>
                 <span className="text-xs uppercase tracking-widest font-bold text-stone-500">Radiance</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <div className="w-12 h-12 rounded-full bg-coeur-100 flex items-center justify-center text-coeur-600">
                   <Feather size={24} />
                 </div>
                 <span className="text-xs uppercase tracking-widest font-bold text-stone-500">Softness</span>
               </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-coeur-200 rounded-full transform rotate-6 translate-x-4 translate-y-4"></div>
            <img 
              src="https://picsum.photos/600/800?random=33" 
              alt="Founder" 
              className="relative z-10 rounded-full w-full max-w-md mx-auto shadow-2xl border-8 border-white" 
            />
            <div className="absolute bottom-10 -left-10 bg-white p-6 rounded-xl shadow-lg z-20 max-w-xs">
              <p className="font-serif italic text-coeur-800 text-lg">"Beauty is the illumination of your soul."</p>
              <p className="text-xs font-bold text-coeur-400 mt-2 uppercase">— Founder, CoeurDesire</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Mission;
