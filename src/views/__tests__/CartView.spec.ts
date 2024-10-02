import { mount } from '@vue/test-utils';
import { describe, expect, it, beforeEach } from 'vitest';
import { useCartStore } from '@/stores/cart';
import { createPinia } from 'pinia';

import CartView from '../CartView.vue';

import { products } from '../../mockData';

describe('CartView', () => {
  const cartStore = useCartStore(createPinia());

  beforeEach(() => {
    cartStore.cartProducts = [];
  });

  it('renders the cart view with a non-empty bag', () => {
    cartStore.cartProducts.push(products[0]);

    const wrapper = mount(CartView);

    expect(wrapper.find('[data-test="cart-view"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="total-price"]').text()).toBe('10.99€');
  });

  it('renders the cart view with an empty bag', () => {
    const wrapper = mount(CartView);

    expect(wrapper.find('[data-test="cart-view"]').exists()).toBe(true);
    expect(wrapper.find('div.text-sm.text-center').text()).toBe('Your bag is empty');
  });

  it('renders the subtotal and total price correctly', () => {
    cartStore.cartProducts.push(products[0], products[1]);

    const wrapper = mount(CartView);

    expect(wrapper.find('[data-test="total-price"]').text()).toBe('31.48€');
  });

  it('maches', () => {
    const wrapper = mount(CartView);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
