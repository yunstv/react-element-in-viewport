import type { ElementObserver } from '../types';

export const elementObserver: ElementObserver = (
  element,
  callback,
  option = {}
) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  const styleOptions = {
    opacity: '1',
    '--animate-duration': '2s',
    ...option
  };
  const exclude = ['opacity'];

  const setStyle = (element: HTMLElement, event = 'add') => {
    Object.entries(styleOptions).forEach(([sKey, sValue]) => {
      if (event === 'remove') {
        if (Object.keys(option).includes(sKey) || exclude.includes(sKey))
          return;
        return element.style.removeProperty(sKey);
      }
      element.style.setProperty(sKey, sValue);
    });
  };
  const start = () => {
    observer.observe(element);
  };
  const end = () => {
    setStyle(element, 'remove');
    observer.unobserve(element);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setStyle(element, 'add');
        callback && callback(element, end);
      }
    });
  }, options);
  return {
    start,
    end
  };
};

export const animateCSS = (
  element: HTMLElement,
  animation: string,
  prefix = 'Element-in-viewport__'
) =>
  // We create a Promise and return it
  new Promise(resolve => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: Event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
