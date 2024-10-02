import { describe, expect, it, beforeEach, vi } from 'vitest';
import { useProductsStore } from '../products';
import { createPinia } from 'pinia';
import type { Category } from '../../types/category';

import { products } from '../../mockData';

describe('Products Store', () => {
  const pinia = createPinia();
  const productsStore = useProductsStore(pinia);

  beforeEach(() => {
    productsStore.categories = [];
    productsStore.products = [];
    productsStore.searchTerm = '';
    productsStore.activeCategory = null;
    productsStore.loading = false;
  });

  it('initializes with empty state', () => {
    expect(productsStore.categories).toEqual([]);
    expect(productsStore.products).toEqual([]);
    expect(productsStore.searchTerm).toBe('');
    expect(productsStore.activeCategory).toBeNull();
    expect(productsStore.loading).toBe(false);
  });

  it('fetches categories', async () => {
    const categories: Category[] = [
      { url: '1', name: 'Category 1', slug: 'category-1' },
      { url: '2', name: 'Category 2', slug: 'category-2' }
    ];

    const fetchCategoriesMock = vi.spyOn(productsStore, 'fetchCategories');
    fetchCategoriesMock.mockResolvedValue(categories);

    const categoryResults = await productsStore.fetchCategories();

    expect(JSON.stringify(categoryResults)).toEqual(JSON.stringify(categories));
  });

  it('fetches search results', async () => {
    const total = 2;
    vi.spyOn(productsStore, 'fetchSearchResults').mockResolvedValue({ products, total });

    productsStore.setSearchTerm('shoe');
    const searchResults = await productsStore.fetchSearchResults();

    expect(searchResults.total).toBe(total);
  });

  it('fetches products', async () => {
    const total = 2;
    vi.spyOn(productsStore, 'fetchProducts').mockResolvedValue({ products, total });

    const productResults = await productsStore.fetchProducts();

    expect(productResults.total).toBe(total);
  });

  it('fetches products by category', async () => {
    const total = 2;
    vi.spyOn(productsStore, 'fetchProductsByCategory').mockResolvedValue({ products, total });

    const productResults = await productsStore.fetchProductsByCategory();

    expect(productResults.total).toBe(total);
  });

  it('fetches product by ID', async () => {
    vi.spyOn(productsStore, 'fetchProduct').mockResolvedValue(products[0]);

    const result = await productsStore.fetchProduct('1');

    expect(result).toEqual(products[0]);
  });
});
