import type { Directive } from 'vue';

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void;
}

const clickOutside: Directive = {
  beforeMount(el: ClickOutsideElement, binding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: ClickOutsideElement) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent);
    }
  }
};

export default clickOutside; 