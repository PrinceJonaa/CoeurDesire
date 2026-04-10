import { Sparkles, Heart, Leaf, Star } from 'lucide-react';
import { ProductItem, ServiceItem, Testimonial } from './types';

export const PRODUCTS: ProductItem[] = [
  {
    id: '1',
    slug: 'essence-of-amber',
    name: 'Essence of Amber',
    category: 'Oil',
    price: '$45.00',
    priceNum: 45,
    image: 'https://picsum.photos/seed/30/600/600',
    images: [
      'https://picsum.photos/seed/30/600/600',
      'https://picsum.photos/seed/33/600/600',
      'https://picsum.photos/seed/34/600/600',
    ],
    cardBg: 'linear-gradient(145deg, #f9ede0 0%, #f0d5ac 40%, #d4a96a 80%, #b8894a 100%)',
    description: 'A warm, grounding body oil that melts into skin and soothes the senses.',
    longDescription:
      'Essence of Amber is a luxurious grounding body oil crafted to reconnect you with the earth and your deepest self. Infused with warm amber resin, rich jojoba, and healing botanicals, this oil sinks effortlessly into the skin, leaving behind a subtle golden glow and a sense of deep calm. Ideal for daily rituals, evening wind-downs, or moments when you need to return to your center. Each bottle is hand-poured in small batches and energetically cleansed before packaging.',
    ingredients: [
      'Jojoba Oil (Simmondsia chinensis)',
      'Sweet Almond Oil (Prunus amygdalus dulcis)',
      'Amber Resin Extract',
      'Frankincense Essential Oil (Boswellia serrata)',
      'Vetiver Essential Oil (Vetiveria zizanioides)',
      'Vitamin E (Tocopherol)',
      'Natural Amber Fragrance',
    ],
    howToUse:
      'Warm a few drops between your palms and press gently into damp skin after bathing. Use in long, intentional strokes from feet upward. For a deeper ritual, massage into the soles of your feet and temples before bed. May also be used as a hair sealing oil on dry ends.',
    benefits: [
      'Deeply nourishes and softens skin',
      'Promotes grounding and emotional calm',
      'Absorbs quickly without a greasy residue',
      'Suitable for all skin types',
      'Free from parabens, sulfates, and synthetic dyes',
    ],
    inStock: true,
    badge: 'Bestseller',
  },
  {
    id: '2',
    slug: 'silk-hydration-mist',
    name: 'Silk Hydration Mist',
    category: 'Hair',
    price: '$32.00',
    priceNum: 32,
    image: 'https://picsum.photos/seed/31/600/600',
    images: [
      'https://picsum.photos/seed/31/600/600',
      'https://picsum.photos/seed/35/600/600',
      'https://picsum.photos/seed/36/600/600',
    ],
    cardBg: 'linear-gradient(145deg, #e8f0f8 0%, #c8ddf0 40%, #9fc0e8 80%, #6fa0d8 100%)',
    description: 'A lightweight curl-refreshing mist that revives definition and adds luminous shine.',
    longDescription:
      'Silk Hydration Mist is a botanically charged curl refresher designed for coils, waves, and textured hair that craves moisture between wash days. A fine mist of rose hydrosol, aloe vera, and silk amino acids envelops each strand in weightless hydration, reviving curl pattern and eliminating frizz without stiffness or buildup. Scented with a soft blend of white tea and jasmine, this mist transforms your refresh routine into a sensory ritual. Formulated without alcohol or silicones.',
    ingredients: [
      'Purified Water',
      'Rose Hydrosol (Rosa damascena)',
      'Aloe Vera Juice (Aloe barbadensis)',
      'Silk Amino Acids',
      'Glycerin (vegetable-derived)',
      'Panthenol (Pro-Vitamin B5)',
      'White Tea Extract (Camellia sinensis)',
      'Jasmine Absolute',
      'Optiphen Plus (preservative)',
    ],
    howToUse:
      'Section hair and mist generously from roots to ends, focusing on areas that need the most revival. Scrunch curls upward to re-activate definition. Follow with your preferred styling cream or leave-in conditioner if desired. Can be used daily on dry hair or layered over wet hair post-wash.',
    benefits: [
      'Refreshes and redefines curl pattern',
      'Adds luminous shine without buildup',
      'Reduces frizz in humid and dry conditions',
      'Alcohol-free and silicone-free formula',
      'Suitable for all curl types (2A–4C)',
    ],
    inStock: true,
    badge: 'New Arrival',
  },
  {
    id: '3',
    slug: 'rose-gold-elixir',
    name: 'Rose Gold Elixir',
    category: 'Oil',
    price: '$55.00',
    priceNum: 55,
    image: 'https://picsum.photos/seed/32/600/600',
    images: [
      'https://picsum.photos/seed/32/600/600',
      'https://picsum.photos/seed/37/600/600',
      'https://picsum.photos/seed/38/600/600',
    ],
    cardBg: 'linear-gradient(145deg, #fce4e8 0%, #f0b8c4 40%, #e090a0 80%, #c86878 100%)',
    description: 'A radiance-boosting face and body elixir with a velvety rose petal finish.',
    longDescription:
      'Rose Gold Elixir is our most precious formulation — a luminous, multi-use radiance oil that bridges the boundary between skincare and ritual. Pressed from Bulgarian rose petals and blended with 24K gold mica, rosehip seed oil, and sea buckthorn, this elixir delivers a warm, dewy glow that illuminates from within. Wear it alone over moisturizer for a lit-from-within finish, layer it with bronzer, or use it on décolletage and limbs for a golden body glow. The scent — a soft, true rose — lingers beautifully throughout the day.',
    ingredients: [
      'Rosehip Seed Oil (Rosa canina)',
      'Marula Oil (Sclerocarya birrea)',
      'Sea Buckthorn CO2 Extract (Hippophae rhamnoides)',
      'Bulgarian Rose Absolute (Rosa damascena)',
      'Geranium Essential Oil (Pelargonium graveolens)',
      '24K Gold Mica (cosmetic grade)',
      'Vitamin C (Ascorbyl Tetraisopalmitate)',
      'Vitamin E (Tocopherol)',
    ],
    howToUse:
      'For the face: apply 3–4 drops to clean, moisturized skin. Press and blend gently in upward motions. For body: warm several drops between palms and sweep over arms, shoulders, and legs for a golden glow. May be mixed with foundation for a luminous base. Use morning or evening.',
    benefits: [
      'Boosts radiance and natural luminosity',
      'Supports collagen production with Vitamin C',
      'Deeply moisturizes without clogging pores',
      'Non-comedogenic (safe for acne-prone skin)',
      'Multi-use: face, body, and hair ends',
    ],
    inStock: true,
    badge: 'Luxury',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Divine Consultation',
    description:
      'A one-on-one virtual session where we explore your wellness intentions, skin and hair concerns, and craft a personalized ritual plan using CoeurDesire products and holistic practices.',
    icon: Sparkles,
    image: 'https://picsum.photos/seed/10/800/600',
    cardBg: 'linear-gradient(145deg, #e8dff5 0%, #c4aee8 50%, #9b7fd4 100%)',
    price: '$75',
    inPerson: false,
    comingSoon: false,
  },
  {
    id: '2',
    title: 'Natural Crown Care',
    description:
      'An immersive in-person hair care experience for textured and natural hair. Includes a deep conditioning treatment, scalp massage, and personalized product pairing ritual.',
    icon: Star,
    image: 'https://picsum.photos/seed/11/800/600',
    cardBg: 'linear-gradient(145deg, #d8eedd 0%, #a8d5b0 50%, #6aad7a 100%)',
    price: '$120',
    inPerson: true,
    comingSoon: true,
  },
  {
    id: '3',
    title: 'Aromatherapy Alchemy',
    description:
      'Receive a curated aromatherapy kit shipped to your door, paired with a guided virtual session on blending oils for mood, sleep, focus, or healing. No in-person visit required.',
    icon: Leaf,
    image: 'https://picsum.photos/seed/12/800/600',
    cardBg: 'linear-gradient(145deg, #f9ede0 0%, #f0d5ac 50%, #d4a96a 100%)',
    price: '$95',
    inPerson: false,
    comingSoon: false,
  },
  {
    id: '4',
    title: 'Modalities of Grace',
    description:
      'A full in-person healing experience combining sound therapy, body oiling, and breathwork. Designed for deep restoration and emotional release in a sacred, held space.',
    icon: Heart,
    image: 'https://picsum.photos/seed/13/800/600',
    cardBg: 'linear-gradient(145deg, #fce4ec 0%, #f0a8c0 50%, #d4688a 100%)',
    price: '$180',
    inPerson: true,
    comingSoon: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Amara J.',
    role: 'Wellness Coach',
    text: 'CoeurDesire oils have completely transformed my self-care routine. The Essence of Amber is something I reach for every single night. The scent alone is grounding in a way I cannot describe.',
    image: 'https://picsum.photos/seed/20/200/200',
  },
  {
    id: '2',
    name: 'Destiny R.',
    role: 'Natural Hair Advocate',
    text: 'The Silk Hydration Mist is unlike anything I have tried for my 4C coils. My curls are more defined, softer, and the frizz is genuinely gone by the second day. I will never go without it.',
    image: 'https://picsum.photos/seed/21/200/200',
  },
  {
    id: '3',
    name: 'Soleil M.',
    role: 'Yoga Instructor',
    text: 'I used the Rose Gold Elixir before a photoshoot and everyone asked what I was glowing from. It is not just an oil — it is a ritual. CoeurDesire understands sacred beauty.',
    image: 'https://picsum.photos/seed/22/200/200',
  },
];

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  },
};
