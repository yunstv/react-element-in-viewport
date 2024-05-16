import * as React from 'react';
import { Menu } from './Menu';

export const animateStyles: AnimateStyles[] = [
  {
    title: 'Attention seekers[寻求关注的人]',
    children: [
      {
        animationName: 'bounce',
        title: 'bounce[弹跳]'
      },
      {
        animationName: 'flash',
        title: 'flash[闪光]'
      },
      {
        animationName: 'pulse',
        title: 'pulse[脉冲]'
      },
      {
        animationName: 'rubberBand',
        title: 'rubberBand[橡皮筋]'
      },
      {
        animationName: 'shakeX',
        title: 'shakeX[摇晃X]'
      },
      {
        animationName: 'shakeY',
        title: 'shakeY[摇晃Y]'
      },
      {
        animationName: 'headShake',
        title: 'headShake[摇头]'
      },
      {
        animationName: 'swing',
        title: 'swing[摆动]'
      },
      {
        animationName: 'tada',
        title: 'tada[抖动]'
      },
      {
        animationName: 'wobble',
        title: 'wobble[摇晃]'
      },
      {
        animationName: 'jello',
        title: 'jello[果冻]'
      },
      {
        animationName: 'heartBeat',
        title: 'heartBeat[心跳]'
      }
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // }
    ]
  },
  {
    title: 'Attention seekers[寻求关注的人]',
    children: [
      {
        animationName: 'bounce',
        title: 'bounce[闪光]'
      },
      {
        animationName: 'bounce',
        title: 'bounce[闪光]'
      }
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // },
      // {
      //   animationName: 'bounce',
      //   title: 'bounce[闪光]'
      // }
    ]
  }
];

export default function Animate() {
  return <Menu data={animateStyles} />;
}
