<script setup>
defineProps({
  active: { type: Number, default: 0 }
});

const heroPort = new URL('../../assets/ui/hero-port.jpg', import.meta.url).href;

// Shown for any service tab other than the default (核心业务).
const intro = [
  '专注全球优质果品的双向流通，构建从产地到餐桌的高效供应链体系。我们稳定进口榴莲、山竹、泰国龙眼、菠萝蜜、车厘子等国际热门果品，同时推动融安金桔、武鸣沃柑、火龙果、百香果、芒果、黑皮甘蔗、容县沙田柚等中国特色水果走向海外市场。',
  '依托覆盖南宁海吉星、广州江南等全国九大一级农产品批发市场的渠道网络，以及东北、华北、华东、西北、西南、华南、山东、河南、华中九大区域配送中心，实现全国高效直达。线上布局拼多多、淘宝直播、抖音、小红书、京东、快手等主流平台，打造多渠道融合的营销矩阵。',
  '通过国际先进的WMS智能仓储系统，严格执行食品安全标准，并整合仓储、清关、跨境物流等环节，提供一站式跨境供应链服务，全面满足大型商超、企业集采及B端客户的高品质、高效率需求。'
];
const tagline = '赞华集团国际贸易事业部——链接全球果品，赋能品质贸易！';
</script>

<template>
  <section class="relative h-[680px] w-full overflow-hidden lg:h-[758px]">
    <!-- port photo -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${heroPort})` }"
    ></div>
    <!-- brand gradient overlay -->
    <div
      class="absolute inset-0"
      style="
        background-image: linear-gradient(
          90deg,
          rgba(17, 73, 220, 0.9) 20%,
          rgba(28, 88, 246, 0.09) 100%
        );
      "
    ></div>

    <div class="relative mx-auto h-full max-w-[1440px] px-8 lg:px-[118px]">
      <Transition name="hero-fade" mode="out-in">
        <!-- default tab: headline + CTA -->
        <div
          v-if="active === 0"
          key="headline"
          class="flex h-full max-w-[552px] flex-col justify-center gap-12 lg:gap-[72px]"
        >
          <div class="text-white">
            <h1 class="text-5xl font-semibold leading-tight lg:text-[64px]">
              国际贸易服务
            </h1>
            <p class="mt-7 text-xl leading-relaxed lg:text-[28px]">
              专业、高效、可信赖，全球果品贸易全程护航
            </p>
          </div>
          <div>
            <a
              href="#products"
              class="inline-flex h-12 items-center justify-center rounded-md bg-white px-16 text-lg font-semibold text-brand shadow-sm transition-transform hover:-translate-y-0.5"
            >
              了解更多
            </a>
          </div>
        </div>

        <!-- service tab: descriptive intro -->
        <div
          v-else
          key="intro"
          class="flex h-full max-w-[946px] flex-col justify-center gap-6 text-white"
        >
          <p
            v-for="(para, i) in intro"
            :key="i"
            class="text-base leading-8 text-white/95 lg:text-[17px]"
          >
            <span class="mr-1 align-top text-white/70">“</span>{{ para }}
          </p>
          <p class="mt-2 text-xl font-medium lg:text-2xl">{{ tagline }}</p>
        </div>
      </Transition>
    </div>
  </section>
</template>
