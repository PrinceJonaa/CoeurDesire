import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ArrowLeft, Package, Leaf, Truck, ShoppingBag, Star } from 'lucide-react';
import { PRODUCTS, ANIMATION_VARIANTS } from '../constants';
import { SEO } from '../components/SEO';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [howToOpen, setHowToOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 520);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        <h1 className="font-serif text-4xl text-coeur-900 mb-4">Product Not Found</h1>
        <p className="text-stone-500 mb-8">This product may have moved or is no longer available.</p>
        <Link to="/catalog" className="bg-coeur-800 text-white px-8 py-3 rounded-full hover:bg-coeur-700 transition-colors">Back to Collection</Link>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);
  const views = ['Front View', 'Detail', 'Texture'];

  return (
    <>
      <SEO title={product.name} description={product.description} image={product.image} url={`https://coeurdesire.com/catalog/${product.slug}`} type="product" price={String(product.priceNum)} />

      <div className="min-h-screen bg-coeur-50 pb-24 pt-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm text-stone-400 mb-10">
            <button onClick={() => navigate('/catalog')} className="flex items-center gap-1 hover:text-coeur-600 transition-colors">
              <ArrowLeft size={14} /> Collection
            </button>
            <span>/</span>
            <span className="text-coeur-700">{product.name}</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Visual */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div
                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl mb-4"
                style={{ background: product.cardBg || 'linear-gradient(145deg, #f5ede0, #d4a96a)' }}
              >
                {/* Background rings */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/50" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/40" />
                  <div className="absolute top-12 right-16 w-24 h-24 rounded-full border border-white/30" />
                  <div className="absolute bottom-16 left-12 w-16 h-16 rounded-full border border-white/25" />
                </div>
                {/* Bottle silhouette — larger for detail view */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-10 bg-white/30 rounded-t-lg" />
                    <div className="w-20 h-56 bg-white/20 rounded-full backdrop-blur-sm border border-white/35 shadow-inner" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
                {product.badge && (
                  <div
                    className="absolute top-5 left-5 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow z-20"
                    style={{ background: 'linear-gradient(135deg, #c9935a, #a06838)' }}
                  >
                    {product.badge}
                  </div>
                )}
              </div>
              {/* View pills — decorative */}
              <div className="flex gap-3">
                {views.map((v, i) => (
                  <button
                    key={v}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 h-16 rounded-xl border-2 transition-all text-xs font-medium uppercase tracking-wider overflow-hidden ${activeImage === i ? 'border-coeur-500 shadow-md text-coeur-700' : 'border-transparent opacity-50 hover:opacity-80 text-stone-400'}`}
                    style={{ background: product.cardBg || 'linear-gradient(145deg, #f5ede0, #d4a96a)', filter: activeImage === i ? 'none' : 'saturate(0.6)' }}
                  >
                    <span className="bg-white/60 backdrop-blur-sm px-2 py-1 rounded">{v}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-widest text-coeur-500 bg-coeur-100 px-3 py-1.5 rounded-full self-start mb-4">{product.category}</span>
              <h1 className="font-serif text-4xl md:text-5xl text-coeur-900 mb-3 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-gold-500 font-bold text-3xl">{product.price}</span>
                {product.inStock
                  ? <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">In Stock · Ships Nationwide</span>
                  : <span className="text-xs text-stone-400 font-semibold bg-stone-100 px-3 py-1 rounded-full">Out of Stock</span>}
              </div>
              <p className="text-stone-600 leading-relaxed mb-8 text-base">{product.longDescription}</p>

              <div className="mb-8">
                <h3 className="font-serif text-xl text-coeur-800 mb-4">Benefits</h3>
                <ul className="space-y-2.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                      <Check size={16} className="text-coeur-500 mt-0.5 flex-shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accordions */}
              {[
                { label: 'Ingredients', open: ingredientsOpen, toggle: () => setIngredientsOpen(!ingredientsOpen), content: product.ingredients.join(' · ') },
                { label: 'How to Use', open: howToOpen, toggle: () => setHowToOpen(!howToOpen), content: product.howToUse },
              ].map(({ label, open, toggle, content }) => (
                <div key={label} className="border-t border-coeur-100 mb-3">
                  <button onClick={toggle} className="w-full flex items-center justify-between py-4 text-left">
                    <span className="font-serif text-coeur-800 text-lg">{label}</span>
                    <ChevronDown size={18} className={`text-coeur-500 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="text-sm text-stone-500 pb-4 leading-relaxed">{content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Social proof micro-badge */}
              <div className="flex items-center gap-2 my-4 py-3 px-4 bg-coeur-50 rounded-xl border border-coeur-100">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(n => <Star key={n} size={12} fill="#d4a96a" className="text-amber-400" />)}
                </div>
                <span className="text-xs text-coeur-700 font-medium">5.0 · Loved by our community</span>
                <span className="ml-auto text-xs text-coeur-500 italic">Responds within 24–48 hrs</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 my-4">
                <Link
                  to={`/contact?subject=${encodeURIComponent(`Order Inquiry: ${product.name}`)}&product=${product.slug}`}
                  className="flex-1 text-white text-center py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #6b4226, #4a2e18)' }}
                >
                  <ShoppingBag size={16} /> Order / Inquire
                </Link>
                <a href={`mailto:inquiry@coeurdesire.com?subject=Order Inquiry: ${encodeURIComponent(product.name)}&body=Hi, I'm interested in purchasing ${encodeURIComponent(product.name)} ($${product.priceNum}). Please let me know how to proceed.`}
                  className="flex-1 border-2 border-coeur-300 text-coeur-700 text-center py-4 rounded-full font-medium hover:border-coeur-600 hover:bg-coeur-50 transition-all flex items-center justify-center gap-2">
                  Email Directly
                </a>
              </div>

              <div className="flex flex-wrap gap-4">
                {[{ icon: Leaf, label: 'Natural Ingredients' }, { icon: Package, label: 'Handcrafted' }, { icon: Truck, label: 'Ships Nationwide' }].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-stone-500">
                    <Icon size={14} className="text-coeur-400" />{label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="font-serif text-3xl text-coeur-900 mb-8 text-center">You May Also Love</h2>
              <motion.div variants={ANIMATION_VARIANTS.container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {related.map((p) => (
                  <motion.div key={p.id} variants={ANIMATION_VARIANTS.item}>
                    <Link to={`/catalog/${p.slug}`} className="group flex gap-5 bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
                      <div
                        className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative"
                        style={{ background: p.cardBg || 'linear-gradient(145deg, #f5ede0, #d4a96a)' }}
                      >
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/50" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center" style={{ marginTop: '-4px' }}>
                          <div className="w-3.5 h-4 bg-white/40 rounded-t rounded-b-none" />
                          <div className="w-7 h-14 bg-white/22 rounded-xl border border-white/40 relative overflow-hidden">
                            <div className="absolute top-2 left-1 w-0.5 h-6 bg-white/30 rounded-full" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/10" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs text-coeur-500 uppercase tracking-widest mb-1">{p.category}</span>
                        <h3 className="font-serif text-xl text-coeur-900 mb-1">{p.name}</h3>
                        <span className="text-gold-500 font-bold">{p.price}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom purchase bar — appears after scrolling past hero */}
      <AnimatePresence>
        {showStickyBar && product.inStock && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
          >
            <div className="bg-white/97 backdrop-blur-md border-t border-coeur-100 shadow-2xl px-5 py-3.5 flex items-center gap-4 max-w-7xl mx-auto">
              <div className="flex-1 min-w-0">
                <p className="font-serif text-coeur-900 text-base font-semibold leading-tight truncate">{product.name}</p>
                <p className="text-amber-600 font-bold text-sm">{product.price}</p>
              </div>
              <Link
                to={`/contact?subject=${encodeURIComponent(`Order Inquiry: ${product.name}`)}&product=${product.slug}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white whitespace-nowrap shadow-lg hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #6b4226, #4a2e18)' }}
              >
                <ShoppingBag size={14} /> Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetail;
