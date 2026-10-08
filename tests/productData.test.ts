import test from 'node:test';
import assert from 'node:assert/strict';
import { asProductItem, emptyProduct, slugify, validateProduct } from '../lib/productData.ts';

test('slugs normalize accents, spacing and punctuation', () => {
  assert.equal(slugify('  Crème & Rose — Deluxe!  '), 'creme-rose-deluxe');
});
test('a new product starts as an unpublished draft', () => {
  const product = emptyProduct();
  assert.equal(product.status, 'draft');
  assert.equal(product.in_stock, true);
  assert.equal(product.purchase_url, '');
  assert.equal(validateProduct(product), 'Product name is required.');
});
test('unsafe checkout links and invalid prices are rejected', () => {
  const product = {...emptyProduct(), name:'Test', slug:'test', price_num:45};
  assert.equal(validateProduct({...product, purchase_url:'javascript:alert(1)'}), 'Checkout links must use HTTPS.');
  assert.equal(validateProduct({...product, purchase_url:'http://example.com'}), 'Checkout links must use HTTPS.');
  assert.equal(validateProduct({...product, purchase_url:'https://example.com'}), null);
  assert.equal(validateProduct({...product, price_num:-1}), 'Price must be zero or greater.');
});
test('published product values are converted for storefront cards', () => {
  const product = {...emptyProduct(), name:'Amber Oil', slug:'amber-oil', price_num:45, status:'published' as const};
  const display = asProductItem(product);
  assert.equal(display.price, '$45.00');
  assert.equal(display.slug, 'amber-oil');
  assert.equal(display.inStock, true);
});
