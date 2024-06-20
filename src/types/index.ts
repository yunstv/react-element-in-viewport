import type { HTMLAttributes } from 'react';

export type Theme = 'light' | 'dark' | 'colored';

export type ElementObserverCallback = (e?: HTMLElement) => void;
export type ElementObserverStart = ElementObserverCallback;
export type ElementObserverEnd = ElementObserverCallback;

type ObserveOptions = Record<string, string> | {};
export type ElementObserver = (
  element: HTMLElement,
  callback: (element: HTMLElement, unobserve: ElementObserverEnd) => void,
  options?: ObserveOptions
) => {
  start: ElementObserverStart;
  end: ElementObserverStart;
};

export interface ElementInViewportProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  animation?: string;
  isWrap?: boolean;
  observeOptions?: ObserveOptions;
}
