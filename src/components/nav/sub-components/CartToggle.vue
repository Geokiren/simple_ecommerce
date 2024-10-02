<template>
  <div title="Bag" class="relative">
    <button @click="handleClick" class="w-full">

      <div class="flex items-center justify-between">
        <IconCart classes="size-8" :active="isCartDropdownOpen" />
        <div v-if="showLabel">View Cart</div>
      </div>
      

      <span
        v-if="hasCartItems"
        class="absolute -top-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
        :class="showLabel ? 'left-4' : '-right-1'"
      >
        {{ cartCounter }}
      </span>
    </button>

    <div
      v-if="isCartDropdownOpen && !isMobile"
      class="absolute right-0 mt-2 w-80 bg-secondary shadow-lg rounded-md z-50"
      @click.stop
    >
      <div class="flex flex-col gap-2 p-4">
        <ProductsCart v-if="hasCartItems" :showInput="false" />

        <div v-else class="text-sm text-center">Your bag is empty</div>
      </div>

      <div class="p-1 border-t"></div>

      <div class="p-4 flex items-center justify-between">
        <div class="font-bold">Subtotal:</div>

        <div>{{ totalPrice }}€</div>
      </div>

      <router-link 
        to="/cart" 
        class="block p-4 bg-primary text-alttext dark:text-text font-bold text-sm text-center hover:bg-active dark:hover:text-alttext transition duration-300 ease-in-out"
        title="View Bag"
      >
        View Bag
      </router-link>
    </div>

    <div v-if="isCartDropdownOpen && !isMobile" @click="isCartDropdownOpen = false" class="fixed inset-0 z-40"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed, defineProps } from 'vue';
  import { useRouter } from 'vue-router';

  import { useCartStore } from '@/stores/cart';
  import { storeToRefs } from 'pinia';

  import IconCart from '@/components/icons/IconCart.vue';
  import ProductsCart from '@/components/products/ProductsCart.vue';

  const { showLabel = false }: { showLabel?: boolean } = defineProps<{
    showLabel?: boolean,
  }>();

  // Store
  const cartStore = useCartStore();
  const { cartCounter, totalPrice } = storeToRefs(cartStore);

  // State
  const isCartDropdownOpen = ref(false);
  const isMobile = ref(false);

  const hasCartItems = computed(() => cartCounter.value > 0);

  const router = useRouter();

  const handleClick = () => {
    if (isMobile.value) {
      router.push('/cart');
    } else {
      isCartDropdownOpen.value = !isCartDropdownOpen.value;
    }
  };

  const handleResize = () => {
    isMobile.value = window.innerWidth < 768;
  };

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>
