<template>
  <nav class="bg-secondary shadow-md sticky top-0 z-10" @click.stop>
    <div class="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo / Brand -->
      <router-link to="/" class="text-xl font-bold">
        E - Commerce
      </router-link>

      <div class="flex">
        <div class="relative items-baseline gap-2 hidden md:flex">
          <ToggleTheme />
          <CartToggle />
        </div>

        <button class="md:hidden" @click="toggleMobileMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      ref="mobileMenu"
      class="md:hidden flex flex-col px-4 py-2 absolute bg-secondary w-full shadow-lg"
      @click.stop
    >
      <ToggleTheme showLabel />
      <CartToggle showLabel />
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  import CartToggle from './sub-components/CartToggle.vue';
  import ToggleTheme from './sub-components/ToggleTheme.vue';

  const isMobileMenuOpen = ref(false);
  const mobileMenu = ref<HTMLElement | null>(null);

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isMobileMenuOpen.value && mobileMenu.value && !mobileMenu.value.contains(event.target as Node)) {
      isMobileMenuOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

