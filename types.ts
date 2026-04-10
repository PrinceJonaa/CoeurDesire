import { LucideIcon } from "lucide-react";

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: 'Oil' | 'Hair' | 'Accessory';
  price: string;
  priceNum: number;
  image: string;
  images?: string[];
  cardBg?: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  howToUse: string;
  benefits: string[];
  inStock: boolean;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  cardBg?: string;
  price?: string;
  inPerson?: boolean;
  comingSoon?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
}

export enum PageRoute {
  HOME = '/',
  CATALOG = '/catalog',
  SERVICES = '/services',
  MISSION = '/mission',
  CONTACT = '/contact',
}
