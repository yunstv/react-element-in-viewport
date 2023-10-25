import type { PropsWithChildren } from 'react';

export type Theme = 'light' | 'dark' | 'colored';

export type ElementObserverCallback = (e?: HTMLElement) => void;
export type ElementObserverStart = ElementObserverCallback;
export type ElementObserverEnd = ElementObserverCallback;

export type ElementObserver = (
  element: HTMLElement,
  callback: (element: HTMLElement, unobserve: ElementObserverEnd) => void
) => {
  start: ElementObserverStart;
  end: ElementObserverStart;
};

export type ElementInViewportProps = {
  className?: string;
  animation?: string;
} & PropsWithChildren;
