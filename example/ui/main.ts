import { createApp } from 'vue';
import App from './App.vue';
import './ui.css';

const app = createApp(App);

// v-reveal: fade + rise the element when it scrolls into the viewport.
// A nod to this repo's theme — element-in-viewport triggers animation.
app.directive('reveal', {
  mounted(el: HTMLElement, binding) {
    el.classList.add('reveal-init');
    const delay = Number(binding.value ?? 0);
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          window.setTimeout(() => {
            el.classList.remove('reveal-init');
            el.classList.add('reveal-in');
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
  }
});

app.mount('#app');
