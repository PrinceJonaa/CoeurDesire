import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, ANIMATION_VARIANTS } from '../constants';
import { SEO } from '../components/SEO';

type FilterType = 'All' | 'Oil' | 'Hair' | 'Accessory';
const FILTERS: FilterType[] = ['All', 'Oil', 'Hair'];

const Catalog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const filtered = activeFilter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <SEO
        title="The Collection"
        description="Shop CoeurDesire's luxury natural hair care oils and wellness products. Handcrafted, clean ingredients. Ships nationwide."
        url="https://coeurdesire.com/catalog"
      />

      <div className="bg-coeur-900 text-white pt-32 pb-20 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 12, repeat: Infinity }} className="absolute -bottom-32 -right-32 w-96 h-96 bg-coeur-500 rounded-full blur-3xl opacity-20" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="inline-flex items-center gap-2 mb-4 px-5 py-2 border border-coeur-400/30 rounded-full">
            <Sparkles size={14} className="text-gold-400" />
            <span className="text-coeur-300 text-xs uppercase tracking-widest">Handcrafted with Love</span>
          </motion.div>
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl md:text-7xl font-serif mb-4">
            The Collection
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.8 }} className="text-coeur-200 text-xl max-w-2xl mx-auto">
            Natural oils, hair care, and wellness essentials crafted for your self-love ritual. All products ship nationwide.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex gap-3 mb-12 flex-wrap">
          {FILTERS.map((f) => (
            <motion.button key={f} whileTap={{ scale: 0.96 }} onClick={() => setActiveFilter(f)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${activeFilter === f ? 'bg-coeur-800 text-white shadow-lg shadow-coeur-200' : 'bg-coeur-100 text-coeur-700 hover:bg-coeur-200'}`}>
              {f === 'All' ? `All Products (${PRODUCTS.length})` : f}
            </motion.button>
          ))}
        </div>

        <motion.div variants={ANIMATION_VARIANTS.container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <motion.div key={product.id} variants={ANIMATION_VARIANTS.item} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden bg-coeur-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                {product.badge && <div className="absolute top-4 left-4 bg-gold-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">{product.badge}</div>}
                <div className="absolute top-4 right-4 bg-coeur-100/90 backdrop-blur-sm text-coeur-700 text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded-full">{product.category}</div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-coeur-900 mb-2">{product.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-gold-500 font-bold text-xl">{product.price}</span>
                  {product.inStock ? <span className="text-xs text-emerald-600 font-medium">In Stock</span> : <span className="text-xs text-stone-400">Out of Stock</span>}
                </div>
                <div className="flex gap-3">
                  <Link to={`/catalog/${product.slug}`} className="flex-1 bg-coeur-800 text-white text-center py-3 rounded-full text-sm font-medium hover:bg-coeur-700 transition-colors flex items-center justify-center gap-2">
                    View Details <ArrowRight size={14} />
                  </Link>
                  <Link to="/contact" className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-coeur-300 text-coeur-600 hover:border-coeur-600 hover:bg-coeur-50 transition-all" title="Inquire">
                    <ShoppingBag size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mt-20 bg-coeur-900 rounded-3xl p-10 text-center text-white">
          <h2 className="font-serif text-3xl mb-3">Custom Blends Available</h2>
          <p className="text-coeur-200 mb-6 max-w-xl mx-auto">Looking for something tailored to your skin or hair needs? Reach out for a custom formulation consultation.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-coeur-400 text-coeur-900 font-bold px-8 py-3 rounded-full hover:bg-coeur-300 transition-colors">
            Start an Inquiry <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default Catalog;
