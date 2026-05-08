'use client';
import * as React from 'react';
import type { FC } from 'react';
import { animateCSS, elementObserver } from '../utils';
import type { ElementInViewportProps } from '../types';

/**
 * `<ElementInViewport>` plays an animation on its child the first time the
 * wrapper scrolls into the viewport, then automatically detaches its
 * `IntersectionObserver` so the animation never replays.
 *
 * @example
 * ```tsx
 * <ElementInViewport animation="fadeInUp">
 *   <Card />
 * </ElementInViewport>
 * ```
 */
export const ElementInViewport: FC<ElementInViewportProps> = ({
  animation = 'fadeInDown',
  className,
  children,
  observeOptions = {},
  // Reserved — currently the component always renders a wrapper <div>.
  isWrap: _isWrap = true,
  ...domProps
}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const viewRef = React.useRef<HTMLDivElement>(null);

  // `observeOptions` is typically passed as an inline object literal, which
  // would change reference every render and re-create the observer. We
  // capture the latest value in a ref so the effect can stay keyed only on
  // `animation`.
  const optionsRef = React.useRef(observeOptions);
  optionsRef.current = observeOptions;

  React.useEffect(() => {
    const node = viewRef.current;
    if (!node) return;

    let mounted = true;
    const observer = elementObserver(
      node,
      (element, unobserve) => {
        if (!mounted) return;
        setIsIntersecting(true);
        animateCSS(element, animation).then(() => {
          if (mounted) unobserve();
        });
      },
      optionsRef.current
    );
    observer.start();

    return () => {
      mounted = false;
      observer.end();
    };
  }, [animation]);

  return (
    <div ref={viewRef} className={className} {...domProps}>
      {typeof children === 'function' ? children(isIntersecting) : children}
    </div>
  );
};
