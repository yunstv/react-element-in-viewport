const toItems = (names: string[]): AnimateStyles[] =>
  names.map(name => ({ animationName: name, title: name }));

export const animateStyles: AnimateStyles[] = [
  {
    title: 'Attention seekers',
    children: toItems([
      'bounce',
      'flash',
      'pulse',
      'rubberBand',
      'shakeX',
      'shakeY',
      'headShake',
      'swing',
      'tada',
      'wobble',
      'jello',
      'heartBeat'
    ])
  },
  {
    title: 'Back entrances',
    children: toItems(['backInDown', 'backInLeft', 'backInRight', 'backInUp'])
  },
  {
    title: 'Back exits',
    children: toItems([
      'backOutDown',
      'backOutLeft',
      'backOutRight',
      'backOutUp'
    ])
  },
  {
    title: 'Bouncing entrances',
    children: toItems([
      'bounceIn',
      'bounceInDown',
      'bounceInLeft',
      'bounceInRight',
      'bounceInUp'
    ])
  },
  {
    title: 'Bouncing exits',
    children: toItems([
      'bounceOut',
      'bounceOutDown',
      'bounceOutLeft',
      'bounceOutRight',
      'bounceOutUp'
    ])
  },
  {
    title: 'Fading entrances',
    children: toItems([
      'fadeIn',
      'fadeInDown',
      'fadeInDownBig',
      'fadeInLeft',
      'fadeInLeftBig',
      'fadeInRight',
      'fadeInRightBig',
      'fadeInUp',
      'fadeInUpBig',
      'fadeInTopLeft',
      'fadeInTopRight',
      'fadeInBottomLeft',
      'fadeInBottomRight'
    ])
  },
  {
    title: 'Fading exits',
    children: toItems([
      'fadeOut',
      'fadeOutDown',
      'fadeOutDownBig',
      'fadeOutLeft',
      'fadeOutLeftBig',
      'fadeOutRight',
      'fadeOutRightBig',
      'fadeOutUp',
      'fadeOutUpBig',
      'fadeOutTopLeft',
      'fadeOutTopRight',
      'fadeOutBottomLeft',
      'fadeOutBottomRight'
    ])
  },
  {
    title: 'Flippers',
    children: toItems(['flipInX', 'flipInY', 'flipOutX', 'flipOutY'])
  },
  {
    title: 'Lightspeed',
    children: toItems([
      'lightSpeedInRight',
      'lightSpeedInLeft',
      'lightSpeedOutRight',
      'lightSpeedOutLeft'
    ])
  },
  {
    title: 'Rotating entrances',
    children: toItems([
      'rotateIn',
      'rotateInDownLeft',
      'rotateInDownRight',
      'rotateInUpLeft',
      'rotateInUpRight'
    ])
  },
  {
    title: 'Rotating exits',
    children: toItems([
      'rotateOut',
      'rotateOutDownLeft',
      'rotateOutDownRight',
      'rotateOutUpLeft',
      'rotateOutUpRight'
    ])
  },
  {
    title: 'Specials',
    children: toItems(['hinge', 'jackInTheBox', 'rollIn', 'rollOut'])
  },
  {
    title: 'Zooming entrances',
    children: toItems([
      'zoomIn',
      'zoomInDown',
      'zoomInLeft',
      'zoomInRight',
      'zoomInUp'
    ])
  },
  {
    title: 'Zooming exits',
    children: toItems([
      'zoomOut',
      'zoomOutDown',
      'zoomOutLeft',
      'zoomOutRight',
      'zoomOutUp'
    ])
  },
  {
    title: 'Sliding entrances',
    children: toItems([
      'slideInDown',
      'slideInLeft',
      'slideInRight',
      'slideInUp'
    ])
  },
  {
    title: 'Sliding exits',
    children: toItems([
      'slideOutDown',
      'slideOutLeft',
      'slideOutRight',
      'slideOutUp'
    ])
  }
];
