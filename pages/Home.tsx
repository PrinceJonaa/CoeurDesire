import React from 'react';
import { SEO } from '../components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ANIMATION_VARIANTS, PRODUCTS, TESTIMONIALS } from '../constants';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      <SEO title="Home" description="CoeurDesire is a luxury beauty and wellness brand offering natural hair care oils, scented products, and self-love rituals. Ships nationwide." url="https://coeurdesire.com/" />
      <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?random=99" 
            alt="Background" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coeur-50/50 via-coeur-100/30 to-coeur-50"></div>
        </div>

        <motion.div 
          style={{ y: y1, opacity }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block mb-4 p-2 px-6 border border-coeur-600/30 rounded-full backdrop-blur-sm"
          >
            <span className="text-coeur-800 uppercase tracking-[0.2em] text-xs font-bold">Woman Owned • Soul Centered</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl font-serif text-coeur-900 mb-6 leading-tight"
          >
            Radiate from <br /> the <span className="text-coeur-500 italic">Heart</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-stone-600 font-light mb-10 max-w-2xl mx-auto"
          >
            Discover beauty consultations, natural hair care, and sacred oils designed to harmonize your outer glow with your inner desire.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link to="/services">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-coeur-800 text-white px-8 py-4 rounded-full text-lg shadow-xl shadow-coeur-900/20 hover:bg-coeur-900 transition-colors flex items-center gap-2 mx-auto"
              >
                Explore Services <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[10%] z-0 hidden md:block"
        >
          <img src="https://picsum.photos/300/400?random=88" alt="Floating Element" className="w-64 h-80 object-cover rounded-[5rem] shadow-2xl opacity-80" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-[10%] z-0 hidden md:block"
        >
          <img src="https://picsum.photos/300/300?random=89" alt="Floating Element" className="w-56 h-56 object-cover rounded-full shadow-2xl opacity-70 border-4 border-white" />
        </motion.div>
      </section>

      {/* Intro Mission Snippet */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.container}
          >
            <motion.h2 variants={ANIMATION_VARIANTS.item} className="text-4xl md:text-5xl font-serif text-coeur-900 mb-6">
              Beauty as a Ritual
            </motion.h2>
            <motion.p variants={ANIMATION_VARIANTS.item} className="text-lg text-stone-600 leading-relaxed">
              At <span className="font-bold text-coeur-600">CoeurDesire</span>, we believe that true beauty stems from a place of deep self-love. Our consultations and products are not just enhancements; they are invitations to honor the temple that is your body.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Carousel Style */}
      <section className="py-24 bg-coeur-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <h3 className="text-3xl font-serif text-coeur-900">Curated Essentials</h3>
          <Link to="/contact" className="text-coeur-600 font-bold hover:text-coeur-800 transition-colors flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="flex gap-8 px-6 overflow-x-auto pb-12 snap-x hide-scrollbar">
          {PRODUCTS.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[280px] md:min-w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden group snap-center"
            >
              <div className="h-64 overflow-hidden relative">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-bold text-coeur-800">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif text-xl text-coeur-900">{product.name}</h4>
                  <span className="text-coeur-600 font-bold">{product.price}</span>
                </div>
                <p className="text-stone-500 text-sm mb-4">{product.description}</p>
                <button className="w-full border border-coeur-300 text-coeur-700 py-2 rounded-lg hover:bg-coeur-50 transition-colors uppercase text-xs tracking-widest font-bold">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-coeur-800 text-coeur-100 relative overflow-hidden">
        {/* Animated background circles */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-coeur-500 rounded-full blur-3xl" 
        />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex gap-1 mb-6 text-gold-400">
              {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={20} />)}
            </div>
            <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight text-white">
              "Healing happens when you decide to treat yourself with reverence."
            </h3>
            <div className="grid gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 flex gap-4 items-center">
                  <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-coeur-400" />
                  <div>
                    <p className="text-white italic mb-2">"{t.text}"</p>
                    <p className="font-bold text-coeur-300">{t.name}</p>
                    <p className="text-xs text-coeur-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[600px] relative hidden md:block">
             <motion.div 
               style={{ y: y2 }}
               className="absolute inset-0 bg-coeur-900 rounded-t-full overflow-hidden border-4 border-coeur-600/30"
             >
                <img src="https://picsum.photos/600/800?random=55" alt="Woman smiling" className="w-full h-full object-cover opacity-80" />
             </motion.div>
          </div>
        </div>
      </section>
    </div>
  </>

  );
};

export default Home;
