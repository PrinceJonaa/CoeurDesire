import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { PRODUCTS as LEGACY_PRODUCTS } from '../constants';
import type { ProductItem } from '../types';
import { supabase } from '../lib/supabase';
import { asProductItem, type ProductRow } from '../lib/productData';

type ProductsState = { products: ProductItem[]; loading: boolean; error: string | null; reload: () => Promise<void> };
const ProductContext = createContext<ProductsState | null>(null);
export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductItem[]>(supabase ? [] : LEGACY_PRODUCTS);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState<string | null>(null);
  const reload = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').eq('status', 'published')
      .order('sort_order', { ascending: true }).order('name', { ascending: true });
    if (error) setError('Unable to load the current product collection.');
    else { setError(null); setProducts((data as ProductRow[]).map(asProductItem)); }
    setLoading(false);
  }, []);
  useEffect(() => { void reload(); }, [reload]);
  return <ProductContext.Provider value={{ products, loading, error, reload }}>{children}</ProductContext.Provider>;
}
export function useProducts(): ProductsState {
  const state = useContext(ProductContext);
  if (!state) throw new Error('ProductsProvider is missing');
  return state;
}
