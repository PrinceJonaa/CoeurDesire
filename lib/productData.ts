import type { ProductItem } from '../types';

export type ProductStatus = 'draft' | 'published';
export type ProductRow = {
  id: string; slug: string; name: string; category: ProductItem['category'];
  price_num: number; image_url: string; images: string[]; card_bg: string;
  hint: string; description: string; long_description: string;
  ingredients: string[]; how_to_use: string; benefits: string[];
  in_stock: boolean; badge: string; purchase_url: string; status: ProductStatus;
  sort_order: number; created_at?: string; updated_at?: string;
};
export const slugify = (value: string) => value.toLowerCase().trim()
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const lines = (value: string) => value.split('\n').map(s => s.trim()).filter(Boolean);
export const asProductItem = (row: ProductRow): ProductItem => ({
  id: row.id, slug: row.slug, name: row.name, category: row.category,
  price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.price_num),
  priceNum: Number(row.price_num), image: row.image_url,
  images: row.images || [], cardBg: row.card_bg || undefined,
  hint: row.hint, description: row.description,
  longDescription: row.long_description, ingredients: row.ingredients || [],
  howToUse: row.how_to_use, benefits: row.benefits || [],
  inStock: row.in_stock, badge: row.badge || undefined,
  purchaseUrl: row.purchase_url || undefined,
});
export const fromExistingProduct = (p: ProductItem, sort_order: number): ProductRow => ({
  id: p.id, slug: p.slug, name: p.name, category: p.category,
  price_num: p.priceNum, image_url: '', images: [], card_bg: p.cardBg || '',
  hint: p.hint || '', description: p.description,
  long_description: p.longDescription, ingredients: p.ingredients,
  how_to_use: p.howToUse, benefits: p.benefits,
  in_stock: p.inStock, badge: p.badge || '', purchase_url: '',
  status: 'published', sort_order,
});
export const emptyProduct = (): ProductRow => ({
  id: crypto.randomUUID(), slug: '', name: '', category: 'Oil', price_num: 0,
  image_url: '', images: [], card_bg: '', hint: '', description: '',
  long_description: '', ingredients: [], how_to_use: '', benefits: [],
  in_stock: true, badge: '', purchase_url: '', status: 'draft', sort_order: 0,
});
export const validateProduct = (p: ProductRow): string | null => {
  if (!p.name.trim()) return 'Product name is required.';
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) return 'Choose a valid lowercase URL slug.';
  if (!Number.isFinite(Number(p.price_num)) || Number(p.price_num) < 0) return 'Price must be zero or greater.';
  if (p.purchase_url) {
    try { if (new URL(p.purchase_url).protocol !== 'https:') return 'Checkout links must use HTTPS.'; }
    catch { return 'Enter a valid HTTPS checkout URL.'; }
  }
  return null;
};
