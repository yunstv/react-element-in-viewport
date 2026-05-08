import type { ObserveOptions } from '../types';

const DEFAULT_IO: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const DEFAULT_STYLE: Record<string, string> = {
  opacity: '1',
  '--animate-duration': '2s'
};

const ANIMATION_END = 'animationend';
const DEFAULT_PREFIX = 'Element-in-viewport__';

/** Handle returned by {@link elementObserver}. */
export interface ObserverHandle {
  /** Begin observing the element. */
  start: () => void;
  /** Stop observing and roll back library-applied styles. Idempotent. */
  end: () => void;
}

/**
 * Split a single user options bag into two buckets — the IntersectionObserver
 * init that goes to the constructor, and the inline-style overrides that get
 * written onto the element when it enters the viewport.
 */
const splitOptions = (option: ObserveOptions) => {
  const { root, rootMargin, threshold, ...cssOverrides } = option;

  const io: IntersectionObserverInit = { ...DEFAULT_IO };
  if (root !== undefined) io.root = root;
  if (rootMargin !== undefined) io.rootMargin = rootMargin;
  if (threshold !== undefined) io.threshold = threshold;

  const style: Record<string, string> = { ...DEFAULT_STYLE };
  const userKeys = new Set<string>();
  for (const key of Object.keys(cssOverrides)) {
    userKeys.add(key);
    style[key] = String(cssOverrides[key]);
  }

  return { io, style, userKeys };
};

/**
 * Wrap an `IntersectionObserver` around `element`. The first time the element
 * crosses the threshold, the library applies its CSS overrides and invokes
 * `onEnter` with the element plus an `unobserve` function — call it once
 * the consumer's work (typically a CSS animation) is done so the observer
 * detaches and the trigger does not repeat.
 */
export const elementObserver = (
  element: HTMLElement,
  onEnter: (element: HTMLElement, unobserve: () => void) => void,
  option: ObserveOptions = {}
): ObserverHandle => {
  const { io, style, userKeys } = splitOptions(option);

  const applyEnterStyles = () => {
    for (const key of Object.keys(style)) {
      element.style.setProperty(key, style[key]);
    }
  };

  const removeEnterStyles = () => {
    for (const key of Object.keys(style)) {
      // Keep the element visible after the animation finishes, and respect
      // anything the consumer explicitly passed in.
      if (key === 'opacity' || userKeys.has(key)) continue;
      element.style.removeProperty(key);
    }
  };

  let detached = false;
  const end = () => {
    if (detached) return;
    detached = true;
    removeEnterStyles();
    observer.disconnect();
  };

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      applyEnterStyles();
      onEnter(element, end);
    }
  }, io);

  return {
    start: () => observer.observe(element),
    end
  };
};

/**
 * Toggle animate.css-style classes on `element` and resolve when the
 * `animationend` event fires. Class names are namespaced under
 * `Element-in-viewport__` so they don't collide with a global animate.css.
 */
export const animateCSS = (
  element: HTMLElement,
  animation: string,
  prefix: string = DEFAULT_PREFIX
): Promise<void> =>
  new Promise(resolve => {
    const baseClass = `${prefix}animated`;
    const animationClass = `${prefix}${animation}`;

    element.classList.add(baseClass, animationClass);

    const handleAnimationEnd = (event: Event) => {
      event.stopPropagation();
      element.classList.remove(baseClass, animationClass);
      resolve();
    };

    element.addEventListener(ANIMATION_END, handleAnimationEnd, { once: true });
  });

