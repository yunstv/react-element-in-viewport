<script setup>
const navLogo = new URL('../../assets/ui/nav-logo.png', import.meta.url).href;
const searchIcon = new URL('../../assets/ui/search-icon.svg', import.meta.url).href;

const links = [
  '首页',
  '服务产品',
  '解决方案',
  '市场洞察',
  '社会责任',
  '新闻中心',
  '关于赞华'
];
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-30 h-16">
    <div class="mx-auto flex h-16 max-w-[1440px] items-center px-8 lg:px-[120px]">
      <img :src="navLogo" alt="赞华集团" class="h-9 w-auto object-contain" />

      <nav class="ml-auto flex items-center gap-7 lg:gap-9">
        <a
          v-for="(item, i) in links"
          :key="item"
          href="#"
          class="text-sm text-white/90 transition-colors hover:text-white"
          :class="{ 'font-medium text-white': i === 1 }"
          >{{ item }}</a
        >
        <span class="hidden h-4 w-px bg-white/30 sm:block"></span>
        <button
          type="button"
          aria-label="搜索"
          class="grid size-6 place-items-center opacity-90 transition-opacity hover:opacity-100"
        >
          <img :src="searchIcon" alt="" class="size-4" />
        </button>
      </nav>
    </div>
  </header>
</template>
