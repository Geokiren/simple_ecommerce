<template>
  <button :title="title" @click="handleClick">

    <div v-if="isDark" class="flex items-center justify-between">
      <IconLight  :classes="size" />
      <div v-if="showLabel" data-test="light-mode">Light Mode</div>
    </div>

    <div v-else class="flex items-center justify-between">
      <IconDark :classes="size" />
      <div v-if="showLabel" data-test="dark-mode">Dark Mode</div>
    </div>

  </button>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue';
  import { useDark, useToggle } from '@vueuse/core';

  import IconLight from '@/components/icons/IconLight.vue';
  import IconDark from '@/components/icons/IconDark.vue';

  const { size = 'size-8', showLabel = false }: { size?: string, showLabel?: boolean } = defineProps<{
    size?: string,
    showLabel?: boolean
  }>();

  const isDark = useDark();

  const toggleTheme = useToggle(isDark);

  const title = computed(() => {
    return isDark.value ? 'Light Mode' : 'Dark Mode';
  });

  const handleClick = () => {
    toggleTheme();
  }
</script>