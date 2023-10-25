import * as React from 'react';
import '../../scss/main.scss';
import { Styled } from '../styled';
import ReactAnimate from './Animate';

export const App = () => {
  return (
    <Styled.Container>
      <ReactAnimate />
    </Styled.Container>
  );
};
