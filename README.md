<!-- markdownlint-disable MD033 MD041 -->
<div align="center">

# react-element-in-viewport

**Trigger entry animations on React elements the moment they scroll into view.**

[![npm version](https://img.shields.io/npm/v/react-element-in-viewport.svg?style=flat-square)](https://www.npmjs.com/package/react-element-in-viewport)
[![npm downloads](https://img.shields.io/npm/dm/react-element-in-viewport.svg?style=flat-square)](https://www.npmjs.com/package/react-element-in-viewport)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-element-in-viewport?style=flat-square)](https://bundlephobia.com/package/react-element-in-viewport)
[![types](https://img.shields.io/npm/types/react-element-in-viewport?style=flat-square)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/npm/l/react-element-in-viewport.svg?style=flat-square)](./LICENSE)

**English** &nbsp;·&nbsp; [简体中文](./README.zh-CN.md)

[**🎬 Live demo →**](https://yunstv.github.io/react-element-in-viewport/)

</div>

---

## ✨ Why this library?

Hand-rolling scroll-triggered animations means juggling `IntersectionObserver`, listener cleanup, animation classes, and a whole CSS catalogue. `react-element-in-viewport` collapses all of that into a single component:

```jsx
<ElementInViewport animation="fadeInUp">
  <Card />
</ElementInViewport>
```

That's it. The card stays invisible until it scrolls into the viewport, then plays the named animation exactly once and stops observing.

## 🎯 Features

- 🎨 **90+ built-in animations** — bounce · fade · slide · zoom · rotate · flip · lightspeed · jello · jackInTheBox · hinge and more
- 🪄 **Drop-in component** — wrap any element to make it entrance-aware
- 🧠 **Smart observer** — animation runs once, observer auto-detaches afterwards
- 🧩 **Render-prop friendly** — `children` can be `(isIntersecting) => ReactNode` for custom logic
- ⚙️ **Tunable** — pass any `IntersectionObserver` options (root, rootMargin, threshold) and any CSS variables (`--animate-duration`, etc.)
- 📦 **Tiny, zero runtime deps** — built on the native `IntersectionObserver` and CSS keyframes
- 🟦 **TypeScript first** — full typings shipped, plus ESM / CJS / UMD bundles
- ⚛️ **Next.js / RSC ready** — ships the `'use client'` directive for the App Router

## 🚀 Installation

```bash
npm install --save react-element-in-viewport
# or
yarn add react-element-in-viewport
# or
pnpm add react-element-in-viewport
```

## 🍱 Quick start

```jsx
import React from 'react';
import { ElementInViewport } from 'react-element-in-viewport';
import 'react-element-in-viewport/dist/ReactElementInViewport.css';
// or the minified build:
// import 'react-element-in-viewport/dist/ReactElementInViewport.min.css';

export default function App() {
  return (
    <main>
      <ElementInViewport animation="bounce">
        <h1>Hello on scroll</h1>
      </ElementInViewport>

      <ElementInViewport animation="fadeInLeftBig">
        <article>An article that flies in from the left.</article>
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `animation` | `string` | `'fadeInDown'` | Name of the animation, see the [animation catalogue](#-animation-catalogue) below |
| `children` | `ReactNode \| (isIntersecting: boolean) => ReactNode` | — | Element(s) to animate. As a render-prop, `isIntersecting` lets you branch on visibility |
| `className` | `string` | — | Extra class on the wrapper |
| `observeOptions` | `object` | see below | Both `IntersectionObserver` options **and** CSS custom properties applied on enter |
| `isWrap` | `boolean` | `true` | Reserved for future use; the component currently always renders a `<div>` wrapper |

Any other `HTMLAttributes<HTMLDivElement>` (e.g. `id`, `style`, `data-*`) are passed through to the wrapper.

### `observeOptions`

A merged bag of `IntersectionObserver` options and CSS custom properties.

```jsx
<ElementInViewport
  animation="slideInUp"
  observeOptions={{
    // IntersectionObserver
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.25,

    // CSS variables / inline style applied when intersecting
    '--animate-duration': '1.2s',
    '--animate-delay': '120ms'
  }}
>
  …
</ElementInViewport>
```

Defaults the library applies:

| Key | Default | Notes |
| --- | --- | --- |
| `root` | `null` | the viewport |
| `rootMargin` | `'0px'` | |
| `threshold` | `0.5` | element half-visible before triggering |
| `opacity` | `'1'` | initial `opacity:0` is removed on enter |
| `--animate-duration` | `'2s'` | longer than animate.css (1s) by design |

### Render-prop pattern

```jsx
<ElementInViewport animation="fadeIn">
  {(isIntersecting) => (
    <Skeleton hidden={isIntersecting}>
      <RealContent />
    </Skeleton>
  )}
</ElementInViewport>
```

## 🎨 Animation catalogue

Every animation from the [animate.css](https://animate.style/) family is supported, grouped into sixteen categories. Names are passed verbatim as the `animation` prop.

| Category | Animations |
| --- | --- |
| **Attention seekers** | `bounce` `flash` `pulse` `rubberBand` `shakeX` `shakeY` `headShake` `swing` `tada` `wobble` `jello` `heartBeat` |
| **Back entrances / exits** | `backInDown` `backInLeft` `backInRight` `backInUp` · `backOutDown` `backOutLeft` `backOutRight` `backOutUp` |
| **Bouncing entrances / exits** | `bounceIn(Down/Left/Right/Up)` · `bounceOut(Down/Left/Right/Up)` |
| **Fading entrances / exits** | `fadeIn(Down/DownBig/Left/LeftBig/Right/RightBig/Up/UpBig/TopLeft/TopRight/BottomLeft/BottomRight)` and matching `fadeOut*` |
| **Flippers** | `flipInX` `flipInY` `flipOutX` `flipOutY` |
| **Lightspeed** | `lightSpeedInRight` `lightSpeedInLeft` `lightSpeedOutRight` `lightSpeedOutLeft` |
| **Rotating entrances / exits** | `rotateIn(DownLeft/DownRight/UpLeft/UpRight)` · `rotateOut*` |
| **Specials** | `hinge` `jackInTheBox` `rollIn` `rollOut` |
| **Zooming entrances / exits** | `zoomIn(Down/Left/Right/Up)` · `zoomOut*` |
| **Sliding entrances / exits** | `slideIn(Down/Left/Right/Up)` · `slideOut*` |

Browse and preview every animation — including a CSS keyframe inspector and copy-ready React snippet — in the **[live demo](https://yunstv.github.io/react-element-in-viewport/)**.

## 🧠 How it works

```
                    IntersectionObserver
  ┌────────────┐    ┌────────────────┐    ┌──────────────┐
  │ <div ref>  │ →  │ threshold 0.5  │ →  │ apply class  │
  │ children   │    │ on entry       │    │ + variables  │
  └────────────┘    └────────────────┘    └──────────────┘
                                                  │
                                                  ▼
                                       wait for `animationend`
                                                  │
                                                  ▼
                                          unobserve, done
```

1. The component mounts a `div` and starts an `IntersectionObserver` on it.
2. When the threshold is crossed, the lib adds `Element-in-viewport__animated` plus the chosen animation class, and writes any CSS custom properties from `observeOptions` onto the element.
3. The component listens for `animationend` once, then **unobserves** so the animation does not re-trigger on subsequent scrolls.

## 💡 Use cases

- **Hero & landing reveals** — sequential fade-ins that orient the eye on first scroll
- **Long-form storytelling** — give each section its own entry beat without writing per-section CSS
- **Product / feature grids** — cards that bounce, slide or zoom into place as the user explores
- **Testimonial walls & timelines** — stagger entries with `--animate-delay` per item
- **Marketing CTAs** — `pulse` / `tada` to draw attention without auto-playing on load
- **Image galleries & loading states** — pair the render-prop API with a skeleton placeholder
- **Editorial / news sites** — lightweight scroll choreography without a full animation framework

## 🧱 Tech stack

### Library

- React `>=16` (peer dep) · TypeScript
- Native `IntersectionObserver` (no polyfills, no scroll listeners)
- SCSS keyframes, prefixed under `Element-in-viewport__` to avoid collisions
- Built with **microbundle** → ESM, CJS, UMD outputs
- Tested with **Jest** + `@testing-library/react`

### Demo site

The gallery you see at the demo URL.

- React 19 · Parcel 2 · TailwindCSS 4 · TypeScript
- Custom interactive `Backdrop` with a cursor-tracking radial mask
- Deployed via GitHub Actions to `gh-pages`

## 🌐 Browser support

Anywhere `IntersectionObserver` is supported — i.e. all evergreen browsers. For very old browsers (IE11, very old Safari) bring your own polyfill before mounting React.

## 🛠 Development

```bash
# install
yarn

# build the library (microbundle + sass + style2js)
yarn build

# start the demo (Parcel)
yarn start

# run tests
yarn test

# lint / format
yarn lint
yarn prettier
```

Project layout:

```text
.
├── src/                # library source (TS)
│   ├── components/     # <ElementInViewport />
│   ├── utils/          # IntersectionObserver + animateCSS helpers
│   └── types/          # shared TS types
├── scss/               # SCSS keyframes + entry styles
├── dist/               # build output (committed for releases only)
└── example/            # the gallery demo (Parcel + Tailwind)
    ├── components/     # AnimationGrid · GalleryTile · Backdrop · …
    ├── data/           # animations.ts · trajectories.ts
    └── styles/
```

## 🤝 Contributing

Issues and PRs are welcome.

1. Fork → branch off `dev`
2. `yarn` to install, run tests / linter
3. Open a PR against `dev` describing the change

If you ship a new animation, add it to `scss/`, `example/data/animations.ts`, and `example/data/trajectories.ts` so it shows up in the demo.

## 📄 License

[ISC](./LICENSE) © [yunstv](https://yunstv.github.io)
