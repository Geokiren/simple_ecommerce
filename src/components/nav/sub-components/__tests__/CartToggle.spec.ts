import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { useCartStore } from '@/stores/cart';
import { createPinia } from 'pinia';

import CartToggle from '../../sub-components/CartToggle.vue';

import { products } from '@/mockData';

describe('CartButton', () => {
  const cartStore = useCartStore(createPinia());

  beforeEach(() => {
    cartStore.cartProducts = [];
  });

  it('renders the cart button', () => {
    const wrapper = mount(CartToggle);

    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('renders the cart counter', async () => {
    cartStore.addToBasket(products[0]);
    cartStore.addToBasket(products[1]);

    const wrapper = mount(CartToggle);

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.absolute.-top-1.bg-red-600').text()).toBe('2');
  });

  it('renders the cart dropdown on click', async () => {
    const wrapper = mount(CartToggle);

    await wrapper.find('button').trigger('click');

    expect(wrapper.find('.absolute.right-0.mt-2.w-80.bg-secondary').exists()).toBe(true);
  });

  it('toggles cart dropdown on click on desktop', async () => {
    const wrapper = mount(CartToggle, {
      props: {
        showLabel: true
      }
    });

    const instance = wrapper.vm as any;

    const windowMock = {
      innerWidth: 1200,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      Event: global.Event
    };

    vi.stubGlobal('window', windowMock);

    const clickEvent = new global.Event('click');

    await wrapper.find('button').element.dispatchEvent(clickEvent);

    expect(instance.isCartDropdownOpen).toBe(true);

    await wrapper.find('button').element.dispatchEvent(clickEvent);

    expect(instance.isCartDropdownOpen).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = mount(CartToggle);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
