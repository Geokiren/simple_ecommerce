import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import InvalidView from '../InvalidView.vue';

describe('NotFoundPage', () => {
  it('renders the SVG icon', () => {
    const wrapper = mount(InvalidView);

    const svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
  });

  it('renders the heading', () => {
    const wrapper = mount(InvalidView);

    const heading = wrapper.find('h1');

    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('Oops! Page not found...');
  });

  it('renders the Go Home button', () => {
    const wrapper = mount(InvalidView);

    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Go Home');
  });

  it('matches snapshot', () => {
    const wrapper = mount(InvalidView);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
