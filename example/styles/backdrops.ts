import * as React from 'react';

export const stageBackdrop: React.CSSProperties = {
  backgroundColor: '#14012b',
  backgroundImage: [
    'radial-gradient(120% 90% at 0% 0%, #ff006e 0%, transparent 55%)',
    'radial-gradient(110% 90% at 100% 0%, #ffbe0b 0%, transparent 55%)',
    'radial-gradient(120% 90% at 100% 100%, #00f5d4 0%, transparent 55%)',
    'radial-gradient(120% 90% at 0% 100%, #8338ec 0%, transparent 55%)'
  ].join(',')
};
