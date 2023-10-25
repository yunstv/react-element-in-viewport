'use client';
import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { elementObserver, animateCSS } from '../utils';
import type { ElementInViewportProps } from '../types';

export const ElementInViewport: FC<ElementInViewportProps> = ({
  animation = 'fadeInDown',
  className,
  children
}) => {
  const viewRef = useRef(null);
  useEffect(() => {
    if (!viewRef.current) return;
    const observeCallback = (element: HTMLElement, unobserve: any) => {
      animateCSS(element, animation).then(() => {
        unobserve && unobserve();
      });
    };
    const observe = elementObserver(viewRef.current, observeCallback);
    observe.start();
    return () => {
      observe.end();
    };
  }, []);

  return (
    <div ref={viewRef} className={className}>
      {children}
    </div>
  );
};
