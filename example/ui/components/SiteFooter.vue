<script setup>
const footerLogo = new URL('../../assets/ui/footer-logo.png', import.meta.url).href;
const footerCity = new URL('../../assets/ui/footer-city.jpg', import.meta.url).href;
const socialCircle = new URL('../../assets/ui/social-circle.svg', import.meta.url).href;
const socialWechat = new URL('../../assets/ui/social-wechat.svg', import.meta.url).href;
const socialDouyin = new URL('../../assets/ui/social-douyin.svg', import.meta.url).href;
const socialWeibo = new URL('../../assets/ui/social-weibo.svg', import.meta.url).href;

const socials = [
  { icon: socialWechat, label: '微信' },
  { icon: socialDouyin, label: '抖音' },
  { icon: socialWeibo, label: '微博' }
];

const columns = [
  {
    title: '服务产品',
    items: [
      '人力资源服务',
      '数字人才服务',
      '教育培训服务',
      '电子商务服务',
      '物流配送服务',
      '精工科技服务',
      '环保科技服务',
      '企业发展服务'
    ]
  },
  { title: '解决方案', items: ['行业案例', '技术赋能'] },
  {
    title: '市场洞察',
    items: ['官方新政', '行业热点', '干货解读', '行业报告', '行业白皮书']
  },
  { title: '社会责任', items: ['企业责任', '社会责任'] },
  { title: '新闻中心', items: ['赞华动态', '市场动态'] },
  { title: '关于赞华', items: ['赞华介绍', '战略发展', '加入我们', '商务合作'] }
];
</script>

<template>
  <footer class="relative overflow-hidden bg-[#000a2c]">
    <img
      :src="footerCity"
      alt=""
      class="pointer-events-none absolute inset-0 size-full object-cover opacity-25"
    />
    <div class="absolute inset-0 bg-[#000a2c]/80"></div>

    <div class="relative mx-auto max-w-[1440px] px-8 py-14 lg:px-[120px]">
      <div class="flex flex-col gap-12 lg:flex-row lg:gap-[114px]">
        <!-- brand block -->
        <div class="flex flex-col items-start gap-3">
          <img :src="footerLogo" alt="赞华集团" class="h-12 w-auto object-contain opacity-90" />
          <p class="text-xs leading-6 text-white">咨询热线：400-699-6620</p>
          <div class="mt-1 flex gap-3.5">
            <span
              v-for="s in socials"
              :key="s.label"
              class="relative grid size-10 place-items-center"
              :title="s.label"
            >
              <img :src="socialCircle" alt="" class="absolute inset-0 size-full" />
              <img :src="s.icon" :alt="s.label" class="relative size-5" />
            </span>
          </div>
        </div>

        <div class="hidden w-px self-stretch bg-[#b6bee8]/30 lg:block"></div>

        <!-- link columns -->
        <div class="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-[86px]">
          <div v-for="col in columns" :key="col.title" class="flex shrink-0 flex-col gap-6">
            <p class="whitespace-nowrap text-base font-medium text-white">{{ col.title }}</p>
            <ul class="flex flex-col gap-2">
              <li v-for="item in col.items" :key="item">
                <a
                  href="#"
                  class="whitespace-nowrap text-xs leading-6 text-white/70 transition-colors hover:text-white"
                  >{{ item }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 border-t border-white/20 pt-5">
        <p class="text-sm leading-6 text-white/50">
          版权所有@ 赞华集团 沪ICP备13007528号-2
        </p>
      </div>
    </div>
  </footer>
</template>
