import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Single options bag accepted by `<ElementInViewport observeOptions={...}>`.
 *
 * Two concerns are mixed for ergonomics:
 *   - `root` / `rootMargin` / `threshold` are forwarded to the underlying
 *     `IntersectionObserver` (any `IntersectionObserverInit` field works).
 *   - Every other key is written to the element's inline style when the
 *     element enters the viewport — typically animate.css custom
 *     properties such as `--animate-duration`, `--animate-delay` or
 *     `--animate-repeat`.
 *
 * The library sets `opacity: 1` and `--animate-duration: 2s` by default;
 * any of those can be overridden through this bag.
 */
export type ObserveOptions = IntersectionObserverInit & {
  [cssKey: string]: unknown;
};

/** Render-prop signature for `children`. */
export type RenderChildren = (isIntersecting: boolean) => ReactNode;

export interface ElementInViewportProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * animate.css-style animation name (without the namespace prefix).
   * @default 'fadeInDown'
   */
  animation?: string;

  /**
   * Children to animate. May be a render-prop that receives the current
   * intersection state for branching content.
   */
  children: ReactNode | RenderChildren;

  /** Extra class on the wrapper `<div>`. */
  className?: string;

  /**
   * Reserved. The component currently always renders a wrapper `<div>`;
   * this flag is kept for forward compatibility.
   * @default true
   */
  isWrap?: boolean;

  /** IntersectionObserver options + CSS overrides applied on enter. */
  observeOptions?: ObserveOptions;
}
