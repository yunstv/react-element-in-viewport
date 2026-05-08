# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-05-08

A correctness, type-safety and DX overhaul. The runtime is still a single
`<ElementInViewport>` component built on `IntersectionObserver`, but the
plumbing has been straightened out, the public types are now first-class,
and a brand-new demo site ships alongside the library.

### ⚠ Breaking changes

- **`observeOptions` IO fields now actually take effect.** In `1.x`,
  `root` / `rootMargin` / `threshold` were silently swallowed and written
  to the element as inline styles instead of the `IntersectionObserver`.
  In `2.0.0` they are forwarded correctly. If you were passing those
  fields and depending on the broken behavior, your trigger threshold
  may differ — verify after upgrading.
- **`observeOptions` is captured on first mount.** Runtime changes to
  the object are no longer reflected in the active observer (changing
  the `animation` prop still tears it down and rebuilds with the latest
  options). This matches what most consumers already expected and avoids
  observer thrash on every render.
- **Internal types are no longer exported** — `Theme`,
  `ElementObserver`, `ElementObserverCallback`, `ElementObserverStart`,
  `ElementObserverEnd` were never part of the documented API. If you
  imported them, switch to the new public types listed below.

### Added

- **Public type exports** from the package entry:
  `ElementInViewportProps`, `ObserveOptions`, `RenderChildren`.
- **`ObserveOptions` is now `IntersectionObserverInit & { [k]: unknown }`**,
  so editors autocomplete `root`, `rootMargin`, `threshold` while still
  letting you mix in animate.css custom properties such as
  `--animate-duration`, `--animate-delay`, `--animate-repeat`.
- **JSDoc on the entire public surface** — hover docs in your editor for
  `<ElementInViewport>` props and option fields.
- **Live demo site** at <https://yunstv.github.io/react-element-in-viewport/>
  — a 90+-card animation gallery with cursor-tracking backdrop, motion
  trajectory captions, CSS keyframe inspector, and copy-ready React
  snippets. Built with React 19, Parcel 2, and Tailwind CSS 4; deployed
  automatically via GitHub Actions.
- **Bilingual README** (English / 简体中文) with API table, animation
  catalogue, use-case guide and tech stack.

### Fixed

- `<ElementInViewport observeOptions={{ threshold: 0.25 }} />` now uses
  `0.25` instead of falling back to the default `0.5`.
- The observer no longer rebuilds on every render when `observeOptions`
  is passed as an inline object literal — it's captured in a ref and
  re-created only when `animation` changes.
- Suppressed React warnings about state updates after unmount when a
  consumer navigates away mid-animation.
- Internal IO keys (`root`, `rootMargin`, `threshold`) are no longer
  written onto the element as bogus inline styles.

### Changed

- `useRef<HTMLDivElement>` is now properly typed (was `useRef(null)`).
- `observer.end()` is idempotent and safe to call multiple times.
- `animateCSS` now returns `Promise<void>` (was `Promise<unknown>`).
- Internal observer cleanup uses `disconnect()` instead of
  `unobserve()` for clarity.

### Removed

- Unused `Theme` and internal observer types from the published `.d.ts`
  surface (see breaking changes above).

### Migration

For the vast majority of users, **no code changes are required** —
`<ElementInViewport animation="fadeInUp">…</ElementInViewport>` keeps
working unchanged.

If you were passing IO fields through `observeOptions`:

```diff
  <ElementInViewport
    animation="slideInUp"
    observeOptions={{
-     threshold: 0.25,             // silently ignored in 1.x
+     threshold: 0.25,             // applied correctly in 2.x
      '--animate-duration': '1.2s'
    }}
  >
    …
  </ElementInViewport>
```

If you were importing internal types:

```diff
- import type { Theme, ElementObserver } from 'react-element-in-viewport';
+ import type { ElementInViewportProps, ObserveOptions } from 'react-element-in-viewport';
```

---

## [1.1.0] and earlier

Historical versions did not maintain a changelog. See
[git history](https://github.com/yunstv/react-element-in-viewport/commits/main)
for individual commits.
