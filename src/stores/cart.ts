import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { Product } from '../types';

export const useCartStore = defineStore('cart', () => {
  const cartProducts = ref<Product[]>([]);

  const cartCounter = computed(() =>
    cartProducts.value.reduce((acc, curr) => acc + (curr.quantity ?? 0), 0)
  );

  const totalPrice = computed(() =>
    parseFloat(
      cartProducts.value
        .reduce((acc, curr) => acc + curr.price * (curr.quantity ?? 0), 0)
        .toFixed(2)
    )
  );

  const addToBasket = (product: Product) => {
    const foundProduct = cartProducts.value.find((p) => p.id === product.id);

    if (!foundProduct) {
      const newProduct = { ...product, quantity: 1 };
      cartProducts.value.push(newProduct);
    } else {
      foundProduct.quantity = (foundProduct.quantity ?? 0) + 1;
    }

    cartProducts.value = [...cartProducts.value];
  };

  const removeFromBasket = (product: Product) => {
    cartProducts.value = cartProducts.value.filter((p) => p.id !== product.id);
  };

  return { cartProducts, cartCounter, totalPrice, addToBasket, removeFromBasket };
});
