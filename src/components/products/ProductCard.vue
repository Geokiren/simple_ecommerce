<template>
  <div
    class="relative overflow-hidden rounded-lg shadow-lg transition hover:scale-[1.03] duration-300 ease-in-out cursor-pointer  group"
    :ref="isLast ? (el) => { lastItemRef = el as HTMLElement } : undefined"
    @click="goToProductPage"
  >
    <div class="aspect-w-2 aspect-h-1">
      <OptimizedImage
        :src="product.thumbnail"
        alt="Product Thumbnail"
        classes="object-cover w-full h-full"
        @imageLoaded="onImageLoaded"
      />
    </div>

    <div
      class="w-full max-h-0 group-hover:max-h-full opacity-0 group-hover:opacity-90 overflow-hidden transition-all duration-700 ease-in-out absolute left-0 right-0 bottom-0 rounded-b-md bg-secondary  p-4 "
    >
      <h3 class="text-lg font-boldmb-2 text-center">{{ product.title }}</h3>
      <p class="text-sm p-1">{{ product.description }}</p>

      <div class="flex items-center justify-between">
        <div class="flex gap-1 items-center">
          <span>{{ product?.rating }}</span>
          <IconStar classes="size-5" />
        </div>

        <div class="text-xl font-semibold text-right w-full">{{ product.price }}€</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, ref, onUnmounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useIntersectionObserver } from '@vueuse/core';
  import { useProductsStore } from '../../stores/products';
  import { storeToRefs } from 'pinia';
  
  import type { Product } from '../../types';

  import OptimizedImage from '../shared/OptimizedImage.vue';
  import IconStar from '../icons/IconStar.vue';

  const { product, isLast } = defineProps<{
    product: Product;
    isLast: boolean;
  }>();

  const productsStore = useProductsStore();
  const { loading } = storeToRefs(productsStore);

  const lastItemRef = ref<HTMLElement | null>(null)
  
  const observerOptions = {
    rootMargin: '300px',
    threshold: 0,
  };

  const stopObserver = ref(() => {});

  const setupObserver = () => {
    stopObserver.value()
    const { stop } = useIntersectionObserver(
      lastItemRef,
      ([entry]) => {
        if (entry?.isIntersecting) {
          stopObserver.value();
          productsStore.incrementPage();
        }
      },
      observerOptions
    )
    stopObserver.value = stop
  }

  onUnmounted(() => {
    stopObserver.value()
  });

  watch(() => isLast, (value) => {
    if (!value) stopObserver.value();
  });

  const onImageLoaded = () => {
    if (isLast && !loading.value) setupObserver();
  };
  
  const router = useRouter();

  const goToProductPage = () => {
    router.push(`/product/${product.id}`);
  };
</script>
