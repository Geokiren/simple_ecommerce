<template>
  <section v-if="isProductValid" class="max-w-screen-2xl mx-auto px-6 py-6 flex flex-col gap-4" data-test="product-view">
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-2/3 h-auto lg:pr-2">
        <MediaCarousel v-if="product?.images?.length" :images="product?.images || []" />
      </div>

      <div class="w-full lg:w-1/3 mt-6 lg:mt-0 lg:ps-2 flex flex-col gap-2 lg:gap-10">
        <h1 class="text-xl text-center font-bold mb-2" data-test="product-title">{{ product?.title }}</h1>

        <div class="flex justify-between items-center">
          <div class="flex gap-1 flex-wrap">
            <ProductTag v-for="tag in product?.tags" :key="tag" :tag="tag" />
          </div>

          <div class="flex gap-1 items-center">
            <span data-test="product-rating">{{ product?.rating }}</span>
            <IconStar classes="size-5" />
          </div>
        </div>

        <p class="text-sm leading-6 font-light" data-test="product-description">{{ product?.description }}</p>

        <div class="flex">
          <div v-if="product?.discountPercentage" class="p-2 bg-primary text-xl font-semibold rounded-s text-alttext dark:text-text" data-test="product-discount">{{ product?.discountPercentage }}%</div>
          <div class="text-xl font-semibold rounded p-2 bg-secondary rounded-e" data-test="product-price">€{{ product?.price }}</div>
        </div>

        <div class="flex flex-col gap-2">
          <button 
            class="btn bg-primary rounded p-4 text-lg hover:bg-active dark:hover:text-alttext transition duration-300 ease-in-out text-alttext dark:text-text mt-4 lg:mt-0"
            data-test="product-add-to-bag"
            @click="addToBasket"
          >
            ADD TO BAG
          </button>

          <div class="text-xs lg:text-sm text-center">
            <span data-test="product-return-policy">{{ product?.returnPolicy }}</span>
            <span> | </span>
            <span data-test="product-shipping-info">{{ product?.shippingInformation }}</span>
            <span> | </span>
            <span data-test="product-warranty-info">{{ product?.warrantyInformation }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="categoryProducts.length">
      <h1 class="text-xl text-center lg:text-left font-bold px-4 pt-4 pb-2 w-full border-b">Products in category</h1>

      <GridContainer>
        <ProductCard 
          v-for="product in filteredCategoryProducts" 
          :key="product.id" 
          :product="product"
          :isLast="false"
        />
      </GridContainer>
    </div>
 
    <div class="flex flex-col gap-2 lg:gap-4">
      <h1 class="text-xl text-center lg:text-left font-bold px-4 pt-4 pb-2 w-full border-b">Reviews</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="p-4 bg-secondary rounded-lg shadow-md" v-for="review in reviews" :key="review.id">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-12 h-12 rounded-full overflow-hidden">
                <div class="rounded-full w-full h-full bg-primary text-alttext dark:text-text font-bold text-lg flex items-center justify-center">
                  <div data-test="review-initials">{{ review.reviewerName.split(' ').map(name => name[0]).join('') }}</div>             
                </div>
              </div>
              <div class="text-lg font-bold" data-test="review-name">{{ review.reviewerName }}</div>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-lg" data-test="review-rating">{{ review.rating }}</span>
              <IconStar classes="size-5" />
            </div>
          </div>
          
          <div class="mt-2 text-lg">
            <p data-test="review-comment">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <InvalidView v-else />
</template>

<script setup lang="ts">
  import { ref, onMounted, computed, nextTick, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useProductsStore } from '@/stores/products';
  import { useCartStore } from '@/stores/cart';
  import { storeToRefs } from 'pinia';
  import type { Product } from '../types';

  import MediaCarousel from '@/components/products/MediaCarousel.vue';
  import ProductTag from '@/components/products/ProductTag.vue';
  import IconStar from '@/components/icons/IconStar.vue';
  import GridContainer from '@/layout/GridContainer.vue';
  import ProductCard from '@/components/products/ProductCard.vue';
  import InvalidView from './InvalidView.vue';

  const route = useRoute();

  const productsStore = useProductsStore();
  const { products } = storeToRefs(productsStore);

  const cartStore = useCartStore();

  const productId = ref(route.params.id);
  const product = ref<Product | undefined>({} as Product);
  const categoryProducts = ref<Product[]>([]);
  const isProductValid = ref(true);

  const reviews = computed(() => product.value?.reviews?.map(review => ({ ...review, id: crypto.randomUUID() })) || []);
  const filteredCategoryProducts = computed(() => categoryProducts.value.filter(product => product.id !== Number(productId.value)));

  const getProduct = async () => {
    const id = Array.isArray(productId.value) ? productId.value[0] : productId.value;
    return await productsStore.fetchProduct(id);
  };

  const addToBasket = () => {
    if (!product.value) return;

    cartStore.addToBasket(product.value);
  };

  watch(
    () => route.params.id,
    async (newId) => {
      productId.value = newId;
      product.value = await getProduct();
    },
  );

  onMounted(async () => {
    if (!products.value.length) {
      product.value = await getProduct();

      if (!product.value?.id) {
        isProductValid.value = false;
        return;
      }
    } else {
      product.value = products.value.find(product => product.id === Number(productId.value));
    }

    nextTick(async () => {
      if (product.value?.category) {
        categoryProducts.value = await productsStore.fetchProductsByCategory(true, product.value.category);
      }
    });
    
  });
</script>
