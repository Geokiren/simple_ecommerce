import { mount } from '@vue/test-utils';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { useProductsStore } from '../../stores/products';
import { createPinia } from 'pinia';

import HomeView from '../HomeView.vue';
import ProductFilters from '@/components/products/ProductFilters.vue';
import ProductCard from '@/components/products/ProductCard.vue';

import { products } from '../../mockData';

describe('HomeView', () => {
  const productsStore = useProductsStore(createPinia());

  beforeEach(() => {
    productsStore.products = [];
  });

  it('renders the product filters and product cards', async () => {
    productsStore.products = [...products];

    const wrapper = mount(HomeView);

    expect(wrapper.findComponent(ProductFilters).exists()).toBe(true);
    expect(wrapper.findAllComponents(ProductCard)).toHaveLength(2);
  });

  it('fetches products when mounted', () => {
    const fetchProductsMock = vi.spyOn(productsStore, 'fetchProducts');

    mount(HomeView);

    expect(fetchProductsMock).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    productsStore.products = [...products];

    const wrapper = mount(HomeView);

    expect(wrapper.element).toMatchSnapshot();
  });
});
