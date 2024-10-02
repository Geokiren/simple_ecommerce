import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import ThemeToggle from '../ToggleTheme.vue';
import IconLight from '@/components/icons/IconLight.vue';
import IconDark from '@/components/icons/IconDark.vue';

describe('ThemeToggle', () => {
  it('renders light mode by default', () => {
    const wrapper = mount(ThemeToggle);

    expect(wrapper.findComponent(IconDark).exists()).toBe(true);
    expect(wrapper.findComponent(IconLight).exists()).toBe(false);
  });

  it('renders dark mode when isDark is true', () => {
    const wrapper = mount(ThemeToggle, {
      props: {
        isDark: true
      }
    });

    expect(wrapper.findComponent(IconDark).exists()).toBe(true);
    expect(wrapper.findComponent(IconLight).exists()).toBe(false);
  });

  it('does not render label when showLabel is false', () => {
    const wrapper = mount(ThemeToggle, {
      props: {
        showLabel: false
      }
    });

    expect(wrapper.find('div').text()).not.toContain('Light Mode');
  });

  it('toggles theme when clicked', async () => {
    const wrapper = mount(ThemeToggle);

    await wrapper.find('button').trigger('click');

    expect(wrapper.findComponent(IconDark).exists()).toBe(false);
    expect(wrapper.findComponent(IconLight).exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = mount(ThemeToggle);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
