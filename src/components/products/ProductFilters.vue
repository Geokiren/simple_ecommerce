<template>
  <section class="flex flex-col gap-4 items-center justify-between max-w-screen-2xl mx-auto px-6 pt-6 pb-0">
    <input class="w-full bg-inherit focus:border-b px-2 focus:outline-none text-2xl text-center" type="text" v-model="serchQuery" placeholder="Search">

    <div class="w-full flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col w-full gap-1">
        <label class="text-xs font-semibold ps-1">Category</label>
        <DropDown
          v-model="selectedCategory"
          :options="categories"
          label="name"
          value="slug"
          :disabled="!!searchTerm"
          placeholder="Select a category"
        />
      </div>

      <div class="flex flex-col w-full gap-1">
        <label class="text-xs font-semibold ps-1">Sort By</label>
        <DropDown
          :modelValue="sortValue"
          :options="sortingAttributes"
          :hasClearButton="false"
          label="label"
          value="value"
          placeholder="Sort by"
          :disabled="!!searchTerm"
          @update:modelValue="onChangeSort"
        />
      </div>

      <div class="flex flex-col w-full gap-1">
        <label class="text-xs font-semibold ps-1">Order By</label>
        <DropDown
          :modelValue="orderValue"
          :options="sortingDirection"
          :hasClearButton="false"
          label="label"
          value="value"
          placeholder="Order by"
          :disabled="!!searchTerm"
          @update:modelValue="onChangeOrder"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  import { useProductsStore } from '@/stores/products';
  import { storeToRefs } from 'pinia';

  import DropDown from '../shared/DropDown.vue';

  import type { Category } from '@/types/category'; 

  const productsStore = useProductsStore();

  const { categories, activeCategory, searchTerm } = storeToRefs(productsStore);

  const sortingAttributes = computed(() => {
    return [
      { label: 'Title', value: 'title' },
      { label: 'Price', value: 'price' }
    ]
  });

  const sortingDirection = computed(() => {
    return [
      { label: 'Ascending', value: 'asc' },
      { label: 'Descending', value: 'desc' }
    ]
  });

  const serchQuery = ref<string>('');
  const selectedCategory = ref<Category | null>(activeCategory.value);
  const sortBy = ref<string>('title');
  const order = ref<string>('asc');

  const sortValue = computed(() => {
    return sortingAttributes.value.find((item) => item.value === sortBy.value);
  });

  const orderValue = computed(() => {
    return sortingDirection.value.find((item) => item.value === order.value);
  });

  const onChangeOrder = (selected: { label: string; value: string }) => {
    order.value = selected?.value || 'asc';
  };

  const onChangeSort = (selected: { label: string; value: string }) => {
    sortBy.value = selected?.value || 'title';
  };

  watch(serchQuery, (value) => {
    productsStore.setSearchTerm(value);
  });

  watch(selectedCategory, (value) => {
    productsStore.setActiveCategory(value);
  });

  watch(sortBy, (value) => {
    productsStore.setSorting(value, 'sortBy');
  });

  watch(order, (value) => {
    productsStore.setSorting(value, 'order');
  });
</script>