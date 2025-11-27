import { Sparkles, Heart, Droplets, Feather, Sun, Crown, Flower2, Palette } from "lucide-react";
import { ServiceItem, ProductItem, Testimonial } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Divine Consultation',
    description: 'A personalized 1-on-1 session to map your beauty journey, aligning your outer radiance with your inner truth.',
    icon: Heart,
    image: 'https://picsum.photos/800/600?random=1',
    price: '$85'
  },
  {
    id: 's2',
    title: 'Natural Crown Care',
    description: 'Specialized deep conditioning, protective styling, and textural healing for natural hair types.',
    icon: Crown,
    image: 'https://picsum.photos/800/600?random=2',
    price: 'From $120'
  },
  {
    id: 's3',
    title: 'Aromatherapy Alchemy',
    description: 'Custom blended oils crafted to elevate your mood, scent your skin, and heal your spirit.',
    icon: Droplets,
    image: 'https://picsum.photos/800/600?random=3',
    price: '$45'
  },
  {
    id: 's4',
    title: 'Modalities of Grace',
    description: 'Holistic beauty treatments including facial massage, jade rolling, and energy clearing.',
    icon: Sparkles,
    image: 'https://picsum.photos/800/600?random=4',
    price: '$150'
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Essence of Amber',
    category: 'Oil',
    price: '$45.00',
    description: 'A grounding blend of amber, sandalwood, and vanilla.',
    image: 'https://picsum.photos/500/500?random=10'
  },
  {
    id: 'p2',
    name: 'Silk Hydration Mist',
    category: 'Hair',
    price: '$32.00',
    description: 'Revitalize curls with aloe vera and rose water.',
    image: 'https://picsum.photos/500/500?random=11'
  },
  {
    id: 'p3',
    name: 'Rose Gold Elixir',
    category: 'Oil',
    price: '$55.00',
    description: 'Infused with real gold flakes for a radiant glow.',
    image: 'https://picsum.photos/500/500?random=12'
  },
  {
    id: 'p4',
    name: 'Curl Defining Butter',
    category: 'Hair',
    price: '$28.00',
    description: 'Shea butter based sealant for lasting definition.',
    image: 'https://picsum.photos/500/500?random=13'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Amara L.',
    role: 'Loyal Client',
    text: "CoeurDesire isn't just beauty; it's therapy. The oils transformed my morning ritual.",
    image: 'https://picsum.photos/100/100?random=20'
  },
  {
    id: 't2',
    name: 'Jasmine B.',
    role: 'Natural Hair Enthusiast',
    text: "I've never felt more in love with my natural texture. The care here is genuine.",
    image: 'https://picsum.photos/100/100?random=21'
  }
];

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }
};