<!-- markdownlint-disable MD033 MD041 -->
<div align="center">

# react-element-in-viewport

**让 React 元素在滚动进入可视区域的瞬间，自动播放入场动画。**

[![npm version](https://img.shields.io/npm/v/react-element-in-viewport.svg?style=flat-square)](https://www.npmjs.com/package/react-element-in-viewport)
[![npm downloads](https://img.shields.io/npm/dm/react-element-in-viewport.svg?style=flat-square)](https://www.npmjs.com/package/react-element-in-viewport)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-element-in-viewport?style=flat-square)](https://bundlephobia.com/package/react-element-in-viewport)
[![types](https://img.shields.io/npm/types/react-element-in-viewport?style=flat-square)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/npm/l/react-element-in-viewport.svg?style=flat-square)](./LICENSE)

[English](./README.md) &nbsp;·&nbsp; **简体中文**

[**🎬 在线 Demo →**](https://yunstv.github.io/react-element-in-viewport/)

</div>

---

## ✨ 为什么用它

要做一个滚动触发的入场动画，通常你得自己写：`IntersectionObserver` 的注册和解绑、动画 class 的切换、`animationend` 的清理、再加一整套 CSS 关键帧。`react-element-in-viewport` 把这些全部塞进一个组件里：

```jsx
<ElementInViewport animation="fadeInUp">
  <Card />
</ElementInViewport>
```

就这么多。卡片在滚入视口前保持隐藏，进入后播一次指定动画，然后自动停止监听。

## 🎯 特性

- 🎨 **90+ 内置动画** —— bounce · fade · slide · zoom · rotate · flip · lightspeed · jello · jackInTheBox · hinge 等
- 🪄 **开箱即用** —— 包一层就能给任意元素加入场动画
- 🧠 **聪明的观察器** —— 动画播放一次就解绑，不会反复触发
- 🧩 **支持 render-prop** —— `children` 可以是 `(isIntersecting) => ReactNode`，方便你按可见状态切换内容
- ⚙️ **可配置** —— 透传任意 `IntersectionObserver` 选项（root、rootMargin、threshold），也可以传 CSS 变量（`--animate-duration` 等）
- 📦 **零运行时依赖** —— 基于浏览器原生 `IntersectionObserver` + CSS 关键帧
- 🟦 **TypeScript 优先** —— 内置完整类型声明，同时提供 ESM / CJS / UMD 三种产物
- ⚛️ **兼容 Next.js / RSC** —— 源文件已加 `'use client'`，App Router 直接可用

## 🚀 安装

```bash
npm install --save react-element-in-viewport
# 或
yarn add react-element-in-viewport
# 或
pnpm add react-element-in-viewport
```

## 🍱 快速上手

```jsx
import React from 'react';
import { ElementInViewport } from 'react-element-in-viewport';
import 'react-element-in-viewport/dist/ReactElementInViewport.css';
// 或者使用压缩版样式：
// import 'react-element-in-viewport/dist/ReactElementInViewport.min.css';

export default function App() {
  return (
    <main>
      <ElementInViewport animation="bounce">
        <h1>滚动到这里我会跳一下</h1>
      </ElementInViewport>

      <ElementInViewport animation="fadeInLeftBig">
        <article>这段文字会从左侧大幅淡入。</article>
      </ElementInViewport>

      <ElementInViewport animation="zoomIn">
        <img src="/hero.jpg" alt="hero" />
      </ElementInViewport>
    </main>
  );
}
```

## 📚 API

### `<ElementInViewport />`

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `animation` | `string` | `'fadeInDown'` | 动画名，参见下方[动画清单](#-动画清单) |
| `children` | `ReactNode \| (isIntersecting: boolean) => ReactNode` | — | 要做动画的子元素，传函数即可在内部读取「是否在视口」状态 |
| `className` | `string` | — | 包装层的额外 class |
| `observeOptions` | `object` | 见下文 | `IntersectionObserver` 选项 **加** 入场时写入的 CSS 自定义属性 |
| `isWrap` | `boolean` | `true` | 预留字段，目前组件始终渲染一层 `<div>` 作为包装 |

其他 `HTMLAttributes<HTMLDivElement>`（如 `id`、`style`、`data-*`）会原样透传到包装层。

### `observeOptions`

这个对象同时承载「`IntersectionObserver` 配置」和「入场时要写入元素的 CSS 自定义属性」。

```jsx
<ElementInViewport
  animation="slideInUp"
  observeOptions={{
    // IntersectionObserver 选项
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.25,

    // 进入视口时应用到元素上的 CSS 变量 / 内联样式
    '--animate-duration': '1.2s',
    '--animate-delay': '120ms'
  }}
>
  …
</ElementInViewport>
```

库内部使用的默认值：

| 字段 | 默认 | 备注 |
| --- | --- | --- |
| `root` | `null` | 视口本身 |
| `rootMargin` | `'0px'` | |
| `threshold` | `0.5` | 元素一半进入视口时触发 |
| `opacity` | `'1'` | 触发前 `opacity:0`，触发时移除该约束 |
| `--animate-duration` | `'2s'` | 比 animate.css 默认 1s 略长，节奏更舒缓 |

### Render-prop 用法

```jsx
<ElementInViewport animation="fadeIn">
  {(isIntersecting) => (
    <Skeleton hidden={isIntersecting}>
      <RealContent />
    </Skeleton>
  )}
</ElementInViewport>
```

## 🎨 动画清单

完整支持 [animate.css](https://animate.style/) 的动画家族，分为 16 类。`animation` prop 直接传名字即可。

| 分类 | 动画名 |
| --- | --- |
| **注意力 (Attention seekers)** | `bounce` `flash` `pulse` `rubberBand` `shakeX` `shakeY` `headShake` `swing` `tada` `wobble` `jello` `heartBeat` |
| **后退入场 / 退场** | `backInDown` `backInLeft` `backInRight` `backInUp` · `backOutDown` `backOutLeft` `backOutRight` `backOutUp` |
| **弹跳入场 / 退场** | `bounceIn(Down/Left/Right/Up)` · `bounceOut(Down/Left/Right/Up)` |
| **淡入 / 淡出** | `fadeIn(Down/DownBig/Left/LeftBig/Right/RightBig/Up/UpBig/TopLeft/TopRight/BottomLeft/BottomRight)` 与对应的 `fadeOut*` |
| **翻转 (Flippers)** | `flipInX` `flipInY` `flipOutX` `flipOutY` |
| **光速 (Lightspeed)** | `lightSpeedInRight` `lightSpeedInLeft` `lightSpeedOutRight` `lightSpeedOutLeft` |
| **旋转入场 / 退场** | `rotateIn(DownLeft/DownRight/UpLeft/UpRight)` · `rotateOut*` |
| **特殊 (Specials)** | `hinge` `jackInTheBox` `rollIn` `rollOut` |
| **缩放入场 / 退场** | `zoomIn(Down/Left/Right/Up)` · `zoomOut*` |
| **滑动入场 / 退场** | `slideIn(Down/Left/Right/Up)` · `slideOut*` |

每个动画都可在 **[在线 Demo](https://yunstv.github.io/react-element-in-viewport/)** 中预览，点开任一卡片即可看到运动轨迹说明、CSS 关键帧源码和可直接复制的 React 用法。

## 🧠 工作原理

```text
                    IntersectionObserver
  ┌────────────┐    ┌────────────────┐    ┌──────────────┐
  │ <div ref>  │ →  │ threshold 0.5  │ →  │ 加 class     │
  │ children   │    │ 进入可视区     │    │ + CSS 变量   │
  └────────────┘    └────────────────┘    └──────────────┘
                                                  │
                                                  ▼
                                       监听一次 animationend
                                                  │
                                                  ▼
                                         解绑观察器，结束
```

1. 组件挂载时给包装 `div` 创建一个 `IntersectionObserver`。
2. 阈值触发后，库会在元素上加上 `Element-in-viewport__animated` 与所选动画 class，并把 `observeOptions` 中的 CSS 变量写入元素 style。
3. 监听一次 `animationend`，结束后**自动 unobserve**，后续滚动不会重复触发。

## 💡 使用场景

- **首屏 / 落地页入场** —— 顺序淡入，引导用户视线落到 CTA
- **长内容滚动叙事** —— 每个段落各自一个入场节奏，无需逐段写 CSS
- **产品 / 特性卡片网格** —— bounce、slide、zoom 让卡片在用户浏览时陆续登场
- **客户证言 / 时间线** —— 通过 `--animate-delay` 制造错位入场效果
- **营销 CTA 强调** —— 用 `pulse` / `tada` 在不打扰加载的前提下吸引点击
- **图片画廊 / 加载状态** —— 配合 render-prop 切换骨架屏和真实内容
- **资讯 / 内容站** —— 不引入完整动画框架就能拥有滚动编排

## 🧱 技术栈

### 库本身

- React `>=16`（peer 依赖） · TypeScript
- 浏览器原生 `IntersectionObserver`（无 polyfill，无 scroll 监听）
- SCSS 关键帧，统一加 `Element-in-viewport__` 前缀防冲突
- 用 **microbundle** 输出 ESM、CJS、UMD 三套产物
- 测试基于 **Jest** + `@testing-library/react`

### Demo 站

也就是在线预览的画廊。

- React 19 · Parcel 2 · TailwindCSS 4 · TypeScript
- 自研交互式 `Backdrop`，跟随鼠标的径向遮罩光晕
- 通过 GitHub Actions 自动部署到 `gh-pages` 分支

## 🌐 浏览器支持

只要支持 `IntersectionObserver` 都能跑——也就是所有现代浏览器。如果非要兼容 IE11 或非常老的 Safari，请在挂载 React 之前自行 polyfill。

## 🛠 开发

```bash
# 安装依赖
yarn

# 构建库（microbundle + sass + style2js）
yarn build

# 启动 demo（Parcel）
yarn start

# 跑测试
yarn test

# 代码风格
yarn lint
yarn prettier
```

项目结构：

```text
.
├── src/                # 库源码（TypeScript）
│   ├── components/     # <ElementInViewport />
│   ├── utils/          # IntersectionObserver + animateCSS 工具
│   └── types/          # 共享 TS 类型
├── scss/               # SCSS 关键帧 + 入口样式
├── dist/               # 构建产物（仅在发布时提交）
└── example/            # 画廊 Demo（Parcel + Tailwind）
    ├── components/     # AnimationGrid · GalleryTile · Backdrop · …
    ├── data/           # animations.ts · trajectories.ts
    └── styles/
```

## 🤝 贡献

欢迎 issue 和 PR。

1. Fork → 从 `dev` 拉新分支
2. `yarn` 安装，跑通测试和 lint
3. 提 PR 到 `dev`，描述清楚改动意图

如果新增了动画，请同步在 `scss/`、`example/data/animations.ts`、`example/data/trajectories.ts` 三个地方都加上，这样它会自动出现在 demo 画廊里。

## 📄 许可证

[ISC](./LICENSE) © [yunstv](https://yunstv.github.io)
