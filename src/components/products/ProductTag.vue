<template>
  <div class="rounded-md p-1 bg-active text-alttext text-center text-sm">
    {{ tag }}
  </div >
</template>

<script setup lang="ts">
  defineProps({
    tag: {
      type: String,
      required: true
    }
  })
</script>