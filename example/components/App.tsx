import * as React from 'react';
import '../../scss/main.scss';
import AnimationGallery from './AnimationGallery';

export const App = () => {
  return (
    <div className="w-screen min-h-screen bg-neutral-950 p-1.5">
      <AnimationGallery />
    </div>
  );
};
