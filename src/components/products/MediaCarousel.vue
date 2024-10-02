<template>
  <div class="media-slider flex flex-col gap-1 w-full">
    <div class="selected-media w-full">
      <div class="relative aspect-video bg-secondary rounded-lg">
        <OptimizedImage 
          v-if="activeImage"
          :key="activeImage"
          class="w-full h-full object-cover"  
          :src="activeImage" 
          alt="Product Image" 
          @load="onImageLoad" 
        />
      </div>
    </div>

    <div v-if="areImagesGreaterThanOne" class="thumbnails flex gap-1 w-full h-16 lg:h-24 4xl:h-32 overflow-auto">
      <OptimizedImage 
        v-for="(image, index) in images" 
        :key="image" 
        class="cursor-pointer rounded-lg  bg-secondary" 
        :class="{ 'border-2 border-active': image === activeImage }" 
        :src="image"
        :alt="`thumbnail-${index}`"
        loading="lazy"
        @click="activeImage = image" 
      /> 
    </div>
  </div>
</template>


<script setup lang="ts">
  import { ref, computed, defineProps, onMounted, onUpdated } from 'vue';

  import OptimizedImage from '../shared/OptimizedImage.vue';

  interface Props {
    images: string[];
  }

  const { images } = defineProps<Props>();

  const imageLoaded = ref<boolean>(false);

  const onImageLoad = () => {
    imageLoaded.value = true;
  }

  const activeImage = ref('');

  const areImagesGreaterThanOne = computed(() => {
    return images.length > 1;
  });

  onMounted(() => {
    activeImage.value = images[0];
  });

  onUpdated(() => {
    activeImage.value = images[0];
  });
</script>
