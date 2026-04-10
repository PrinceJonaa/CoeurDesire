import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, PRODUCTS, TESTIMONIALS } from '../constants';
import { ArrowRight, Star, Sparkles, ShoppingBag, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusable decorative SVG element — botanical ring
const BotanicalRing = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.35" />
    <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.2" />
    <path d="M100 10 C115 50 130 70 100 90 C70 70 85 50 100 10Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" />
    <path d="M100 10 C115 50 130 70 100 90 C70 70 85 50 100 10Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" transform="rotate(72,100,100)" />
    <path d="M100 10 C115 50 130 70 100 90 C70 70 85 50 100 10Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" transform="rotate(144,100,100)" />
    <path d="M100 10 C115 50 130 70 100 90 C70 70 85 50 100 10Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" transform="rotate(216,100,100)" />
    <path d="M100 10 C115 50 130 70 100 90 C70 70 85 50 100 10Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" transform="rotate(288,100,100)" />
  </svg>
);

// Product card gradient image placeholder
const ProductCardImage = ({ cardBg, badge, category, hint }: { cardBg?: string; badge?: string; category: string; hint?: string }) => (
  <div
    className="w-full h-full relative flex items-center justify-center overflow-hidden"
    style={{ background: cardBg || 'linear-gradient(145deg, #f5ede0, #d4a96a)' }}
  >
    {/* Decorative rings */}
    <div className="absolute inset-0 opacity-25 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-white/60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-white/45" />
      <div className="absolute top-5 right-7 w-16 h-16 rounded-full border border-white/35" />
      <div className="absolute bottom-10 left-5 w-10 h-10 rounded-full border border-white/30" />
    </div>
    {/* Radial glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.30) 0%, transparent 70%)' }}
    />
    {/* Bottle silhouette */}
    <div className="relative z-10 flex flex-col items-center" style={{ marginTop: '-12px' }}>
      <div className="w-7 h-8 bg-white/40 rounded-t-lg rounded-b-sm border border-white/50 shadow-sm" />
      <div className="w-4 h-3 bg-white/35 border-x border-white/40" />
      <div className="w-14 h-32 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/40 shadow-lg relative overflow-hidden">
        <div className="absolute top-3 left-2 w-1.5 h-14 bg-white/30 rounded-full" />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-9 h-8 bg-white/20 rounded border border-white/30" />
      </div>
    </div>
    {/* Shimmer */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/15 pointer-events-none" />
    {/* Badge */}
    {badge && (
      <div className="absolute top-4 left-4 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm z-20"
        style={{ background: 'linear-gradient(135deg, #c9935a, #a06838)' }}>
        {badge}
      </div>
    )}
    {/* Ingredient hint */}
    {hint && (
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 px-4">
        <div className="bg-white/80 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-[0.14em] text-coeur-800 px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">
          {hint}
        </div>
      </div>
    )}
  </div>
);

const Home = () => {
  return (
    <>
      <SEO title="Home" description="CoeurDesire is a luxury beauty and wellness brand offering natural hair care oils, scented products, and self-love rituals. Ships nationwide." url="https://coeurdesire.com/" />
      <div className="overflow-hidden">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Gradient background */}
          <div
            className="absolute inset-0 z-0"
            style={{ background: 'linear-gradient(160deg, #f9f0e6 0%, #f2e6d4 30%, #e8d5bc 60%, #dcc8aa 100%)' }}
          />
          {/* Soft texture overlay */}
          <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #c9935a33 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4a96a22 0%, transparent 50%)' }} />

          {/* Large decorative botanical rings */}
          <BotanicalRing className="absolute top-[-8%] right-[-5%] w-[380px] h-[380px] text-coeur-700 opacity-25 hidden md:block" />
          <BotanicalRing className="absolute bottom-[-10%] left-[-8%] w-[300px] h-[300px] text-coeur-600 opacity-20 hidden md:block" />

          {/* Floating ambient circles */}
          <motion.div
            animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[15%] right-[8%] w-40 h-40 rounded-full hidden md:block"
            style={{ background: 'linear-gradient(135deg, #f9ede0aa, #d4a96a66)', backdropFilter: 'blur(2px)', border: '1px solid rgba(212,169,106,0.3)' }}
          />
          <motion.div
            animate={{ y: [0, 14, 0], x: [0, -6, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-[18%] left-[6%] w-28 h-28 rounded-full hidden md:block"
            style={{ background: 'linear-gradient(135deg, #fce4e8aa, #e090a066)', border: '1px solid rgba(224,144,160,0.25)' }}
          />

          {/* Hero content — no y transform, no blank gap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-2 border border-coeur-700/25 rounded-full bg-white/40 backdrop-blur-sm"
            >
              <Sparkles size={12} className="text-coeur-700" />
              <span className="text-coeur-800 uppercase tracking-[0.22em] text-xs font-bold">Woman Owned • Soul Centered</span>
            </motion.div>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-8xl font-serif text-coeur-900 mb-6 leading-[1.05] tracking-tight"
            >
              Radiate from <br />
              the <em className="not-italic" style={{ color: '#b8894a' }}>Heart</em>
            </motion.h1>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-stone-600 font-light mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Luxury natural hair care, sacred oils, and wellness rituals designed to harmonize your outer glow with your inner desire.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/catalog">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(184,137,74,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold text-white shadow-lg transition-all"
                  style={{ background: 'linear-gradient(135deg, #6b4226, #4a2e18)' }}
                >
                  <ShoppingBag size={16} />
                  Shop the Collection
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold border-2 transition-all bg-white/50 backdrop-blur-sm"
                  style={{ borderColor: 'rgba(107,66,38,0.4)', color: '#4a2e18' }}
                >
                  Explore Services <ArrowRight size={15} />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-coeur-700/50 text-[9px] uppercase tracking-[0.25em]">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 rounded-full"
              style={{ background: 'linear-gradient(to bottom, rgba(107,66,38,0.5), transparent)' }}
            />
          </motion.div>
        </section>

        {/* ── Trust Marquee ─────────────────────────────────────────────── */}
        <div className="py-3.5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #3d2010, #2a1508)' }}>
          <div className="animate-marquee">
            {[
              '✦ Clean Ingredients',
              '·',
              'Woman Owned',
              '·',
              'Small Batch Crafted',
              '·',
              'Ships Nationwide',
              '·',
              'Paraben Free',
              '·',
              'Cruelty Free',
              '·',
              'All Natural',
              '·',
              'Handpoured with Love',
              '·',
              'Clean Ingredients',
              '·',
              'Woman Owned',
              '·',
              'Small Batch Crafted',
              '·',
              'Ships Nationwide',
              '·',
              'Paraben Free',
              '·',
              'Cruelty Free',
              '·',
              'All Natural',
              '·',
              'Handpoured with Love',
              '·',
            ].map((item, i) => (
              <span key={i} className="text-coeur-300 text-[10px] uppercase tracking-[0.2em] mx-5 shrink-0 whitespace-nowrap">{item}</span>
            ))}
          </div>
        </div>

        {/* ── Brand Promise ─────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={ANIMATION_VARIANTS.container}
              className="text-center"
            >
              <motion.div variants={ANIMATION_VARIANTS.item} className="inline-flex items-center gap-2 mb-5">
                <div className="h-px w-12 bg-coeur-300" />
                <Leaf size={14} className="text-coeur-500" />
                <div className="h-px w-12 bg-coeur-300" />
              </motion.div>
              <motion.h2 variants={ANIMATION_VARIANTS.item} className="text-4xl md:text-5xl font-serif text-coeur-900 mb-6 leading-tight">
                Beauty as a Ritual
              </motion.h2>
              <motion.p variants={ANIMATION_VARIANTS.item} className="text-lg text-stone-500 leading-relaxed max-w-2xl mx-auto">
                At <span className="font-semibold text-coeur-700">CoeurDesire</span>, we believe true beauty stems from deep self-love. Our products and consultations are not mere enhancements — they are invitations to honor the temple that is your body.
              </motion.p>
            </motion.div>

            {/* Three pillar icons */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={ANIMATION_VARIANTS.container}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
            >
              {[
                { icon: '✦', title: 'Clean Ingredients', desc: 'Every formula is built on botanicals, plant oils, and nature-derived actives — nothing synthetic.' },
                { icon: '◎', title: 'Intentional Craft', desc: 'Small-batch, hand-poured in a sacred space. Each product carries the energy of the hands that made it.' },
                { icon: '❋', title: 'Ships Nationwide', desc: 'Your ritual, delivered. Free shipping on orders over $75. Arrives in understated, compostable packaging.' },
              ].map((p) => (
                <motion.div key={p.title} variants={ANIMATION_VARIANTS.item} className="text-center group">
                  <div className="w-14 h-14 rounded-full bg-coeur-50 border border-coeur-200 flex items-center justify-center text-xl text-coeur-700 mx-auto mb-4 group-hover:border-coeur-400 transition-colors duration-300">
                    {p.icon}
                  </div>
                  <h3 className="font-serif text-lg text-coeur-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Featured Products ─────────────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f9f4ee 0%, #f2ebe0 100%)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-coeur-500 mb-2">Curated for You</p>
                <h3 className="text-3xl md:text-4xl font-serif text-coeur-900">Signature Essentials</h3>
              </div>
              <Link to="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold text-coeur-700 hover:text-coeur-900 transition-colors uppercase tracking-widest group">
                View Full Collection
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-400"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <ProductCardImage cardBg={product.cardBg} badge={product.badge} category={product.category} hint={product.hint} />
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif text-xl text-coeur-900 leading-snug">{product.name}</h4>
                      <span className="text-amber-600 font-bold text-lg ml-3 shrink-0">{product.price}</span>
                    </div>
                    <p className="text-stone-500 text-sm mb-5 leading-relaxed line-clamp-2">{product.description}</p>
                    <Link
                      to={`/catalog/${product.slug}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:gap-3"
                      style={{ background: 'linear-gradient(135deg, #5c3520, #3d2010)', color: '#fff' }}
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #3d2010 0%, #2a1508 100%)' }}>
          {/* Ambient glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ background: '#c9935a' }}
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 15, repeat: Infinity, delay: 3 }}
            className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: '#e090a0' }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={ANIMATION_VARIANTS.container}
              className="text-center mb-16"
            >
              <motion.div variants={ANIMATION_VARIANTS.item} className="flex justify-center gap-1 mb-4">
                {[1,2,3,4,5].map(n => <Star key={n} size={16} fill="#d4a96a" className="text-amber-400" />)}
              </motion.div>
              <motion.h3 variants={ANIMATION_VARIANTS.item} className="text-3xl md:text-4xl font-serif text-white mb-3 leading-tight max-w-2xl mx-auto">
                "Healing happens when you treat yourself with reverence."
              </motion.h3>
              <motion.p variants={ANIMATION_VARIANTS.item} className="text-coeur-300 text-sm uppercase tracking-[0.2em]">
                What our community says
              </motion.p>
            </motion.div>

            {/* Testimonial cards */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={ANIMATION_VARIANTS.container}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.id}
                  variants={ANIMATION_VARIANTS.item}
                  className="bg-white/8 backdrop-blur-md rounded-2xl p-7 border border-white/10 flex flex-col gap-4 hover:border-white/20 transition-colors duration-300"
                >
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(n => <Star key={n} size={12} fill="#d4a96a" className="text-amber-400" />)}
                  </div>
                  <p className="text-coeur-100 italic text-sm leading-relaxed flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                    {/* Initials avatar — no random images */}
                    <div className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-lg text-coeur-900 shrink-0"
                      style={{ background: 'linear-gradient(135deg, #f5e9d5, #d4a96a)' }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-coeur-400 text-xs uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Newsletter ────────────────────────────────────────────────── */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #f9f0e6 0%, #f2e6d4 100%)' }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={ANIMATION_VARIANTS.container}
            >
              <motion.div variants={ANIMATION_VARIANTS.item} className="w-12 h-12 rounded-full bg-coeur-800 flex items-center justify-center mx-auto mb-6">
                <Sparkles size={20} className="text-coeur-200" />
              </motion.div>
              <motion.h2 variants={ANIMATION_VARIANTS.item} className="text-3xl md:text-4xl font-serif text-coeur-900 mb-3 leading-tight">
                Join the Ritual
              </motion.h2>
              <motion.p variants={ANIMATION_VARIANTS.item} className="text-stone-500 mb-8 leading-relaxed max-w-md mx-auto">
                Be the first to know about new launches, self-care rituals, and exclusive offers for our community.
              </motion.p>
              <motion.form
                variants={ANIMATION_VARIANTS.item}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 border border-coeur-200 bg-white rounded-full px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-coeur-300 transition shadow-sm"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, boxShadow: '0 12px 28px rgba(107,66,38,0.28)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-full text-sm font-semibold text-white whitespace-nowrap shadow-md"
                  style={{ background: 'linear-gradient(135deg, #6b4226, #4a2e18)' }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
              <motion.p variants={ANIMATION_VARIANTS.item} className="text-xs text-stone-400 mt-4">No spam, ever. Unsubscribe anytime.</motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={ANIMATION_VARIANTS.container}
            >
              <motion.p variants={ANIMATION_VARIANTS.item} className="text-xs uppercase tracking-[0.22em] text-coeur-500 mb-4">Begin Your Ritual</motion.p>
              <motion.h2 variants={ANIMATION_VARIANTS.item} className="text-4xl md:text-5xl font-serif text-coeur-900 mb-6 leading-tight">
                Your Glow Starts Here
              </motion.h2>
              <motion.p variants={ANIMATION_VARIANTS.item} className="text-stone-500 mb-10 leading-relaxed text-lg">
                Browse handcrafted oils and hair care essentials built for your self-love ritual. Every product ships nationwide.
              </motion.p>
              <motion.div variants={ANIMATION_VARIANTS.item} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/catalog">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(184,137,74,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold text-white shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #6b4226, #4a2e18)' }}
                  >
                    Shop Now
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold border-2 border-coeur-300 text-coeur-700 hover:border-coeur-600 transition-colors"
                  >
                    Book a Consultation
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

export default Home;
