import { describe, expect, it, beforeEach } from 'vitest';
import { useCartStore } from '../cart';
import { createPinia } from 'pinia';

import { products } from '../../mockData';

describe('Cart Store', () => {
  const cartStore = useCartStore(createPinia());

  beforeEach(() => {
    cartStore.cartProducts = [];
  });

  it('initializes with empty cart', () => {
    expect(cartStore.cartProducts).toEqual([]);
    expect(cartStore.cartCounter).toBe(0);
    expect(cartStore.totalPrice).toBe(0);
  });

  it('adds product to cart', () => {
    cartStore.addToBasket(products[0]);

    expect(cartStore.cartProducts).toEqual([products[0]]);
    expect(cartStore.cartCounter).toBe(1);
    expect(cartStore.totalPrice).toBe(10.99);
  });

  it('adds multiple products to cart', () => {
    cartStore.addToBasket(products[0]);
    cartStore.addToBasket(products[1]);

    expect(cartStore.cartProducts).toEqual([products[0], products[1]]);
    expect(cartStore.cartCounter).toBe(2);
    expect(cartStore.totalPrice).toBe(31.48);
  });

  it('increases quantity of existing product in cart', () => {
    cartStore.addToBasket(products[0]);
    cartStore.addToBasket(products[0]);

    expect(cartStore.cartProducts).toEqual([{ ...products[0], quantity: 2 }]);
    expect(cartStore.cartCounter).toBe(2);
    expect(cartStore.totalPrice).toBe(21.98);
  });

  it('removes product from cart', () => {
    cartStore.addToBasket(products[0]);
    cartStore.removeFromBasket(products[0]);

    expect(cartStore.cartProducts).toEqual([]);
    expect(cartStore.cartCounter).toBe(0);
    expect(cartStore.totalPrice).toBe(0);
  });

  it('removes multiple products from cart', () => {
    cartStore.addToBasket(products[0]);
    cartStore.addToBasket(products[1]);
    cartStore.removeFromBasket(products[0]);
    cartStore.removeFromBasket(products[1]);

    expect(cartStore.cartProducts).toEqual([]);
    expect(cartStore.cartCounter).toBe(0);
    expect(cartStore.totalPrice).toBe(0);
  });
});
