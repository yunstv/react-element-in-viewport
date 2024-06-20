'use client';
import * as React from 'react';
import type { FC } from 'react';
import { elementObserver, animateCSS } from '../utils';
import type { ElementInViewportProps } from '../types';

export const ElementInViewport: FC<ElementInViewportProps> = ({
  animation = 'fadeInDown',
  className,
  children,
  isWrap = true,
  observeOptions = {},
  ...props
}) => {
  const viewRef = React.useRef(null);
  const [animateEnd, setAnimateEnd] = React.useState<Boolean>(false);
  React.useEffect(() => {
    if (!viewRef.current) return;
    const observeCallback = (element: HTMLElement, unobserve: any) => {
      animateCSS(element, animation).then(() => {
        unobserve && unobserve();
        setAnimateEnd(true);
      });
    };
    const observe = elementObserver(
      viewRef.current,
      observeCallback,
      observeOptions
    );
    observe.start();
    return () => {
      observe.end();
    };
  }, [animation, observeOptions]);
  if (!isWrap && animateEnd) return children;
  return (
    <div ref={viewRef} className={className} {...props}>
      {children}
    </div>
  );
};
