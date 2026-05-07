import * as React from 'react';
import '../../scss/main.scss';
import AnimationGallery from './AnimationGallery';
import { Backdrop } from './Backdrop';

export const App = () => {
  return (
    <>
      <Backdrop />
      <div className="relative z-10 w-screen min-h-screen p-1.5">
        <AnimationGallery />
      </div>
    </>
  );
};
