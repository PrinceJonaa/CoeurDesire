import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Heart, Sun, Feather, Leaf, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ANIMATION_VARIANTS } from '../constants';

const Mission = () => {
  return (
    <>
      <SEO title="Our Mission" description="CoeurDesire exists to honor the connection between outer beauty and inner healing. Learn about our philosophy of self-love and natural wellness." url="https://coeurdesire.com/mission" />
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #3d2010 0%, #2a1508 50%, #1e0e06 100%)' }}
      >
        {/* Ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: '#c9935a' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: '#e090a0' }}
        />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
            className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #c9935a, #a06838)' }}
          >
            <Heart size={36} fill="white" className="text-white" />
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
            className="relative flex items-center justify-center"
          >
            {/* Offset background circle */}
            <div
              className="absolute inset-0 rounded-full transform rotate-6 translate-x-4 translate-y-4"
              style={{ background: 'linear-gradient(135deg, #f5e9d5, #d4a96a)', opacity: 0.5 }}
            />
            {/* Abstract portrait — gradient circle with botanical SVG */}
            <div
              className="relative z-10 w-full max-w-md aspect-square mx-auto rounded-full shadow-2xl border-8 border-white overflow-hidden flex items-center justify-center"
              style={{ background: 'linear-gradient(145deg, #f9ede0 0%, #e8c99a 50%, #c9935a 100%)' }}
            >
              {/* Decorative botanical rings inside */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-coeur-700/40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-coeur-700/30" />
              </div>
              {/* Center heart */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/50">
                  <Heart size={40} className="text-coeur-800" fill="rgba(107,66,38,0.3)" />
                </div>
                <p className="text-coeur-800/70 text-xs uppercase tracking-[0.25em] font-medium">CoeurDesire</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/10" />
            </div>
            <div className="absolute bottom-10 -left-10 bg-white p-6 rounded-xl shadow-lg z-20 max-w-xs">
              <p className="font-serif italic text-coeur-800 text-lg">"Beauty is the illumination of your soul."</p>
              <p className="text-xs font-bold text-coeur-400 mt-2 uppercase">Founder, CoeurDesire</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values Section ────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #3d2010 0%, #2a1508 100%)' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: '#c9935a' }}
        />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.container}
            className="text-center mb-16"
          >
            <motion.div variants={ANIMATION_VARIANTS.item} className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-coeur-600" /><Sparkles size={14} className="text-coeur-400" /><div className="h-px w-10 bg-coeur-600" />
            </motion.div>
            <motion.h2 variants={ANIMATION_VARIANTS.item} className="text-4xl md:text-5xl font-serif text-white mb-4">Our Commitments</motion.h2>
            <motion.p variants={ANIMATION_VARIANTS.item} className="text-coeur-300 max-w-xl mx-auto leading-relaxed">
              Every product we create is guided by three non-negotiable principles.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={ANIMATION_VARIANTS.container}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Leaf,
                title: 'Plant-Based Purity',
                desc: 'We source only botanicals, plant-derived oils, and nature-powered actives. No parabens, sulfates, synthetic dyes, or petroleum by-products. Ever.',
              },
              {
                icon: Heart,
                title: 'Sacred Intention',
                desc: 'Each batch is hand-poured in a cleansed space with deliberate intention. We believe the energy that goes into a product is carried into the body that receives it.',
              },
              {
                icon: Sun,
                title: 'Radical Self-Love',
                desc: 'Our formulas are not about masking or fixing. They are an invitation to honor your body as it is, and to build a ritual of reverence around your natural beauty.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={ANIMATION_VARIANTS.item}
                className="bg-white/8 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'linear-gradient(135deg, rgba(201,147,90,0.3), rgba(184,137,74,0.15))' }}>
                  <Icon size={22} className="text-coeur-300" />
                </div>
                <h3 className="font-serif text-xl text-white mb-3">{title}</h3>
                <p className="text-coeur-300 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.container}
          >
            <motion.p variants={ANIMATION_VARIANTS.item} className="text-xs uppercase tracking-[0.22em] text-coeur-500 mb-3">Live the Mission</motion.p>
            <motion.h2 variants={ANIMATION_VARIANTS.item} className="text-4xl md:text-5xl font-serif text-coeur-900 mb-5 leading-tight">
              Begin Your Ritual
            </motion.h2>
            <motion.p variants={ANIMATION_VARIANTS.item} className="text-stone-500 mb-8 leading-relaxed">
              Every bottle is an act of self-love. Browse our handcrafted collection and find the ritual that is meant for you.
            </motion.p>
            <motion.div variants={ANIMATION_VARIANTS.item} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(184,137,74,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #6b4226, #4a2e18)' }}
                >
                  Shop the Collection <ArrowRight size={15} />
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold border-2 border-coeur-300 text-coeur-700 hover:border-coeur-600 transition-colors"
                >
                  Explore Services
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  </>
  );
};

export default Mission;
