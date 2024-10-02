<template>
  <div
    class="relative overflow-hidden"
    :class="classes"
  >
    <img
      ref="imgRef"
      :src="lazy ? '' : src"
      :data-src="lazy ? src : undefined"
      :srcset="srcSet"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      @load="handleLoad"
      @error="handleError"
      class="inset-0 w-full h-full object-cover transition-opacity duration-300"
      :class="{
        'opacity-0': !isLoaded && !hasError,
        'opacity-100': isLoaded && !hasError
      }"
    />
    <div
      v-if="blurhash && !isLoaded && !hasError"
      class="absolute inset-0 bg-cover bg-center"
      :style="{
        backgroundImage: `url(data:image/png;base64,${blurhash})`,
        filter: 'blur(20px)',
        transform: 'scale(1.2)'
      }"
    ></div>
    <img
      v-if="hasError && fallbackSrc"
      :src="fallbackSrc"
      :alt="alt"
      class="absolute inset-0 w-full h-full object-cover"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'

  interface Props {
    src: string
    alt: string
    width?: number
    height?: number
    lazy?: boolean
    blurhash?: string
    fallbackSrc?: string
    classes?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    lazy: true,
    classes: '',
  })

  const emit = defineEmits<{
    (e: 'imageLoaded'): void
  }>()

  const imgRef = ref<HTMLImageElement | null>(null)
  const isLoaded = ref(false)
  const hasError = ref(false)

  const srcSet = computed(() => {
    if (!props.width) return undefined
    const sizes = [0.5, 1, 1.5, 2]
    return sizes
      .map((scale) => `${props.src} ${Math.round(props.width! * scale)}w`)
      .join(', ')
  })

  const sizes = computed(() => {
    if (!props.width) return undefined
    return `(max-width: ${props.width}px) 100vw, ${props.width}px`
  })

  const handleLoad = () => {
    isLoaded.value = true
    emit('imageLoaded');
  }

  const handleError = () => {
    hasError.value = true
  }

  onMounted(() => {
    if (props.lazy && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.value) {
            imgRef.value.src = props.src
            observer.unobserve(imgRef.value)
          }
        })
      })
      if (imgRef.value) observer.observe(imgRef.value)
    }
  })
</script>

