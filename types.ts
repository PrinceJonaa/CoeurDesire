import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  price?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Oil' | 'Hair' | 'Accessory';
  price: string;
  image: string;
  description: string;
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
  SERVICES = '/services',
  MISSION = '/mission',
  CONTACT = '/contact',
}