import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles, Leaf, Star } from 'lucide-react';
import { PRODUCTS, ANIMATION_VARIANTS } from '../constants';
import { SEO } from '../components/SEO';

type FilterType = 'All' | 'Oil' | 'Hair' | 'Accessory';
const FILTERS: FilterType[] = ['All', 'Oil', 'Hair'];

// Product card gradient image
const ProductCardImage = ({ cardBg, badge, category }: { cardBg?: string; badge?: string; category: string }) => (
  <div
    className="w-full h-full relative flex items-center justify-center overflow-hidden"
    style={{ background: cardBg || 'linear-gradient(145deg, #f5ede0, #d4a96a)' }}
  >
    {/* Background rings */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/40" />
      <div className="absolute top-6 right-8 w-16 h-16 rounded-full border border-white/30" />
      <div className="absolute bottom-8 left-6 w-10 h-10 rounded-full border border-white/25" />
    </div>
    {/* Bottle silhouette */}
    <div className="relative z-10 flex flex-col items-center gap-1.5">
      <div className="w-5 h-6 bg-white/35 rounded-sm" />
      <div className="w-12 h-28 bg-white/20 rounded-full backdrop-blur-sm border border-white/35 shadow-inner" />
    </div>
    {/* Shimmer */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/12 pointer-events-none" />
  </div>
);

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

      {/* ── Hero Header ──────────────────────────────────────────────── */}
      <div
        className="relative pt-36 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #3d2010 0%, #2a1508 55%, #1e0e06 100%)' }}
      >
        {/* Ambient glows */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: '#c9935a' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 -left-16 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: '#e090a0' }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-5 px-5 py-2 border border-white/15 rounded-full bg-white/8 backdrop-blur-sm"
          >
            <Sparkles size={12} className="text-amber-400" />
            <span className="text-coeur-200 text-[11px] uppercase tracking-[0.22em]">Handcrafted with Love</span>
          </motion.div>

          <motion.h1
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif text-white mb-5 leading-tight"
          >
            The Collection
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-coeur-200 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Natural oils, hair care, and wellness essentials crafted for your self-love ritual.
            <span className="text-coeur-300"> All products ship nationwide.</span>
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-10 text-center"
          >
            {[
              { num: '100%', label: 'Clean Ingredients' },
              { num: 'Small', label: 'Batch Crafted' },
              { num: 'Free', label: 'Shipping $75+' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-white font-serif text-xl">{s.num}</span>
                <span className="text-coeur-400 text-[10px] uppercase tracking-[0.18em]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Filter pills */}
        <div className="flex gap-3 mb-12 flex-wrap items-center">
          <span className="text-coeur-500 text-xs uppercase tracking-widest mr-2 hidden md:block">Filter:</span>
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeFilter === f
                  ? 'text-white shadow-lg'
                  : 'bg-coeur-100 text-coeur-700 hover:bg-coeur-200'
              }`}
              style={activeFilter === f ? { background: 'linear-gradient(135deg, #6b4226, #4a2e18)' } : {}}
            >
              {f === 'All' ? `All (${PRODUCTS.length})` : f}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={ANIMATION_VARIANTS.container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((product) => (
              <motion.article
                key={product.id}
                variants={ANIMATION_VARIANTS.item}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* Image area */}
                <Link to={`/catalog/${product.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    <ProductCardImage cardBg={product.cardBg} category={product.category} />
                  </motion.div>

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className="absolute top-4 left-4 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md z-10"
                      style={{ background: 'linear-gradient(135deg, #c9935a, #a06838)' }}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Stock indicator */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                      <span className="text-coeur-800 text-sm font-semibold uppercase tracking-widest">Out of Stock</span>
                    </div>
                  )}
                </Link>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Rating stars (decorative — shows as 5-star) */}
                  <div className="flex gap-0.5 mb-3">
                    {[1,2,3,4,5].map(n => <Star key={n} size={11} fill="#d4a96a" className="text-amber-400" />)}
                    <span className="text-stone-400 text-xs ml-1.5">(5.0)</span>
                  </div>

                  <h3 className="font-serif text-2xl text-coeur-900 mb-1.5 leading-snug group-hover:text-coeur-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-5 line-clamp-2 flex-1">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-bold" style={{ color: '#c9935a' }}>{product.price}</span>
                    {product.inStock
                      ? <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />In Stock</span>
                      : <span className="text-xs text-stone-400">Out of Stock</span>
                    }
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      to={`/catalog/${product.slug}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 text-white hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #5c3520, #3d2010)' }}
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                    <Link
                      to="/contact"
                      title="Inquire about this product"
                      className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-coeur-200 text-coeur-500 hover:border-coeur-500 hover:text-coeur-700 hover:bg-coeur-50 transition-all duration-300 shrink-0"
                    >
                      <ShoppingBag size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Custom Blends CTA ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #3d2010, #2a1508)' }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: '#c9935a' }}
          />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Leaf size={14} className="text-coeur-300" />
              <span className="text-coeur-300 text-xs uppercase tracking-[0.2em]">Bespoke Service</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Custom Blends Available</h2>
            <p className="text-coeur-200 mb-8 max-w-xl mx-auto leading-relaxed">
              Looking for something tailored to your skin or hair needs? Reach out for a personalized formulation consultation and we'll craft your signature blend.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f5e9d5, #d4a96a)', color: '#2a1508' }}
            >
              Start an Inquiry <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Catalog;
