<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  note: { type: String, default: '' }
});
</script>

<template>
  <div class="flex flex-col items-center gap-3 text-center" v-reveal>
    <h2 class="text-3xl font-semibold text-ink-soft lg:text-4xl">{{ title }}</h2>
    <p v-if="subtitle" class="text-base leading-8 text-muted">{{ subtitle }}</p>
    <p v-if="note" class="text-base tracking-wide text-faint">{{ note }}</p>
  </div>
</template>
