<template>
  <TransitionGroup 
    tag="section" 
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 max-w-screen-2xl mx-auto gap-3" 
  >
    <slot />
  </TransitionGroup>
</template>