<template>
  <section class="max-w-screen-2xl mx-auto px-6 py-6 flex flex-col gap-4" data-test="cart-view">
    <h1 class="text-2xl text-center  font-bold px-4 pt-4 pb-2 w-full border-b">Your Bag</h1>

    <ProductsCart v-if="totalPrice > 0" />

    <div v-else class="text-sm text-center">Your bag is empty</div>

    <div class="p-4 flex items-center justify-between">
      <div class="font-bold">Subtotal:</div>

      <div data-test="total-price" >{{ totalPrice }}€</div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useCartStore } from '@/stores/cart';
  import { storeToRefs } from 'pinia';

  import ProductsCart from '@/components/products/ProductsCart.vue';

  const cartStore = useCartStore();
  const { totalPrice } = storeToRefs(cartStore);
</script>