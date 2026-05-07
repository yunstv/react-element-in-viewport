import * as React from 'react';

export const useHoverDelay = (callback: () => void, delayMs: number) => {
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = React.useCallback(() => {
    cancel();
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      callbackRef.current();
    }, delayMs);
  }, [cancel, delayMs]);

  React.useEffect(() => () => cancel(), [cancel]);

  return { start, cancel };
};
