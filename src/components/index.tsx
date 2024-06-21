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
  React.useEffect(() => {
    if (!viewRef.current) return;
    const observeCallback = (element: HTMLElement, unobserve: any) => {
      animateCSS(element, animation).then(() => {
        unobserve && unobserve();
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
  return (
    <div ref={viewRef} className={className} {...props}>
      {children}
    </div>
  );
};
