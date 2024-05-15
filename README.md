# React-element-in-viewport
- 监听元素是否正可视区域
- 继承 animate.css 制定不同动画效果

🎉 使用React-element-in-viewport让你的块级元素在用户可视范围内,有定制化的入场动画效果!

## Installation

```
npm install --save react-element-in-viewport
yarn add react-element-in-viewport
```

## Features

- 非常简单使用方式
- 超级容易的定制动画
- 丰富的动画效果案例
- 对于满意元素加载效果,可复制一键应用
- 快点试试吧!

## The gist

```jsx
  import React from 'react';

  import { ElementInViewport } from 'react-element-in-viewport';
  import 'react-element-in-viewport/dist/ReactElementInViewport.css';
  // or
  // import 'react-element-in-viewport/dist/ReactElementInViewport.min.css';
  
  function App(){
    return (
      <div >
        <ElementInViewport animation={'bounce'}>
          <div>
            animation bounce
          </div>
        </ElementInViewport>
        <ElementInViewport animation={'flash'}>
          <div>
            animation flash
          </div>
        </ElementInViewport>
        <ElementInViewport animation={'pulse'}>
          <div>
            animation pulse
          </div>
        </ElementInViewport>
        {/* {...} */}
      </div>
    );
  }
```

## Demo

[A demo is worth a thousand words](https://yunstv.github.io/react-element-in-viewport/)

## Documentation

## License

Licensed under ISC
