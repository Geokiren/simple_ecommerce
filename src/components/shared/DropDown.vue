<template>
  <div class="relative inline-block text-left w-full" ref="dropdownRef">
    <div>
      <button 
        type="button"
        :disabled="disabled"
        class="inline-flex justify-between w-full rounded-md dark:border-background shadow-sm px-4 py-2 bg-secondary text-sm font-medium focus:outline-none"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
        @click="toggleDropdown"
      >
        {{ displayValue }}

        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div v-if="isOpen && !disabled" class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 focus:outline-none z-10 overflow-y-auto max-h-80">
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <button v-if="hasClearButton" class="p-2 text-center border-b w-full hover:bg-secondary dark:hover:bg-background" @click="clearSelectedOption">Clear</button>
        <a
          v-for="option in options"
          :key="option[value]"
          @click="selectOption(option)"
          href="#"
          class="block px-4 py-2 text-sm hover:bg-background dark:hover:bg-background"
          role="menuitem"
        >
          {{ getOptionLabel(option) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props<T> {
  options: T[]
  label: keyof T | ((item: T) => string)
  value: keyof T
  modelValue: T | null
  placeholder?: string
  hasClearButton?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props<any>>(), {
  placeholder: 'Select an option',
  hasClearButton: true,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: any) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const clearSelectedOption = () => {
  emit('update:modelValue', null)
  isOpen.value = false
}

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder
  if (typeof props.label === 'function') {
    return props.label(props.modelValue)
  }
  return props.modelValue[props.label]
})

const getOptionLabel = (option: any) => {
  if (typeof props.label === 'function') {
    return props.label(option)
  }
  return option[props.label]
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>