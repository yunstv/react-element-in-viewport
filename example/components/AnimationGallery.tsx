import * as React from 'react';
import { animateStyles } from '../data/animations';
import { AnimationGrid } from './AnimationGrid';

export default function AnimationGallery() {
  return <AnimationGrid data={animateStyles} />;
}
