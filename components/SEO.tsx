import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product';
  price?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, image, url, type = 'website', price }) => {
  useEffect(() => {
    const fullTitle = `${title} | CoeurDesire`;
    document.title = fullTitle;

    const setMeta = (nameOrProp: string, content: string, isProp = false) => {
      const attr = isProp ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProp);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    if (image) { setMeta('og:image', image, true); setMeta('twitter:image', image); }
    if (url) setMeta('og:url', url, true);
    if (price) setMeta('product:price:amount', price, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);

    return () => { document.title = 'CoeurDesire | Beauty & Healing'; };
  }, [title, description, image, url, type, price]);

  return null;
};
