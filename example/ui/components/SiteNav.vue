<script setup>
import { ref } from 'vue';
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

const open = ref(false);
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-30">
    <div class="mx-auto flex h-16 max-w-[1440px] items-center px-6 lg:px-[120px]">
      <img :src="navLogo" alt="赞华集团" class="h-8 w-auto object-contain lg:h-9" />

      <!-- desktop nav -->
      <nav class="ml-auto hidden items-center gap-7 lg:flex lg:gap-9">
        <a
          v-for="(item, i) in links"
          :key="item"
          href="#"
          class="whitespace-nowrap text-sm text-white/90 transition-colors hover:text-white"
          :class="{ 'font-medium text-white': i === 1 }"
          >{{ item }}</a
        >
        <span class="h-4 w-px bg-white/30"></span>
        <button
          type="button"
          aria-label="搜索"
          class="grid size-6 place-items-center opacity-90 transition-opacity hover:opacity-100"
        >
          <img :src="searchIcon" alt="" class="size-4" />
        </button>
      </nav>

      <!-- mobile hamburger -->
      <button
        type="button"
        class="ml-auto flex size-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        :aria-expanded="open"
        aria-label="菜单"
        @click="open = !open"
      >
        <span
          class="h-0.5 w-6 bg-white transition-transform"
          :class="open ? 'translate-y-[7px] rotate-45' : ''"
        ></span>
        <span
          class="h-0.5 w-6 bg-white transition-opacity"
          :class="open ? 'opacity-0' : ''"
        ></span>
        <span
          class="h-0.5 w-6 bg-white transition-transform"
          :class="open ? '-translate-y-[7px] -rotate-45' : ''"
        ></span>
      </button>
    </div>

    <!-- mobile menu panel -->
    <Transition name="menu-fade">
      <nav
        v-if="open"
        class="bg-[#0b1f6b]/95 backdrop-blur lg:hidden"
      >
        <ul class="mx-auto flex max-w-[1440px] flex-col px-6 py-2">
          <li v-for="item in links" :key="item">
            <a
              href="#"
              class="block border-b border-white/10 py-3 text-base text-white/90 transition-colors hover:text-white"
              @click="open = false"
              >{{ item }}</a
            >
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
