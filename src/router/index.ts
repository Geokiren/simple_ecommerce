import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useProductsStore } from '@/stores/products';

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: (to, from, next) => {
        const store = useProductsStore();
        const { categories } = storeToRefs(store);

        if (!categories.value.length) {
          store.fetchCategories();
        }

        next();
      },
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/InvalidView.vue')
    }
  ]
});

export default router;
