<script setup>
import { computed } from 'vue';
import SectionTitle from './SectionTitle.vue';
const coreDeco = new URL('../../assets/ui/core-deco.png', import.meta.url).href;
const tabIcon1 = new URL('../../assets/ui/tab-icon-1.svg', import.meta.url).href;
const tabIcon2 = new URL('../../assets/ui/tab-icon-2.svg', import.meta.url).href;
const tabIcon3 = new URL('../../assets/ui/tab-icon-3.svg', import.meta.url).href;
const productFruit = new URL('../../assets/ui/product-fruit.jpg', import.meta.url).href;
const productMarket = new URL('../../assets/ui/product-market.jpg', import.meta.url).href;
const productOnline = new URL('../../assets/ui/product-online.jpg', import.meta.url).href;
const productWarehouse = new URL('../../assets/ui/product-warehouse.jpg', import.meta.url).href;

const props = defineProps({
  active: { type: Number, default: 0 }
});
const emit = defineEmits(['update:active']);

// Each tab swaps the middle card: title / English caption / paragraphs / image.
const tabs = [
  {
    label: '核心业务',
    icon: null,
    title: '核心业务',
    en: 'Core Business',
    image: productFruit,
    paras: [
      '进口精选：榴莲、山竹、泰国龙眼、菠萝蜜、车厘子等优质果品稳定供应。',
      '国产出口：融安金桔、武鸣沃柑、火龙果、百香果、芒果、黑皮甘蔗、容县沙田柚等特色水果高效出海。'
    ]
  },
  {
    label: '市场覆盖与配送',
    icon: tabIcon1,
    title: '市场覆盖与配送',
    en: 'Coverage & Delivery',
    image: productMarket,
    paras: [
      '全国一级市场：覆盖南宁海吉星、广州江南等九大核心农产品批发市场。',
      '区域配送网络：布局九大配送中心（东北、华北、华东、西北、西南、华南、山东、河南、华中），实现全国快速直达。'
    ]
  },
  {
    label: '全渠道线上运营',
    icon: tabIcon2,
    title: '全渠道线上营销',
    en: 'Digital Omnichannel Marketing',
    image: productOnline,
    paras: [
      '构建拼多多、淘宝直播、抖音、小红书、京东、快手等多平台店铺矩阵。'
    ]
  },
  {
    label: '智慧仓储与跨境供应链',
    icon: tabIcon3,
    title: '智慧仓储与跨境供应链',
    en: 'Smart WMS & Cross-Border SC',
    image: productWarehouse,
    paras: [
      '应用国际先进WMS系统，确保食品安全和高效管理；提供一站式跨境供应链服务，涵盖仓储、清关、物流，满足大型商超及B端客户需求。'
    ]
  }
];

const card = computed(() => tabs[props.active]);
</script>

<template>
  <section id="products" class="bg-white py-20 lg:py-24">
    <div class="mx-auto max-w-[1440px] px-8 lg:px-[120px]">
      <SectionTitle title="服务产品" subtitle="Service product" />

      <!-- category tabs -->
      <div
        class="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-12 lg:flex lg:flex-wrap lg:justify-center lg:gap-8"
        v-reveal
      >
        <button
          v-for="(tab, i) in tabs"
          :key="tab.label"
          type="button"
          @click="emit('update:active', i)"
          class="flex h-[60px] items-center justify-center gap-1.5 rounded-md border px-6 text-lg transition-all lg:min-w-[275px] lg:flex-none"
          :class="
            active === i
              ? 'border-transparent bg-brand font-medium text-white shadow-[0_8px_10px_rgba(63,92,207,0.1)]'
              : 'border-[#e4e4e4] bg-white text-ink-soft hover:border-brand/40'
          "
        >
          <img v-if="tab.icon" :src="tab.icon" alt="" class="size-6 shrink-0" />
          <span class="whitespace-nowrap">{{ tab.label }}</span>
        </button>
      </div>

      <!-- content card -->
      <div
        class="mt-10 flex flex-col overflow-hidden rounded-[20px] shadow-[0_20px_60px_rgba(28,88,246,0.08)] lg:flex-row"
        v-reveal
      >
        <div
          class="relative flex-1 overflow-hidden px-8 py-12 lg:px-20 lg:py-[100px]"
          style="
            background-image: linear-gradient(
              -90deg,
              #ffffff 69%,
              #eff3ff 96%
            );
          "
        >
          <span
            class="pointer-events-none absolute left-6 top-10 select-none font-serif text-[120px] leading-none text-[#4478c3] opacity-10"
            >“</span
          >
          <img
            :src="coreDeco"
            alt=""
            class="pointer-events-none absolute bottom-4 left-2 size-44 object-contain opacity-40"
          />
          <Transition name="card-fade" mode="out-in">
            <div :key="active" class="relative flex max-w-[470px] flex-col gap-3">
              <h3 class="text-2xl font-semibold tracking-wide text-ink lg:text-[28px]">
                {{ card.title }}
              </h3>
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-[#4478c3]/60">
                {{ card.en }}
              </p>
              <div class="mt-4 flex flex-col gap-5 text-base leading-7 tracking-wide text-[#444]">
                <p v-for="(para, i) in card.paras" :key="i">{{ para }}</p>
              </div>
            </div>
          </Transition>
        </div>
        <div class="relative h-60 overflow-hidden lg:h-auto lg:w-[600px]">
          <Transition name="card-fade" mode="out-in">
            <div
              :key="active"
              class="absolute inset-0 bg-cover bg-center"
              :style="{ backgroundImage: `url(${card.image})` }"
            ></div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
