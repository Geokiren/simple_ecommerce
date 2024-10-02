import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import MediaCarousel from '../MediaCarousel.vue';

describe('MediaCarousel', () => {
  it('renders the selected media image', async () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const wrapper = mount(MediaCarousel, {
      props: { images }
    });

    await nextTick();

    expect(wrapper.find('.selected-media img').exists()).toBe(true);
    expect(wrapper.find('.selected-media img').attributes('data-src')).toBe(images[0]);
  });

  it('renders thumbnails when there are multiple images', async () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const wrapper = mount(MediaCarousel, {
      props: { images }
    });

    expect(wrapper.find('.thumbnails').exists()).toBe(true);
    expect(wrapper.findAll('.thumbnails img').length).toBe(images.length);
  });

  it('does not render thumbnails when there is only one image', async () => {
    const images = ['image1.jpg'];
    const wrapper = mount(MediaCarousel, {
      props: { images }
    });

    expect(wrapper.find('.thumbnails').exists()).toBe(false);
  });

  it('matches snapshot', async () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const wrapper = mount(MediaCarousel, {
      props: { images }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
