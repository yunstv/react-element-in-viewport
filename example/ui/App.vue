<script setup>
import { ref } from 'vue';
import SiteNav from './components/SiteNav.vue';
import HeroSection from './components/HeroSection.vue';
import ProductSection from './components/ProductSection.vue';
import AdvantageSection from './components/AdvantageSection.vue';
import ProcessSection from './components/ProcessSection.vue';
import SiteFooter from './components/SiteFooter.vue';

// The active service tab is shared: clicking a tab in the product section
// also drives the hero copy and which advantage card is expanded.
const active = ref(0);
</script>

<template>
  <div class="relative w-full bg-white">
    <SiteNav />
    <main>
      <HeroSection :active="active" />
      <ProductSection v-model:active="active" />
      <AdvantageSection :active="active" />
      <ProcessSection />
    </main>
    <SiteFooter />
  </div>
</template>
