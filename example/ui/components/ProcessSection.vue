<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import SectionTitle from './SectionTitle.vue';
const flowBg = new URL('../../assets/ui/flow-bg.jpg', import.meta.url).href;
const flowPath = new URL('../../assets/ui/flow-path.svg', import.meta.url).href;
const stepOrder = new URL('../../assets/ui/step-order.png', import.meta.url).href;
const stepClear = new URL('../../assets/ui/step-clear.png', import.meta.url).href;
const stepInspect = new URL('../../assets/ui/step-inspect.png', import.meta.url).href;
const stepRelease = new URL('../../assets/ui/step-release.png', import.meta.url).href;
const stepWarehouse = new URL('../../assets/ui/step-warehouse.png', import.meta.url).href;
const stepDeliver = new URL('../../assets/ui/step-deliver.png', import.meta.url).href;

// Steps in flow order. Coordinates map the Figma canvas (origin x=120, y=2300)
// into a fixed 1200×500 illustration stage used on desktop.
const steps = [
  { label: '订单确认', icon: stepOrder, accent: true, icon_l: 232, icon_t: 79, lbl_l: 232, lbl_t: 17 },
  { label: '专业清关', icon: stepClear, accent: false, icon_l: 577, icon_t: 79, lbl_l: 577, lbl_t: 17 },
  { label: '高效查验', icon: stepInspect, accent: false, icon_l: 932, icon_t: 74, lbl_l: 1069, lbl_t: 112 },
  { label: '快速放行', icon: stepRelease, accent: false, icon_l: 871, icon_t: 288, lbl_l: 871, lbl_t: 426 },
  { label: '云仓中转', icon: stepWarehouse, accent: true, icon_l: 524, icon_t: 287, lbl_l: 524, lbl_t: 425 },
  { label: '准时交付', icon: stepDeliver, accent: false, icon_l: 196, icon_t: 287, lbl_l: 193, lbl_t: 425 }
];

// Scale the 1200px illustration down to fit its container so it never
// triggers horizontal scroll on narrower desktops.
const frame = ref(null);
const scale = ref(1);
const stageHeight = computed(() => 500 * scale.value + 'px');
let ro;

function update() {
  const w = frame.value?.clientWidth || 0;
  if (w > 0) scale.value = Math.min(1, w / 1200);
}

onMounted(() => {
  ro = new ResizeObserver(update);
  if (frame.value) ro.observe(frame.value);
  update();
});
onBeforeUnmount(() => ro?.disconnect());
</script>

<template>
  <section class="relative overflow-hidden bg-white py-20 lg:py-24">
    <img
      :src="flowBg"
      alt=""
      class="pointer-events-none absolute inset-0 size-full object-cover opacity-60"
    />
    <div class="relative mx-auto max-w-[1440px] px-6 lg:px-[120px]">
      <SectionTitle title="服务流程" subtitle="Service Process" />

      <!-- desktop: scaled illustration -->
      <div
        ref="frame"
        class="relative mt-10 hidden overflow-hidden lg:flex lg:justify-center"
        :style="{ height: stageHeight }"
        v-reveal
      >
        <div
          class="relative h-[500px] w-[1200px] shrink-0 origin-top"
          :style="{ transform: `scale(${scale})` }"
        >
          <img
            :src="flowPath"
            alt=""
            class="pointer-events-none absolute"
            style="left: 81px; top: 111px; width: 1035px; height: 302px"
          />
          <template v-for="step in steps" :key="step.label">
            <img
              :src="step.icon"
              alt=""
              class="absolute size-[120px]"
              :style="{ left: step.icon_l + 'px', top: step.icon_t + 'px' }"
            />
            <div
              class="absolute flex h-11 items-center justify-center rounded-md border border-dashed bg-[#f5f7fe] px-5 text-xl tracking-[2px]"
              :class="step.accent ? 'border-brand text-brand' : 'border-brand-soft text-brand-soft'"
              :style="{ left: step.lbl_l + 'px', top: step.lbl_t + 'px' }"
            >
              {{ step.label }}
            </div>
          </template>
        </div>
      </div>

      <!-- mobile: vertical stepper -->
      <ol class="mx-auto mt-10 flex max-w-sm flex-col lg:hidden" v-reveal>
        <li
          v-for="(step, i) in steps"
          :key="step.label"
          class="flex items-stretch gap-4"
        >
          <div class="flex flex-col items-center">
            <img :src="step.icon" alt="" class="size-16 shrink-0" />
            <span
              v-if="i < steps.length - 1"
              class="my-1 w-px flex-1 border-l border-dashed border-brand-soft/50"
            ></span>
          </div>
          <div class="pt-4 pb-6">
            <div
              class="inline-flex h-11 items-center rounded-md border border-dashed bg-[#f5f7fe] px-5 text-lg tracking-[2px]"
              :class="step.accent ? 'border-brand text-brand' : 'border-brand-soft text-brand-soft'"
            >
              {{ step.label }}
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
