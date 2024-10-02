<template>
  <ProductFilters />

  <GridContainer>
    <ProductCard 
      v-for="(product, index) in products" 
      :key="product.id" 
      :product="product"
      :isLast="index === products.length - 1"
    />
  </GridContainer>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  import ProductFilters from '@/components/products/ProductFilters.vue';
  import GridContainer from '../layout/GridContainer.vue';
  import ProductCard from '../components/products/ProductCard.vue';

  import { useProductsStore } from '../stores/products';

  const productsStore = useProductsStore();
  const { products } = storeToRefs(productsStore);

  const fetchProducts = async () => {
    try {
      await productsStore.fetchProducts();
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  onMounted(async () => {
    await fetchProducts();
  });
</script>