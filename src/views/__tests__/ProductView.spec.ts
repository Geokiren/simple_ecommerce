import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { createPinia } from 'pinia';

import ProductView from '../ProductView.vue';
import InvalidView from '../InvalidView.vue';
import ProductCard from '@/components/products/ProductCard.vue';

import { products } from '../../mockData';

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, any>),
    useRoute: vi.fn(),
    useRouter: () => ({
      // mock router properties and methods here
    })
  };
});

describe('ProductView', () => {
  let mockRoute: any;

  useProductsStore(createPinia());
  useCartStore(createPinia());

  beforeEach(() => {
    mockRoute = {
      params: {
        id: '1'
      }
    };
    (useRoute as any).mockReturnValue(mockRoute);
  });

  it('renders product details when product is valid', async () => {
    const wrapper = mount(ProductView);

    const instance = wrapper.vm as any;
    instance.product = products[0];

    await nextTick();

    const title = wrapper.find('[data-test="product-title"]');
    const description = wrapper.find('[data-test="product-description"]');
    const price = wrapper.find('[data-test="product-price"]');
    const discount = wrapper.find('[data-test="product-discount"]');
    const rating = wrapper.find('[data-test="product-rating"]');

    expect(title.text()).toBe('Product 1');
    expect(description.text()).toBe('Product 1 description');
    expect(price.text()).toBe('€10.99');
    expect(discount.text()).toBe('10%');
    expect(rating.text()).toBe('4.5');
  });

  it('renders InvalidView if product is not valid', async () => {
    const wrapper = mount(ProductView);

    const instance = wrapper.vm as any;
    instance.isProductValid = false;

    await nextTick();

    expect(wrapper.findComponent(InvalidView).exists()).toBe(true);
    expect(wrapper.find('[data-test="product-view"]').exists()).toBe(false);
  });

  it('renders reviews correctly', async () => {
    const wrapper = mount(ProductView);

    const instance = wrapper.vm as any;
    instance.product = products[0];

    await nextTick();

    const reviewElements = wrapper.findAll('[data-test="review-name"]');

    expect(reviewElements.length).toBe(1);
    expect(reviewElements[0].text()).toBe('John Doe');
    expect(wrapper.findAll('[data-test="review-comment"]')[0].text()).toBe('Great product!');
  });

  it('renders related category products except current one', async () => {
    const wrapper = mount(ProductView);

    const instance = wrapper.vm as any;
    instance.categoryProducts.push(products[1]);

    await nextTick();

    expect(wrapper.findAllComponents(ProductCard)).toHaveLength(1);
    expect(wrapper.findAllComponents(ProductCard)[0].props('product').title).toBe('Product 2');
  });

  it('matches snapshot', async () => {
    const wrapper = mount(ProductView);

    const instance = wrapper.vm as any;
    instance.product = products[0];
    instance.categoryProducts.push(products[1]);

    await nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });
});
