import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

import {
  getCategories,
  searchProducts,
  getProducts,
  getProductsByCategory,
  getProduct
} from '@/services/products';

import type { Product } from '../types';
import type { Category } from '../types/category';

interface IPaging {
  limit: number;
  skip: number;
}

interface ISortBy {
  sortBy: string;
  order: string;
}

export const useProductsStore = defineStore('products', () => {
  const categories = ref<Category[]>([]);
  const products = ref<Product[]>([]);

  const paging = ref<IPaging>({
    limit: 30,
    skip: 0
  });

  const total = ref(0);

  const searchTerm = ref<string>('');

  const sorting = ref<ISortBy>({
    sortBy: 'title',
    order: 'asc'
  });

  const activeCategory = ref<Category | null>(null);

  const loading = ref(false);

  const filters = computed(() => {
    const sortBy = sorting.value.sortBy ? `&sortBy=${sorting.value.sortBy}` : '';
    const order = sortBy ? `&order=${sorting.value.order}` : '';
    const pagingParams = `&limit=${paging.value.limit}&skip=${paging.value.skip}`;

    return `?${new URLSearchParams(sortBy + order + pagingParams).toString()}`;
  });

  const setSearchTerm = (term: string) => {
    searchTerm.value = term;
  };

  const setActiveCategory = (category: Category | null) => {
    activeCategory.value = category;
  };

  const setSorting = (value: string, property: 'sortBy' | 'order') => {
    sorting.value[property] = value;
  };

  const hasMorePages = computed(() => {
    return products.value.length < total.value;
  });

  const incrementPage = () => {
    if (hasMorePages.value) {
      paging.value = { ...paging.value, skip: paging.value.skip + paging.value.limit };
    }
  };

  function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function (this: any, ...args: Parameters<T>) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        timeoutId = null;
      }, delay);
    };
  }

  const debouncedSearch = debounce(async () => {
    await fetchSearchResults();
  }, 300);

  watch(searchTerm, async (value: string) => {
    if (!value) {
      products.value = [];
      fetchProducts();
      return;
    }

    if (value.length >= 3) {
      products.value = [];
      debouncedSearch();
    }
  });

  watch(activeCategory, (value: Category | null) => {
    if (!value) {
      products.value = [];
      fetchProducts();
      return;
    }

    products.value = [];
    fetchProductsByCategory();
  });

  watch(paging, (newValue, oldValue) => {
    if (activeCategory.value) {
      if (newValue.limit !== oldValue.limit) products.value = [];
      fetchProductsByCategory();
      return;
    }

    if (newValue.limit !== oldValue.limit) products.value = [];
    fetchProducts();
  });

  watch(
    sorting,
    () => {
      if (activeCategory.value) {
        products.value = [];
        fetchProductsByCategory();
      } else {
        products.value = [];
        fetchProducts();
      }
    },
    { deep: true }
  );

  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const categories: Category[] = await getCategories();
      return categories;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchSearchResults = async (): Promise<{ products: Product[]; total: number }> => {
    loading.value = true;

    try {
      const data = await searchProducts(searchTerm.value);

      products.value = data.products;
      total.value = data.total;

      return { products: data.products, total: data.total };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchProducts = async (): Promise<{ products: Product[]; total: number }> => {
    loading.value = true;

    try {
      const data = await getProducts(filters.value);

      products.value = [...products.value, ...data.products];
      total.value = data.total;

      return { products: data.products, total: data.total };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchProductsByCategory = async (returnData?: boolean, category?: string) => {
    if (!category && !activeCategory.value) {
      console.error('No category provided');
      return;
    }

    loading.value = true;

    try {
      const categoryToUse = category || activeCategory.value?.slug || '';

      const data = await getProductsByCategory(categoryToUse, filters.value);

      if (returnData) {
        return data?.products || [];
      } else {
        products.value = [...products.value, ...data.products];
        total.value = data.total;
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const fetchProduct = async (id: string) => {
    try {
      const product = await getProduct(id);
      return product;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    categories,
    activeCategory,
    products,
    searchTerm,
    loading,
    fetchCategories,
    fetchSearchResults,
    fetchProductsByCategory,
    fetchProducts,
    fetchProduct,
    setSearchTerm,
    setActiveCategory,
    setSorting,
    incrementPage
  };
});
