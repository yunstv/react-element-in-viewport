<script setup>
import SectionTitle from './SectionTitle.vue';

defineProps({
  active: { type: Number, default: 0 }
});

const advBg = new URL('../../assets/ui/adv-bg.png', import.meta.url).href;
const shieldLg = new URL('../../assets/ui/adv-shield-lg.png', import.meta.url).href;
const baseline = new URL('../../assets/ui/adv-baseline.png', import.meta.url).href;
const imgExp = new URL('../../assets/ui/adv-card-experience.png', import.meta.url).href;
const imgCore = new URL('../../assets/ui/adv-card-core.png', import.meta.url).href;
const imgAfter = new URL('../../assets/ui/adv-card-aftersales.png', import.meta.url).href;

// Fixed order. The card whose index matches the active service tab expands
// into the wide light card (title + description); the rest are narrow
// gradient cards with a "了解详情" button.
const cards = [
  {
    title: '专属服务保障',
    desc: '配备专项服务团队，提供全程高效、无缝沟通，确保合作顺畅无忧。',
    gradient: 'linear-gradient(180deg, rgba(57,28,246,0.85), rgba(53,83,255,0.85))',
    wideImg: shieldLg,
    narrowImg: baseline
  },
  {
    title: '客户体验至上',
    desc: '始终以客户需求为中心，量身定制解决方案，提升合作满意度。',
    gradient: 'linear-gradient(0deg, #0098fd, #1177fc)',
    wideImg: imgExp,
    narrowImg: imgExp
  },
  {
    title: '核心竞争优势',
    desc: '成本结构透明，履约时效可靠，专业清关支持，助理贸易高效落地。',
    gradient: 'linear-gradient(180deg, rgba(28,88,246,0.9), rgba(22,89,252,0.9))',
    wideImg: imgCore,
    narrowImg: imgCore
  },
  {
    title: '全周期售后体系',
    desc: '建立持续跟踪机制，快速响应通道，定期回访制度，确保问题第一时间闭关解决。',
    gradient: 'linear-gradient(2deg, #2ac0ed, #0990ff)',
    wideImg: imgAfter,
    narrowImg: imgAfter
  }
];
</script>

<template>
  <section class="bg-white py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-8 lg:px-[120px]">
      <SectionTitle
        title="服务优势"
        subtitle="Service Advantages"
        note="全链路可视化、节点可控、交付可靠 让跨境果品贸易更简单、更高效"
      />

      <div
        class="mt-12 flex flex-col gap-5 lg:flex-row lg:items-stretch"
        v-reveal
      >
        <div
          v-for="(c, i) in cards"
          :key="c.title"
          class="relative h-[380px] overflow-hidden rounded-[20px] transition-all duration-500 ease-out lg:basis-0"
          :class="active === i ? 'lg:grow-[2.09]' : 'lg:grow'"
        >
          <!-- WIDE (active): light card with description -->
          <template v-if="active === i">
            <div
              class="absolute inset-0 bg-cover bg-center"
              :style="{ backgroundImage: `url(${advBg})` }"
            ></div>
            <img
              :src="c.wideImg"
              alt=""
              class="pointer-events-none absolute -right-4 top-12 h-72 w-72 object-contain opacity-80 mix-blend-darken"
            />
            <div class="relative flex h-full flex-col gap-6 p-9">
              <h3 class="text-2xl font-medium text-ink-soft lg:text-[28px]">
                {{ c.title }}
              </h3>
              <p class="max-w-[230px] text-base leading-[40px] text-[#444]">
                {{ c.desc }}
              </p>
            </div>
          </template>

          <!-- NARROW: gradient card with button -->
          <template v-else>
            <div class="absolute inset-0" :style="{ backgroundImage: c.gradient }"></div>
            <img
              :src="c.narrowImg"
              alt=""
              class="pointer-events-none absolute -bottom-4 left-1/2 size-52 -translate-x-1/2 object-contain opacity-70 mix-blend-multiply"
            />
            <div class="relative flex h-full flex-col items-center gap-6 px-6 pt-[75px]">
              <h3 class="text-center text-2xl font-medium text-white lg:text-[28px]">
                {{ c.title }}
              </h3>
              <button
                type="button"
                class="rounded-md border border-white/60 px-4 py-2 text-base text-white transition-colors hover:bg-white/10"
              >
                了解详情
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
