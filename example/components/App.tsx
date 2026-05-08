import * as React from 'react';
import '../../scss/main.scss';
import AnimationGallery from './AnimationGallery';
import { Backdrop } from './Backdrop';
import { TopNav } from './TopNav';

export const App = () => {
  return (
    <>
      <Backdrop />
      <div className="relative z-10 w-screen min-h-screen">
        <TopNav />
        <main className="p-1.5">
          <AnimationGallery />
        </main>
      </div>
    </>
  );
};
