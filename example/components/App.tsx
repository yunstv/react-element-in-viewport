import * as React from 'react';
import '../../scss/main.scss';
import { Styled } from '../styled';
import ReactAnimate from './Animate';

export const App = () => {
  return (
    <>
      <Styled.Container>
        <Styled.Header>
          <h1>Element-in-viewport DOC</h1>
        </Styled.Header>
      </Styled.Container>
      <Styled.Container>
        <ReactAnimate />
      </Styled.Container>
    </>
  );
};
